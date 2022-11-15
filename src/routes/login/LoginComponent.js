import { StoreContext } from "../../context/store/storeContext";
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import useWindowSize from '../../hooks/useWindowSize';
import axios from 'axios';
import LoadingComponent from '../../components/loading';

function LoginComponent() {
    const { actions, state } = useContext(StoreContext);
    const [width, height] = useWindowSize();

    const googleLogin = useGoogleLogin({
        // flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            actions.generalActions.setisbusy()
            const url = process.env.REACT_APP_SERVER_URL + "login"
            axios({
                url: url,
                method: "POST",
                data: {
                    "credential": codeResponse.access_token,
                    "type": "bearer"
                }
            }).then(res => {
                actions.generalActions.setUser(res.data);
                actions.generalActions.resetisbusy()
                actions.generalActions.login()
            }).catch(error => {
                console.log(error)
            })
        },
        onError: errorResponse => console.log(errorResponse),
    });

    function parseJwt(token) {
        console.log('parse jwt');
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            actions.generalActions.setisbusy()
            const url = process.env.REACT_APP_SERVER_URL + "login"
            axios({
                url: url,
                method: "POST",
                data: {
                    "credential": credentialResponse.credential,
                    "type": "access"
                }
            }).then(res => {
                actions.generalActions.setUser(res.data);
                actions.generalActions.resetisbusy()
                actions.generalActions.login()
            }).catch(error => {
                console.log(error)
            })
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    if (state.generalStates.isBusy) {
        return <LoadingComponent loading />
    }

    return (
        <Column style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: height
        }}>
            <Row onClick={() => {
                googleLogin()
            }}><img src={require('../../assets/icons/google_signin_buttons/web/2x/btn_google_signin_dark_pressed_web@2x.png')} />
            </Row>
        </Column>
    );
}

export default LoginComponent;

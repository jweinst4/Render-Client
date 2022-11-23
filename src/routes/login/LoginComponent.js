import { StoreContext } from "../../context/store/storeContext";
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import useWindowSize from '../../hooks/useWindowSize';
import LoadingComponent from '../../components/loading';
import * as apiServices from '../../resources/api';

function LoginComponent() {
    const { actions, state } = useContext(StoreContext);
    const [width, height] = useWindowSize();

    const login = async (token, type) => {
        actions.generalActions.setisbusy()

        await apiServices.login(token, type)
            .then(res => {
                console.log('set user');
                console.log(res.data);
                actions.generalActions.setUser(res.data);
                actions.generalActions.resetisbusy()
                actions.generalActions.login()
            })
            .catch(err => console.log(err.response))
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            login(codeResponse.access_token, "bearer");
        },
        onError: errorResponse => console.log(errorResponse),
    });

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            login(credentialResponse.credential, "access");
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

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
                actions.generalActions.setUser(res.data);

                actions.generalActions.login()
            })
            .catch(err => console.log(err.response))
    }

    const loginTest = async (token, type, sub, email) => {
        actions.generalActions.setisbusy()

        await apiServices.loginTest(token, type, sub, email)
            .then(res => {
                console.log('login test res');
                console.log(res);
                actions.generalActions.setUser(res.data);

                actions.generalActions.login()
            })
            .catch(err => console.log(err.response))
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const email = await apiServices.getGoogleProfileFromBearerToken(codeResponse.access_token);
            if (email) {
                console.log('got email ,', email);
                // login(codeResponse.access_token, "bearer");
                loginTest(codeResponse.access_token, "bearer", email.data.sub, email.data.email);
            }
            else {
                console.log('did not get email');
                console.log(codeResponse);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            loginTest(credentialResponse.credential, "access");
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

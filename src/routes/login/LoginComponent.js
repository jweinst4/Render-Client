import React, { useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import { GoogleLogin } from '@react-oauth/google';
import { StoreContext } from "../../context/store/storeContext";

function LoginComponent() {
    const { actions } = useContext(StoreContext);
    // const history = useHistory();

    const responseGoogle = (response) => {
        actions.generalActions.login()
    }

    return (
        <Column>
            <Row alignSelf='stretch'>
                <Column flexGrow={1}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            responseGoogle(credentialResponse);
                        }}

                        onError={() => {
                            console.log('Login Failed');
                        }}

                        useOneTap
                    />;
                </Column>
            </Row>
        </Column>
    );
}

export default LoginComponent;

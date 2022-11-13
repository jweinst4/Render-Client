import { useContext } from 'react';
import { StoreContext } from "../../context/store/storeContext";
import { useGoogleOneTapLogin } from '@react-oauth/google';

function LoginComponent() {
    const { actions } = useContext(StoreContext);

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            actions.generalActions.login()
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    return null;
}

export default LoginComponent;

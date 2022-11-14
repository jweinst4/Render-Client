import { useContext } from 'react';
import { StoreContext } from "../../context/store/storeContext";
import { useGoogleOneTapLogin } from '@react-oauth/google';

function LoginComponent() {
    const { actions } = useContext(StoreContext);

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            const user = parseJwt(credentialResponse.credential)
            actions.generalActions.setUser(user)
            actions.generalActions.login()
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    return null;
}

export default LoginComponent;

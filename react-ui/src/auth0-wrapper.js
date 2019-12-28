// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from "react";
import Auth0Client from './auth0';
import Firebase from './firebase/firebase-manager';

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({
        uid: '',
        name: '',
        email: '',
        avatarUrl: ''
    });
    const [auth0Client, setAuth0] = useState(new Auth0Client());
    const [firebaseClient, setFirebaseClient] = useState(null);

    const [loading, setLoading] = useState(false);
    const [isRenewingAuth, setIsRenewingAuth] = useState(true);

    useEffect(() => {
        attemptSilentAuthentication();
    }, []);

    const loginThroughCallback = async () => {
        if (!isAuthenticated) {
            setLoading(true);

            const loggedInThroughCallback = await auth0Client.handleCallback();
            if (loggedInThroughCallback) {
                await setFirebaseCustomToken();
            }

            setLoading(false);
        }
    }

    const attemptSilentAuthentication = async () => {
        // console.log("Silent authentication is turned off!!");
        if (!isAuthenticated) {
            setIsRenewingAuth(true);
            const loggedInThroughSilentAuth = await auth0Client.handleSilentAuthentication();
            if (loggedInThroughSilentAuth) {
                await setFirebaseCustomToken();
            }
        }
        setIsRenewingAuth(false);
    }

    const setFirebaseCustomToken = async () => {
        let firebaseClient = new Firebase();

        const response = await fetch('/firebase', {
            headers: {
                Authorization: `Bearer ${auth0Client.getAccessToken()}`,
            },
        });

        const data = await response.json();
        await firebaseClient.setToken(data.firebaseToken);
        let userData = await firebaseClient.updateProfile(auth0Client.getProfile(), localStorage.getItem('provider') || '');

        setFirebaseClient(firebaseClient);
        setUser({ ...userData });
        setIsAuthenticated(true);
        localStorage.removeItem('provider');
    }

    const loginWithGoogle = async () => {
        localStorage.setItem('provider', 'google');
        await auth0Client.loginWithGoogle();
    };

    const loginWithFacebook = async () => {
        localStorage.setItem('provider', 'facebook');
        await auth0Client.loginWithFacebook();
    }

    const loginWithTwitter = async () => {
        localStorage.setItem('provider', 'twitter');
        await auth0Client.loginWithTwitter();
    }

    const signIn = () => auth0Client.signIn();

    const signOut = async () => {
        setIsAuthenticated(false);
        await auth0Client.signOut();
        await firebaseClient.signOut();
    };

    return (

        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                firebaseClient,
                loading,
                isRenewingAuth,
                loginWithGoogle,
                loginWithFacebook,
                loginWithTwitter,
                signIn,
                signOut,
                loginThroughCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
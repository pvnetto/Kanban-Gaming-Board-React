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
    let [firebaseClient, setFirebaseClient] = useState(null);
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
                await setupAuthentication();
            }

            setLoading(false);
        }
    }

    const attemptSilentAuthentication = async () => {
        console.log("Silent authentication is turned off!!");
        // if (!isAuthenticated) {
        //     setIsRenewingAuth(true);

        //     const loggedInThroughSilentAuth = await auth0Client.handleSilentAuthentication();
        //     if (loggedInThroughSilentAuth) {
        //         await setupAuthentication();
        //     }
        // }
        setIsRenewingAuth(false);
    }

    const setupAuthentication = async () => {
        await setFirebaseCustomToken();
        setUserWithAuth0Profile();
        setIsAuthenticated(true);
    }

    const setFirebaseCustomToken = async () => {
        firebaseClient = new Firebase();

        const response = await fetch('http://localhost:3001/firebase', {
            headers: {
                Authorization: `Bearer ${auth0Client.getAccessToken()}`,
            },
        });

        const data = await response.json();
        await firebaseClient.setToken(data.firebaseToken);
        await firebaseClient.updateProfile(auth0Client.getProfile());

        setFirebaseClient(firebaseClient);
    }

    const setUserWithAuth0Profile = () => {
        let profile = auth0Client.getProfile();
        setUser({
            uid: profile.sub,
            name: profile.name,
            email: profile.email,
            avatarUrl: profile.picture
        });
    }

    const loginWithGoogle = () => auth0Client.loginWithGoogle();

    const loginWithFacebook = () => auth0Client.loginWithFacebook();

    const loginWithGitHub = () => auth0Client.loginWithGitHub();

    const signIn = () => auth0Client.signIn();

    const signOut = () => auth0Client.signOut() && firebaseClient.signOut();

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
                loginWithGitHub,
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
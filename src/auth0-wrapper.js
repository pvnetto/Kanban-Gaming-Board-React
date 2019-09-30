// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from "react";
import Auth0Client from './auth0';
import Firebase from './firebase';

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
        name: '',
        email: '',
        avatarUrl: ''
    });
    const [auth0Client, setAuth0] = useState(new Auth0Client());
    const [firebaseClient, setFirebaseClient] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginThroughCallback = async () => {
        setLoading(true);
        setIsAuthenticated(false);

        const loggedInThroughCallback = await auth0Client.handleCallback();
        if (loggedInThroughCallback) {
            console.log("Logged in");
            await setFirebaseCustomToken();

            let profile = auth0Client.getProfile();
            setUser({
                name: profile.given_name,
                avatarUrl: profile.picture
            });

            setIsAuthenticated(true);
        }
        else {
            console.log("Not logged in through callback");
        }

        setLoading(false);
    }

    async function setFirebaseCustomToken() {
        const firebaseClient = new Firebase();

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

    const signIn = () => auth0Client.signIn();

    return (

        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                signIn,
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
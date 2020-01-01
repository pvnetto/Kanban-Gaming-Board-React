import Firebase from '../firebase/firebase-manager';
import { authenticationPending, authenticationSuccess, authenticationError, logout } from '../components/contexts/auth/auth-actions';

export const callbackAuthentication = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();

        if (!auth.isAuthenticated) {
            dispatch(authenticationPending());

            const loggedInThroughCallback = await auth.auth0Client.handleCallback();
            if (loggedInThroughCallback) {
                dispatch(setFirebaseCustomToken());
            }
            else {
                dispatch(authenticationError());
            }
        }

        console.log("end of auth");
    }
}

export const silentAuthentication = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();

        if (!auth.isAuthenticated) {
            dispatch(authenticationPending());

            const loggedInThroughSilentAuth = await auth.auth0Client.handleSilentAuthentication();
            if (loggedInThroughSilentAuth) {
                dispatch(setFirebaseCustomToken());
            }
            else {
                dispatch(authenticationError());
            }
        }
    }
}

const setFirebaseCustomToken = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const firebaseClient = new Firebase();

        const response = await fetch('/firebase', {
            headers: {
                Authorization: `Bearer ${auth.auth0Client.getAccessToken()}`,
            },
        });

        const data = await response.json();
        await firebaseClient.setToken(data.firebaseToken);
        let userData = await firebaseClient.updateProfile(auth.auth0Client.getProfile(), localStorage.getItem('provider') || '');

        dispatch(authenticationSuccess({ ...userData }, firebaseClient));
        localStorage.removeItem('provider');
    }
}

export const loginWithGoogle = async (auth0Client) => {
    localStorage.setItem('provider', 'google');
    await auth0Client.loginWithGoogle();
};

export const loginWithFacebook = async (auth0Client) => {
    localStorage.setItem('provider', 'facebook');
    await auth0Client.loginWithFacebook();
}

export const loginWithTwitter = async (auth0Client) => {
    localStorage.setItem('provider', 'twitter');
    await auth0Client.loginWithTwitter();
}

export const signIn = (auth0Client) => auth0Client.signIn();

export const signOut = () => {
    return async (dispatch, getState) => {
        const { auth } = getState();

        await auth.auth0Client.signOut();
        await auth.firebaseClient.signOut();
        dispatch(logout());
    }
};
import { AUTHENTICATION_PENDING, AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR, LOGOUT } from './auth-types';

export const authenticationPending = () => {
    return {
        type: AUTHENTICATION_PENDING,
    }
}

export const authenticationSuccess = (user, firebaseClient) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        data: { user, firebaseClient },
    }
}

export const authenticationError = () => {
    return {
        type: AUTHENTICATION_ERROR,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}
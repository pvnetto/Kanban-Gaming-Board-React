import { AUTHENTICATION_PENDING, AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR, LOGOUT } from './auth-types';
import Auth0Client from '../../../auth0/auth0-client';

const defaultState = { user: {}, auth0Client: new Auth0Client(), firebaseClient: null, isPending: false, isAuthenticated: false, };
const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTHENTICATION_PENDING:
            return {
                ...state,
                isPending: true,
            }
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                user: { ...action.data.user },
                firebaseClient: action.data.firebaseClient,
                isAuthenticated: true,
                isPending: false,
            }
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
                isPending: false,
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
            }
        default:
            return state
    }
};

export default authReducer; 
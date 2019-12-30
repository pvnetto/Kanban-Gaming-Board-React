import { ADD_PROJECT, FETCH_PROJECTS, LOADING, ERROR } from './workspace-types';

export const defaultState = { projects: [], isLoading: false, error: null };
const workspaceReducer = (state = defaultState, action) => {
    switch (action.type) {

        case LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.data],
                isLoading: false,
            }
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: action.data,
                isLoading: false,
            }
        default:
            return state
    }
};

export default workspaceReducer; 
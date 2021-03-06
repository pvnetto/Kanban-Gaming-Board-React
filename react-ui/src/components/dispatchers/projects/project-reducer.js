import { FETCH_PROJECTS, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT_INFO, LOADING_PROJECT, ERROR_PROJECT } from './project-types';

export const defaultState = { projects: [], isLoading: false, error: null };
const projectsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOADING_PROJECT:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_PROJECT:
            return {
                ...state,
                error: action.error,
            }
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: action.data,
                isLoading: false,
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.data],
                isLoading: false,
            }
        case REMOVE_PROJECT: {
            const projectsCopy = [...state.projects];
            const projectToRemove = projectsCopy.findIndex(project => project.id === action.data);
            projectsCopy.splice(projectToRemove, 1);
            return {
                ...state,
                projects: [...projectsCopy],
                isLoading: false,
            }
        }
        case UPDATE_PROJECT_INFO: {
            const projectIdx = state.projects.findIndex(project => project.id === action.data.id);
            const projectsCopy = [...state.projects];
            projectsCopy[projectIdx] = action.data;
            return {
                ...state,
                projects: [...projectsCopy],
                isLoading: false,
            }
        }
        default:
            return state
    }
};

export default projectsReducer; 
import { ADD_PROJECT, FETCH_PROJECTS, LOADING, ERROR } from './workspace-types';

export const addProjectSuccess = (projectData) => {
    return {
        type: ADD_PROJECT,
        data: projectData,
    }
}

export const fetchProjectsSuccess = (projects) => {
    return {
        type: FETCH_PROJECTS,
        data: projects,
    }
}

export const loading = () => {
    return {
        type: LOADING,
    }
}

export const error = (error) => {
    return {
        type: ERROR,
        error,
    }
}
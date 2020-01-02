import { FETCH_PROJECTS, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT_INFO, LOADING_PROJECT, ERROR_PROJECT } from './project-types';

export const fetchProjectsSuccess = (projects) => {
    return {
        type: FETCH_PROJECTS,
        data: projects,
    }
}

export const addProjectSuccess = (projectData) => {
    return {
        type: ADD_PROJECT,
        data: projectData,
    }
}

export const removeProjectSuccess = (projectId) => {
    return {
        type: REMOVE_PROJECT,
        data: projectId,
    }
}

export const updateProjectSuccess = (newProject) => {
    return {
        type: UPDATE_PROJECT_INFO,
        data: newProject,
    }
}

export const loadingProject = () => {
    return {
        type: LOADING_PROJECT,
    }
}

export const errorProject = (error) => {
    return {
        type: ERROR_PROJECT,
        error,
    }
}
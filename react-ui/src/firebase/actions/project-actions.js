import { loadingProject, fetchProjectsSuccess, addProjectSuccess, removeProjectSuccess, updateProjectSuccess } from '../../components/contexts/projects/project-actions';

export const fetchProjectsAction = (userEmail) => {
    return async (dispatch, getState) => {
        const {auth} = getState();
        const projectService = auth.firebaseClient.projectService;

        dispatch(loadingProject());
        const projects = await projectService.fetchProjects(userEmail);
        dispatch(fetchProjectsSuccess(projects));
    }
}

export const addProjectAction = (title, description, generalInfo) => {
    return async (dispatch, getState) => {
        const {auth} = getState();
        const projectService = auth.firebaseClient.projectService;
        const newProject = { title, description, generalInfo };

        dispatch(loadingProject());
        const insertedProject = await projectService.insertProject(newProject);
        dispatch(addProjectSuccess(insertedProject));
    }
}

export const removeProjectAction = (projectId) => {
    return async (dispatch, getState) => {
        const {auth} = getState();
        const projectService = auth.firebaseClient.projectService;

        dispatch(loadingProject());
        await projectService.removeProject(projectId);
        dispatch(removeProjectSuccess(projectId));
    }
}

export const updateProjectAction = (project, title, description, generalInfo) => {
    return async (dispatch, getState) => {
        const {auth} = getState();
        const projectService = auth.firebaseClient.projectService;
        
        let updatedProject = { ...project, title, description, generalInfo };

        dispatch(loadingProject());
        updatedProject = await projectService.updateProject(updatedProject);
        dispatch(updateProjectSuccess(updatedProject));
    }
}

export const fetchAllTasksFromAllProjects = async (projects, taskService) => {
    let taskData = {};
    let taskPromises = projects.map(async (project) => {
        let projectData = await taskService.fetchAllTasksFromProject(project.id);

        Object.keys(projectData).forEach(key => {
            if (!taskData[key]) {
                taskData[key] = [];
            }
            taskData[key].push(...projectData[key]);
        });
    });

    await Promise.all(taskPromises);

    return taskData;
}
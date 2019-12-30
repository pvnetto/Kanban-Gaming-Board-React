import { loading, fetchProjectsSuccess, addProjectSuccess, removeProjectSuccess, updateProjectSuccess } from '../../components/contexts/workspace/workspace-actions';

export const fetchProjectsAction = (userEmail, projectService) => {
    return async (dispatch) => {
        dispatch(loading());
        const projects = await projectService.fetchProjects(userEmail);
        dispatch(fetchProjectsSuccess(projects));
    }
}

export const addProject = (title, description, generalInfo, projectService) => {
    return async (dispatch) => {
        const newProject = { title, description, generalInfo };

        dispatch(loading());
        const insertedProject = await projectService.insertProject(newProject);
        dispatch(addProjectSuccess(insertedProject));
    }
}

export const removeProject = (projectId, projectService) => {
    return async (dispatch) => {
        dispatch(loading());
        await projectService.removeProject(projectId);
        dispatch(removeProjectSuccess(projectId));
    }
}

export const updateProject = (project, title, description, generalInfo, projectService) => {
    return async (dispatch) => {
        let updatedProject = { ...project, title, description, generalInfo };

        dispatch(loading());
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
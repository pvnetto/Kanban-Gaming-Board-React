import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '../../auth0-wrapper';

const WorkspaceContext = React.createContext({});

export const useWorkspace = () => useContext(WorkspaceContext);
export const WorkspaceProvider = ({ children }) => {
    let [projects, setProjects] = useState([]);
    let [isLoadingProjects, setLoading] = useState(true);

    const { firebaseClient, user } = useAuth0();

    useEffect(() => {
        const getProjects = async () => {
            setLoading(true);

            const savedProjects = await firebaseClient.projectService.fetchProjects(user.email);
            setProjects([...savedProjects]);

            setLoading(false);
        }

        getProjects();
    }, [user])

    const addProject = async (title, description, generalInfo) => {
        const newProject = {
            title,
            description,
            generalInfo,
        };

        const insertedProject = await firebaseClient.projectService.insertProject(newProject);
        setProjects([...projects, insertedProject]);
        // setAlert({ show: true, msg: `${title} project was succesfully created.` });
    }

    const removeProject = async (projectId) => {
        await firebaseClient.projectService.removeProject(projectId);

        const projectsCopy = [...projects];
        const projectToRemove = projectsCopy.findIndex(project => project.id === projectId);
        projectsCopy.splice(projectToRemove, 1);

        setProjects([...projectsCopy]);
    }

    const addContributorToProject = async (projectId, contributorEmail) => {
        const updatedProject = await firebaseClient.projectService.insertProjectContributor(projectId, contributorEmail);

        let projectIdx = projects.findIndex(item => item.id === projectId);
        let projectsCopy = [...projects];
        projectsCopy[projectIdx] = updatedProject;
        setProjects([...projectsCopy]);
    }

    const updateProject = async (projectId, title, description, generalInfo) => {
        let projectIdx = projects.findIndex(project => project.id === projectId);
        let updatedProject = {
            ...projects[projectIdx],
            title,
            description,
            generalInfo
        };

        updatedProject = await firebaseClient.projectService.updateProject(updatedProject);

        // Updates state with object saved on database
        let projectsCopy = [...projects];
        projectsCopy[projectIdx] = updatedProject;
        setProjects([...projectsCopy]);
    }

    const fetchAllTasksFromAllProjects = async () => {
        let tasks = [];
        let taskPromises = projects.map(async (project) => {
            let projectTasks = await firebaseClient.taskService.fetchAllTasksFromProject(project.id);
            tasks.push(...projectTasks);
        });

        await Promise.all(taskPromises);

        return tasks;
    }

    return (
        <WorkspaceContext.Provider value={{ projects, addProject, removeProject, updateProject, fetchAllTasksFromAllProjects, addContributorToProject, isLoadingProjects }}>
            {children}
        </WorkspaceContext.Provider>
    )

}



export const ProjectsConsumer = WorkspaceContext.Consumer;
export default WorkspaceContext;

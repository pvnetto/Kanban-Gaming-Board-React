import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '../../auth0-wrapper';

const ProjectsContext = React.createContext({});

export const useProjects = () => useContext(ProjectsContext);
export const ProjectsProvider = ({ children }) => {
    let [projects, setProjects] = useState([]);

    const { firebaseClient, user } = useAuth0();

    useEffect(() => {
        const getProjects = async () => {
            const savedProjects = await firebaseClient.fetchProjects(user.uid);
            setProjects([...savedProjects]);
        }

        getProjects();
    }, [user])

    const addProject = async (title, description, generalInfo) => {
        const newProject = {
            title,
            description,
            generalInfo,
        };

        const insertedProject = await firebaseClient.insertProject(newProject);
        setProjects([...projects, insertedProject]);
        // setAlert({ show: true, msg: `${title} project was succesfully created.` });
    }

    const removeProject = async (projectId) => {
        await firebaseClient.removeProject(projectId);

        const projectsCopy = [...projects];
        const projectToRemove = projectsCopy.findIndex(project => project.id === projectId);
        projectsCopy.splice(projectToRemove, 1);

        setProjects([...projectsCopy]);
    }

    const addContributorToProject = async (projectId, contributorEmail) => {
        const updatedProject = await firebaseClient.insertProjectContributor(projectId, contributorEmail);

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

        updatedProject = await firebaseClient.updateProject(updatedProject);

        // Updates state with object saved on database
        let projectsCopy = [...projects];
        projectsCopy[projectIdx] = updatedProject;
        setProjects([...projectsCopy]);
    }

    return (
        <ProjectsContext.Provider value={{ projects, addProject, removeProject, updateProject, addContributorToProject }}>
            {children}
        </ProjectsContext.Provider>
    )

}



export const ProjectsConsumer = ProjectsContext.Consumer;
export default ProjectsContext;

import React, { useState, useContext } from 'react';
import { projects as mockProjects } from '../../mock';

const ProjectsContext = React.createContext({});

export const useProjects = () => useContext(ProjectsContext);
export const ProjectsProvider = ({ children }) => {
    let [projects, setProjects] = useState([
        ...mockProjects
    ]);

    const addProject = (title, description, generalInfo, author) => {
        let id = projects.length;

        const newProject = {
            id,
            title,
            description,
            generalInfo,
        };

        setProjects([...projects, newProject]);
        // setAlert({ show: true, msg: `${title} project was succesfully created.` });
    }

    const removeProject = (id) => {
        // TODO: Also remove boards, tasks, logs etc

        const projectsCopy = [...projects];
        const projectToRemove = projectsCopy.findIndex(project => project.id === id);
        projectsCopy.splice(projectToRemove, 1);

        setProjects([...projectsCopy]);
    }

    const updateProject = (newProject) => {
        let projectIdx = projects.findIndex(project => project.id === newProject.id);
        let projectsCopy = [...projects];
        projectsCopy[projectIdx] = newProject;
        setProjects([...projectsCopy]);

        // setAlert({ show: true, msg: `${newProject.title} was succesfully edited.` });
    }

    return (
        <ProjectsContext.Provider value={{ projects, addProject, removeProject, updateProject }}>
            {children}
        </ProjectsContext.Provider>
    )

}



export const ProjectsConsumer = ProjectsContext.Consumer;
export default ProjectsContext;

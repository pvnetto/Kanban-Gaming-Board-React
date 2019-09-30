import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';
import PageAlert from './components/commons/PageAlert';
import LoginRedirect from './components/login/LoginRedirect';

import { ProjectsProvider } from './components/contexts/ProjectContext';

import { projects as mockProjects, mockTasks } from './mock';
import { useAuth0 } from './auth0-wrapper';
import LoadingSpinner from './components/commons/LoadingSpinner';


const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });

    let [projects, setProjects] = useState([
        ...mockProjects
    ]);

    const { loading } = useAuth0();

    const addProject = (title, description, generalInfo, author) => {
        let id = projects.length;

        const newProject = {
            id,
            title,
            description,
            generalInfo,
        };

        setProjects([...projects, newProject]);
        setAlert({ show: true, msg: `${title} project was succesfully created.` });
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

        setAlert({ show: true, msg: `${newProject.title} was succesfully edited.` });
    }

    const updateTask = (taskID, status) => {
        let newTask = mockTasks.find(task => task.id === taskID);
        newTask.status = status;

        console.log(newTask);
        setAlert({ show: true, msg: `Task updated.` })
    }

    return (
        <BrowserRouter>
            <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

            {loading ? <LoadingSpinner /> : null}

            <Switch>
                <Route exact path="/" component={LoginPage}>
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/redirect" component={LoginRedirect} />

                <ProjectsProvider value={{ projects, addProject, removeProject, updateProject }}>
                    <Route path="/workspace" component={UserWorkspace} />
                    <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} {...{ updateTask }} />} />
                </ ProjectsProvider>

                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
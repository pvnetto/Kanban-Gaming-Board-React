import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';

import PageAlert from './components/commons/PageAlert';

import { UserProvider } from './components/contexts/UserContext';
import { ProjectsProvider } from './components/contexts/ProjectContext';

import { projects as mockProjects, mockTasks } from './mock';

import Auth0Client from './auth0';
import Firebase from './firebase';

const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });
    let [auth0Client, setAuth0Client] = useState(new Auth0Client());
    let [firebaseClient, setFirebaseClient] = useState(null);
    let [user, setUser] = useState({
        name: "Paivaaaa",
        email: "pvnetto1@gmail.com",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    });
    let [isAuthenticated, setAuthenticated] = useState(false);

    let [projects, setProjects] = useState([
        ...mockProjects
    ]);

    const signIn = () => auth0Client.signIn();

    const addProject = (title, description, generalInfo, author) => {
        let id = projects.length;

        const newProject = {
            id,
            title,
            description,
            generalInfo,
        };

        setProjects([...projects, newProject]);

        firebaseClient.addMessage("New message");
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

    const updateUserName = () => {
        setUser({ ...user, name: "New name" });
    }

    return (
        <UserProvider value={{ ...user, setUser, signIn, updateUserName, auth0Client, setFirebaseClient }}>
            <BrowserRouter>
                <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

                <Switch>
                    <Route exact path="/" component={LoginPage}>
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={LoginPage} />

                    <ProjectsProvider value={{ projects, addProject, removeProject, updateProject }}>
                        <Route path="/workspace" component={UserWorkspace} />
                        <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} {...{ updateTask }} />} />
                    </ ProjectsProvider>

                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        </UserProvider>
    );
};

export default AppRouter;
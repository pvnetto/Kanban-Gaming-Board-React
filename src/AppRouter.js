import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';
import PageAlert from './components/commons/PageAlert';
import LoginRedirect from './components/login/LoginRedirect';
import LoadingSpinner from './components/commons/LoadingSpinner';

import { useAuth0 } from './auth0-wrapper';
import { ProjectsProvider } from './components/contexts/ProjectContext';
import { mockTasks } from './mock';


const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });

    const { loading } = useAuth0();

    const updateTask = (taskID, status) => {
        let newTask = mockTasks.find(task => task.id === taskID);
        newTask.status = status;

        console.log(newTask);
        // setAlert({ show: true, msg: `Task updated.` })
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

                <ProjectsProvider>
                    <Route path="/workspace" component={UserWorkspace} />
                    <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} {...{ updateTask }} />} />
                </ ProjectsProvider>

                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
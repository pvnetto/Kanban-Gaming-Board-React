import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserWorkspace from './components/workspace/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/ErrorPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/workspace" component={UserWorkspace} />
                <Route exact path="/workspace/project/:projectId" component={ProjectWorkspace} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
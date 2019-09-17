import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserWorkspace from './components/workspace/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/ErrorPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}>
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/workspace" component={UserWorkspace} />
                <Route path="/project/:projectId" component={ProjectWorkspace} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
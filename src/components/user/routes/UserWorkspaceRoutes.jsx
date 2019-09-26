import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserDashboard from '../dashboard';
import UserManagement from '../management';
import ErrorPage from '../../commons/ErrorPage';

const UserWorkspaceRoutes = (props) => {
    return (
        <Switch>
            <Route exact path={`${props.url}/dashboard`} render={(routeProps) => <UserDashboard {...routeProps} />} />
            <Route exact path={`${props.url}/management`} render={(routeProps) => <UserManagement {...routeProps} />} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </ Switch>
    );
};

export default UserWorkspaceRoutes;
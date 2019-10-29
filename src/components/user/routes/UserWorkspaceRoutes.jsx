import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserDashboard from '../dashboard';
import UserManagement from '../management';
import ErrorPage from '../../commons/ErrorPage';

const UserWorkspaceRoutes = ({ url }) => {
    return (
        <Switch>
            <Route exact path={`${url}/dashboard`} component={UserDashboard} />
            <Route exact path={`${url}/management`} component={UserManagement} />

            <Route exact path={`${url}`}>
                <Redirect to={`${url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </ Switch>
    );
};

UserWorkspaceRoutes.propTypes = {
    url: PropTypes.string.isRequired,
};

export default UserWorkspaceRoutes;
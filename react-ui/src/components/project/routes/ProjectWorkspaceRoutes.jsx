import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectDashboard from '../dashboard';
import ProjectBoard from '../board';
import ProjectBacklog from '../backlog';
import ProjectDesignLog from '../design_log';
import ProjectManagement from '../management';
import ErrorPage from '../../utils/ErrorPage';


const ProjectWorkspaceRoutes = ({ url }) => {

    return (
        <Switch>
            <Route exact path={`${url}/dashboard`} component={ProjectDashboard} />
            <Route exact path={`${url}/boards/:boardId`} component={ProjectBoard} />
            <Route exact path={`${url}/backlog`} component={ProjectBacklog} />
            <Route exact path={`${url}/design_log`} component={ProjectDesignLog} />
            <Route exact path={`${url}/management`} component={ProjectManagement} />
            <Route exact path={`${url}`}>
                <Redirect to={`${url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </Switch>
    );
};

ProjectWorkspaceRoutes.propTypes = {
    url: PropTypes.string.isRequired,
}

export default ProjectWorkspaceRoutes;
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectDashboard from './ProjectDashboard';
import ProjectBoard from './ProjectBoard';
import ProjectBacklog from './ProjectBacklog';
import ProjectDesignLog from './ProjectDesignLog';
import ProjectManagement from './ProjectManagement';
import ErrorPage from '../commons/ErrorPage';


const ProjectWorkspaceRoutes = (props) => {
    return (
        <Switch>

            <Route exact path={`${props.url}/dashboard`} component={ProjectDashboard} />
            <Route exact path={`${props.url}/boards/:boardId`} component={ProjectBoard} />
            <Route exact path={`${props.url}/backlog`} component={ProjectBacklog} />
            <Route exact path={`${props.url}/design_log`} component={ProjectDesignLog} />
            <Route exact path={`${props.url}/management`} component={ProjectManagement} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </Switch>
    );
};

export default ProjectWorkspaceRoutes;
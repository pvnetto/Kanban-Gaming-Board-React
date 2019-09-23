import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectDashboard from '../dashboard';
import ProjectBoard from '../board';
import ProjectBacklog from '../backlog';
import ProjectDesignLog from '../design_log';
import ProjectManagement from '../management';
import ErrorPage from '../../commons/ErrorPage';


const ProjectWorkspaceRoutes = (props) => {

    return (
        <Switch>
            <Route exact path={`${props.url}/dashboard`} render={(routeProps) => <ProjectDashboard {...routeProps} user={props.user} project={props.project} />} />
            <Route exact path={`${props.url}/boards/:boardId`} render={(routeProps) => <ProjectBoard {...routeProps} boards={props.project.boards} />} />
            <Route exact path={`${props.url}/backlog`} render={(routeProps) => <ProjectBacklog {...routeProps} boards={props.project.boards} />} />
            <Route exact path={`${props.url}/design_log`} render={(routeProps) => <ProjectDesignLog {...routeProps} logEntries={props.project.logs} />} />
            <Route exact path={`${props.url}/management`} component={ProjectManagement} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </Switch>
    );
};

export default ProjectWorkspaceRoutes;
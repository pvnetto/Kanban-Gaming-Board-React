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
            <Route exact path={`${props.url}/dashboard`} component={ProjectDashboard} />
            <Route exact path={`${props.url}/boards/:boardId`} render={(routeProps) => {
                return <ProjectBoard {...routeProps} addTask={props.addTask} updateTask={props.updateTask} />
            }} />

            <Route exact path={`${props.url}/backlog`} render={(routeProps) => {
                return <ProjectBacklog {...routeProps} addTask={props.addTask} />
            }} />

            <Route exact path={`${props.url}/design_log`} render={(routeProps) => {
                return <ProjectDesignLog {...routeProps} addLog={props.addLog} />
            }} />

            <Route exact path={`${props.url}/management`} component={ProjectManagement} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </Switch>
    );
};

export default ProjectWorkspaceRoutes;
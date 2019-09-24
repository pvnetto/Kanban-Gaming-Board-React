import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectDashboard from '../dashboard';
import ProjectBoard from '../board';
import ProjectBacklog from '../backlog';
import ProjectDesignLog from '../design_log';
import ProjectManagement from '../management';
import ErrorPage from '../../commons/ErrorPage';


const ProjectWorkspaceRoutes = (props) => {

    const projectId = props.params.projectId;

    return (
        <Switch>
            <Route exact path={`${props.url}/dashboard`} render={(routeProps) => <ProjectDashboard {...routeProps} user={props.user} project={props.project} />} />
            <Route exact path={`${props.url}/boards/:boardId`} render={(routeProps) => {
                return <ProjectBoard {...routeProps} project={props.project} boards={props.project.boards} addTask={props.addTask} />
            }} />

            <Route exact path={`${props.url}/backlog`} render={(routeProps) => {
                return <ProjectBacklog {...routeProps} project={props.project} boards={props.project.boards} addTask={props.addTask} />
            }} />

            <Route exact path={`${props.url}/design_log`} render={(routeProps) => {
                return <ProjectDesignLog {...routeProps} projectId={projectId} addLog={props.addLog} logEntries={props.project.logs} />
            }} />

            <Route exact path={`${props.url}/management`} render={(routeProps) => <ProjectManagement {...routeProps} {...props} />} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </Switch>
    );
};

export default ProjectWorkspaceRoutes;
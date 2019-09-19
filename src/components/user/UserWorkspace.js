import React from 'react';
import UserWorkspaceSidenav from './UserWorkspaceSidenav';
import UserDashboard from './UserDashboard';
import UserManagement from './UserManagement';
import NavigationBar from '../commons/NavigationBar';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ErrorPage from '../commons/ErrorPage';

const WorkspaceRoutes = (props) => {
    return (
        <Switch>
            <Route exact path={`${props.url}/dashboard`} component={UserDashboard} />
            <Route exact path={`${props.url}/management`} component={UserManagement} />

            <Route exact path={`${props.url}`}>
                <Redirect to={`${props.url}/dashboard`} />
            </Route>

            <Route component={ErrorPage} />
        </ Switch>
    );
}

const UserWorkspace = (props) => {

    return (
        <>
            <UserWorkspaceSidenav url={props.match.url} />
            <Container fluid={true} className="bg-primary p-0">
                <div className="workspace">
                    <NavigationBar />
                    <WorkspaceRoutes {...props.match} />
                </div>
            </Container>
        </>
    );
};

export default UserWorkspace;
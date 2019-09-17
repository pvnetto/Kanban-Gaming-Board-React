import React from 'react';
import UserDashboard from './UserDashboard';
import UserManagement from './UserManagement';
import SidenavButton from '../commons/SidenavButton';
import Sidenav from '../commons/Sidenav';
import NavigationBar from '../commons/NavigationBar';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { faPlusSquare, faGamepad, faCogs } from '@fortawesome/free-solid-svg-icons';
import ErrorPage from '../ErrorPage';

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

const WorkspaceSidenav = (props) => {
    const sidenavBtns = [
        <SidenavButton btnTitle={"CREATE PROJECT"} btnIcon={faPlusSquare} url={`${props.url}`} link={"/create"} />,
        <SidenavButton btnTitle={"MY DASHBOARD"} btnIcon={faGamepad} url={`${props.url}`} link={"/dashboard"} />,
        <SidenavButton btnTitle={"MANAGEMENT"} btnIcon={faCogs} url={`${props.url}`} link={"/management"} />
    ];

    return (
        <Sidenav buttons={sidenavBtns} options={[]} />
    );
}

const UserWorkspace = (props) => {

    return (
        <>
            <WorkspaceSidenav url={props.match.url} />
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
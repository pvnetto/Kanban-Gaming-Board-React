import React from 'react';
import Sidenav from '../commons/Sidenav';
import NavigationBar from '../commons/NavigationBar';
import SidenavButton from '../commons/SidenavButton';
import ErrorPage from '../ErrorPage';

import UserWorkspace from '../workspace/UserWorkspace';

import ProjectDashboard from './ProjectDashboard';
import ProjectBoard from './ProjectBoard';
import ProjectBacklog from './ProjectBacklog';
import ProjectDesignLog from './ProjectDesignLog';
import ProjectManagement from './ProjectManagement';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

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
}

const ProjectWorkspaceSidenav = ({ url }) => {
    const sidenavBtns = [
        <SidenavButton btnTitle={"CREATE"} btnIcon={faPlusSquare} url={url} link={"/create"} />,
        <SidenavButton btnTitle={"DASHBOARD"} btnIcon={faGamepad} url={url} link={"/dashboard"} />,
        <SidenavButton btnTitle={"BOARDS"} btnIcon={faClipboardList} url={url} link={"/boards/1"} />,
        <SidenavButton btnTitle={"BACKLOG"} btnIcon={faList} url={url} link="/backlog" />,
        <SidenavButton btnTitle={"DESIGN LOG"} btnIcon={faEdit} url={url} link="/design_log" />,
        <SidenavButton btnTitle={"MANAGEMENT"} btnIcon={faCogs} url={url} link="/management" />
    ];

    const optionBtns = [
        <SidenavButton btnTitle={"Back to Workspace"} btnIcon={faArrowLeft} url={"/workspace"} />
    ];

    return (
        <Sidenav buttons={sidenavBtns} options={optionBtns} />
    );
}

const ProjectWorkspace = (props) => {


    return (
        <>
            <ProjectWorkspaceSidenav {...props.match} />

            <Container fluid={true} className="bg-primary p-0">
                <div className="workspace">
                    <NavigationBar />
                    <ProjectWorkspaceRoutes {...props.match} />
                </div>
            </Container>

        </>
    );
};

export default ProjectWorkspace;
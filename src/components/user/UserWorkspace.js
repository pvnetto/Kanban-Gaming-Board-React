import React from 'react';
import UserWorkspaceSidenav from './sidenav';
import UserWorkspaceRoutes from './routes';
import NavigationBar from '../commons/NavigationBar';

import { Container, Row, Col } from 'react-bootstrap';

const UserWorkspace = (props) => {

    return (
        <>
            <UserWorkspaceSidenav url={props.match.url} />
            <Container fluid={true} className="bg-primary p-0">
                <div className="workspace">
                    <NavigationBar user={props.user} />
                    <UserWorkspaceRoutes {...props.match} user={props.user} />
                </div>
            </Container>
        </>
    );
};

export default UserWorkspace;
import React, { useState } from 'react';
import UserWorkspaceSidenav from './sidenav';
import UserWorkspaceRoutes from './routes';
import NavigationBar from '../commons/NavigationBar';

import { Container } from 'react-bootstrap';
import { UserProvider } from '../contexts/UserContext';

const UserWorkspace = (props) => {

    // TODO: Replace with Context
    let [expandWorkspace, setExpandWorkspace] = useState(true);
    const toggleExpandWorkspace = () => {
        setExpandWorkspace(!expandWorkspace);
    }

    return (
        <>
            <UserWorkspaceSidenav url={props.match.url} onExpand={toggleExpandWorkspace} addProject={props.addProject} />
            <Container fluid={true} className="bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''}`}>
                    <NavigationBar />
                    <UserWorkspaceRoutes {...props.match} user={props.user} />
                </div>
            </Container>
        </>
    );
};

export default UserWorkspace;
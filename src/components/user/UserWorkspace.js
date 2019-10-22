import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import UserWorkspaceSidenav from './sidenav';
import UserWorkspaceRoutes from './routes';
import NavigationBar from '../commons/NavigationBar';

import { useAuth0 } from '../../auth0-wrapper';

const UserWorkspace = (props) => {

    // TODO: Replace with Context
    let [expandWorkspace, setExpandWorkspace] = useState(true);
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            props.history.push('/');
        }
    });

    return (
        <>
            <UserWorkspaceSidenav url={props.match.url} onExpand={() => setExpandWorkspace(!expandWorkspace)} addProject={props.addProject} />
            <Container fluid={true} className="bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''}`}>
                    <NavigationBar>
                        <Link to={`/workspace/dashboard`}>Workspace</Link>
                    </NavigationBar>
                    <UserWorkspaceRoutes {...props.match} />
                </div>
            </Container>
        </>
    );
};

export default UserWorkspace;
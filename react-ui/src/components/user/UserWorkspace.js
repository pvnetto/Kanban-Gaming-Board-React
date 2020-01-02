import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import UserWorkspaceSidenav from './sidenav';
import UserWorkspaceRoutes from './routes';
import NavigationBar from '../commons/NavigationBar';


const UserWorkspace = ({ history, match }) => {

    let [expandWorkspace, setExpandWorkspace] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    });

    if (!isAuthenticated) return null;

    return (
        <>
            <UserWorkspaceSidenav url={match.url} onExpand={() => setExpandWorkspace(!expandWorkspace)} />
            <Container fluid={true} className="bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''}`}>
                    <NavigationBar>
                        <Link to={`/workspace/dashboard`}>Workspace</Link>
                    </NavigationBar>
                    <UserWorkspaceRoutes url={match.url} />
                </div>
            </Container>
        </>
    );
};

UserWorkspace.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default UserWorkspace;
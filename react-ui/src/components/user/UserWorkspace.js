import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { fetchProjectsAction } from '../../firebase/dispatchers/fetchProjects';

import UserWorkspaceSidenav from './sidenav';
import UserWorkspaceRoutes from './routes';
import NavigationBar from '../commons/NavigationBar';

import { useAuth0 } from '../../auth0-wrapper';

const UserWorkspace = ({ history, match }) => {

    let [expandWorkspace, setExpandWorkspace] = useState(true);
    const { firebaseClient, user, isAuthenticated } = useAuth0();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjectsAction(user.email, firebaseClient.projectService));
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    });

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
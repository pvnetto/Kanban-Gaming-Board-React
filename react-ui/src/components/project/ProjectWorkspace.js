import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import { loadProject } from '../../firebase/actions/board-actions';
import ProjectWorkspaceRoutes from './routes';
import ProjectWorkspaceSidenav from './sidenav';
import NavigationBar from '../commons/NavigationBar';

import { Link } from "react-router-dom";

const WorkspaceNavbar = ({ path }) => {

    const currentProject = useSelector(state => state.boards.currentProject);

    return (
        <NavigationBar>
            <Link to={`/workspace/dashboard`}>Workspace</Link>
            <Link to={path}>{currentProject ? currentProject.title : ''}</Link>
        </NavigationBar>
    )
}

const ProjectWorkspace = ({ history, match, location }) => {
    let [expandWorkspace, setExpandWorkspace] = useState(true);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const firebaseClient = useSelector(state => state.auth.firebaseClient);

    const projects = useSelector(state => state.projects.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        const projectId = match.params.projectId;
        dispatch(loadProject(projectId, projects, firebaseClient.boardService));
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    });

    const toggleExpandWorkspace = () => {
        setExpandWorkspace(!expandWorkspace);
    }

    return (
        <>
            <ProjectWorkspaceSidenav {...match} onExpand={toggleExpandWorkspace} />
            <Container fluid={true} className="full-height bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''} d-flex flex-column h-100`}>
                    <WorkspaceNavbar path={location.pathname} />
                    <ProjectWorkspaceRoutes url={match.url} />
                </div>
            </Container>
        </>
    );
};

ProjectWorkspace.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default ProjectWorkspace;
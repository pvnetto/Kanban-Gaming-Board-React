import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';

import ProjectWorkspaceRoutes from './routes';
import ProjectWorkspaceSidenav from './sidenav';
import NavigationBar from '../commons/NavigationBar';
import { BoardsProvider } from '../contexts/BoardsContext';
import { useAuth0 } from '../../auth0-wrapper';
import { TasksProvider } from '../contexts/TasksContext';


const ProjectWorkspace = (props) => {
    let [expandWorkspace, setExpandWorkspace] = useState(true);

    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            props.history.push('/');
        }
    });

    const toggleExpandWorkspace = () => {
        setExpandWorkspace(!expandWorkspace);
    }

    return (
        <BoardsProvider projectId={props.match.params.projectId}>
            <TasksProvider>
                <ProjectWorkspaceSidenav {...props.match} onExpand={toggleExpandWorkspace} />
                <Container fluid={true} className="full-height bg-primary p-0">
                    <div className={`workspace ${expandWorkspace ? 'expand' : ''} d-flex flex-column h-100`}>
                        <NavigationBar />
                        <ProjectWorkspaceRoutes {...props.match} {...props} />
                    </div>
                </Container>
            </TasksProvider>
        </BoardsProvider>
    );
};

export default ProjectWorkspace;
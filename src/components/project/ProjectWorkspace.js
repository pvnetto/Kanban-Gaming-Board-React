import React from 'react';
import NavigationBar from '../commons/NavigationBar';
import ProjectWorkspaceRoutes from './routes';
import { Container } from 'react-bootstrap';
import ProjectWorkspaceSidenav from './sidenav';


const ProjectWorkspace = (props) => {


    return (
        <>
            <ProjectWorkspaceSidenav {...props.match} />

            <Container fluid={true} className="full-height bg-primary p-0">
                <div className="workspace d-flex flex-column h-100">
                    <NavigationBar />
                    <ProjectWorkspaceRoutes {...props.match} />
                </div>
            </Container>

        </>
    );
};

export default ProjectWorkspace;
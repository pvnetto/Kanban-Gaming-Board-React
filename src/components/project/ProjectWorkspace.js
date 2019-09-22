import React from 'react';
import NavigationBar from '../commons/NavigationBar';
import ProjectWorkspaceRoutes from './routes';
import { Container } from 'react-bootstrap';
import ProjectWorkspaceSidenav from './sidenav';


const ProjectWorkspace = (props) => {
    const projectId = props.match.params.projectId;
    const currentProject = props.user.projects.find(element => element.id == projectId);

    return (
        <>
            <ProjectWorkspaceSidenav {...props.match} boards={currentProject.boards} />

            <Container fluid={true} className="full-height bg-primary p-0">
                <div className="workspace d-flex flex-column h-100">
                    <NavigationBar user={props.user} />
                    <ProjectWorkspaceRoutes {...props.match} user={props.user} project={currentProject} />
                </div>
            </Container>

        </>
    );
};

export default ProjectWorkspace;
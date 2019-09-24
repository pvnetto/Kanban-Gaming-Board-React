import React, { useState } from 'react';
import NavigationBar from '../commons/NavigationBar';
import ProjectWorkspaceRoutes from './routes';
import { Container } from 'react-bootstrap';
import ProjectWorkspaceSidenav from './sidenav';


const ProjectWorkspace = (props) => {
    const projectId = props.match.params.projectId;
    const currentProject = props.user.projects.find(element => element.id == projectId);

    let [expandWorkspace, setExpandWorkspace] = useState(true);
    const toggleExpandWorkspace = () => {
        setExpandWorkspace(!expandWorkspace);
    }

    return (
        <>
            <ProjectWorkspaceSidenav {...props.match} boards={currentProject.boards} addBoard={props.addBoard} addTask={props.addTask} onExpand={toggleExpandWorkspace} />

            <Container fluid={true} className="full-height bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''} d-flex flex-column h-100`}>
                    <NavigationBar user={props.user} />
                    <ProjectWorkspaceRoutes {...props.match} project={currentProject} user={props.user} addTask={props.addTask} addLog={props.addLog} />
                </div>
            </Container>

        </>
    );
};

export default ProjectWorkspace;
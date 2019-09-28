import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import ProjectsContext from '../../contexts/ProjectContext';
import BoardsContext from '../../contexts/BoardsContext';

const ProjectDeleteForm = () => {

    const { project } = useContext(BoardsContext);
    const { removeProject } = useContext(ProjectsContext);

    return (
        <Form className="d-flex flex-column" >
            <Link to="/workspace/dashboard">
                <Button onClick={() => removeProject(project.id)} className="align-self-center" variant="secondary">Delete Project</Button>
            </Link>
        </Form>
    );
};

export default ProjectDeleteForm;
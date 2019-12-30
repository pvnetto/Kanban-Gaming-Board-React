import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { removeProject } from '../../../firebase/dispatchers/fetchProjects';
import BoardsContext from '../../contexts/BoardsContext';
import { useAuth0 } from '../../../auth0-wrapper';

const ProjectDeleteForm = () => {

    const { project } = useContext(BoardsContext);
    const { firebaseClient } = useAuth0();
    const dispatch = useDispatch();

    return (
        <Form className="d-flex flex-column align-items-center" >
            <Link to="/workspace/dashboard">
                <Button onClick={() => dispatch(removeProject(project.id, firebaseClient.projectService))} className="align-self-center" variant="secondary">Delete Project</Button>
            </Link>
        </Form>
    );
};

export default ProjectDeleteForm;
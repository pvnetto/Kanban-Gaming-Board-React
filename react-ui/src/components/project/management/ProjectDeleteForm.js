import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { removeProjectAction } from '../../../firebase/actions/project-actions';
import { useAuth0 } from '../../../auth0-wrapper';

const ProjectDeleteForm = () => {

    const { firebaseClient } = useAuth0();
    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    return (
        <Form className="d-flex flex-column align-items-center" >
            <Link to="/workspace/dashboard">
                <Button onClick={() => dispatch(removeProjectAction(currentProject.id, firebaseClient.projectService))} className="align-self-center" variant="secondary">Delete Project</Button>
            </Link>
        </Form>
    );
};

export default ProjectDeleteForm;
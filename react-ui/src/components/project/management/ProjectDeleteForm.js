import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { removeProjectAction } from '../../dispatchers/projects/project-actions-async';

const ProjectDeleteForm = () => {

    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    return (
        <Form className="d-flex flex-column align-items-center" >
            <Link to="/workspace/dashboard">
                <Button onClick={() => dispatch(removeProjectAction(currentProject.id))} className="align-self-center" variant="secondary">Delete Project</Button>
            </Link>
        </Form>
    );
};

export default ProjectDeleteForm;
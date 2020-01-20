import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { addContributorAction } from '../../dispatchers/projects/project-actions-async';


const ProjectInviteForm = () => {

    let [email, setEmail] = useState('');

    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    const addContributor = () => {
        dispatch(addContributorAction(currentProject.id, email));
        setEmail("");
    }

    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Invite to project: </Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter user e-mail" />
            </Form.Group>

            <Button onClick={addContributor} className="align-self-center" variant="secondary">Invite</Button>
        </Form>
    );
};

export default ProjectInviteForm;
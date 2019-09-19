import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProjectInviteForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Invite to project: </Form.Label>
                <Form.Control type="text" placeholder="Enter user e-mail" />
            </Form.Group>

            <Button className="align-self-center" variant="secondary">Invite</Button>
        </Form>
    );
};

export default ProjectInviteForm;
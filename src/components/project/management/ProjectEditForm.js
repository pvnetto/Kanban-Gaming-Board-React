import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProjectEditForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Project Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Project Description: </Form.Label>
                <Form.Control as="textarea" rows="3" type="text" placeholder="Enter project description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>General info: </Form.Label>
                <Form.Control as="textarea" rows="8" type="text" />
            </Form.Group>

            <Button className="align-self-center" variant="secondary">Apply</Button>
        </Form>
    );
};

export default ProjectEditForm;
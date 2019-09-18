import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateProjectForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Project Name: </Form.Label>
                <Form.Control required type="text" placeholder="Enter project name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Project Description: </Form.Label>
                <Form.Control required as="textarea" rows="3" type="text" placeholder="Enter project description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>General info: </Form.Label>
                <Form.Control required as="textarea" rows="8" type="text" />
            </Form.Group>

            <Button className="align-self-end" variant="dark">Create</Button>
        </Form>
    );
};

export default CreateProjectForm;
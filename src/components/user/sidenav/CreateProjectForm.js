import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateProjectForm = () => {
    return (
        <Form >
            <Form.Group>
                <Form.Label>Project Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Project Description: </Form.Label>
                <Form.Control type="text" as="textarea" rows="3" placeholder="Enter project description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>General info: </Form.Label>
                <Form.Control type="text" as="textarea" rows="8" />
            </Form.Group>

            <Button className="float-right" variant="dark">Create Project</Button>
        </Form>
    );
};

export default CreateProjectForm;
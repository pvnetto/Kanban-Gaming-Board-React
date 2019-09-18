import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProjectDeleteForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Button className="align-self-center" variant="secondary">Delete Project</Button>
        </Form>
    );
};

export default ProjectDeleteForm;
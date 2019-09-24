import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProjectEditForm = ({ project, editProject }) => {

    let [title, setTitle] = useState(project.title);
    let [description, setDescription] = useState(project.description);
    let [generalInfo, setGeneralInfo] = useState(project.generalInfo);

    const onClick = () => {
        editProject(project.id, title, description, generalInfo);
    }

    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Project Title: </Form.Label>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter project title" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Project Description: </Form.Label>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)}
                    as="textarea" rows="3" type="text" placeholder="Enter project description"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>General info: </Form.Label>
                <Form.Control value={generalInfo} onChange={(e) => setGeneralInfo(e.target.value)}
                    as="textarea" rows="8" type="text"
                />
            </Form.Group>

            <Button onClick={onClick} className="align-self-center" variant="secondary">Apply</Button>
        </Form>
    );
};

export default ProjectEditForm;
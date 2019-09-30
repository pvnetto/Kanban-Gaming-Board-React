import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useProjects } from '../../contexts/ProjectContext';

const CreateProjectForm = () => {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [generalInfo, setGeneralInfo] = useState("");

    const { addProject } = useProjects();

    const onClick = () => {
        addProject(title, description, generalInfo);

        setTitle("");
        setDescription("");
        setGeneralInfo("");
    }

    return (
        <Form >
            <Form.Group>
                <Form.Label>Project Title: </Form.Label>
                <Form.Control value={title} type="text" placeholder="Enter project title" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Project Description: </Form.Label>
                <Form.Control value={description} type="text" as="textarea" rows="3" placeholder="Enter project description" onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>General info: </Form.Label>
                <Form.Control value={generalInfo} type="text" as="textarea" rows="8"
                    placeholder={"Enter general info about the project"} onChange={(e) => setGeneralInfo(e.target.value)} />
            </Form.Group>

            <Button onClick={onClick} className="float-right" variant="dark">Create Project</Button>
        </Form>
    );
};

export default CreateProjectForm;
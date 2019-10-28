import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useWorkspace } from '../../contexts/WorkspaceContext';

import FullPageSpinner from '../../commons/spinners/FullPageSpinner';

const CreateProjectForm = () => {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [generalInfo, setGeneralInfo] = useState("");
    let [isAdding, setIsAdding] = useState(false);

    const { addProject } = useWorkspace();

    const onClick = async () => {
        setIsAdding(true);
        await addProject(title, description, generalInfo);
        setIsAdding(false);

        setTitle("");
        setDescription("");
        setGeneralInfo("");
    }

    return (
        <>
            {isAdding ? <FullPageSpinner /> : null}

            <Form>
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
        </>
    );
};

export default CreateProjectForm;
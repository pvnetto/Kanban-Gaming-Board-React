import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { updateProject } from '../../../firebase/dispatchers/fetchProjects';
import { useBoards } from '../../contexts/BoardsContext';
import { useAuth0 } from '../../../auth0-wrapper';

const ProjectEditForm = () => {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [generalInfo, setGeneralInfo] = useState("");

    const { project } = useBoards();
    const { firebaseClient } = useAuth0();
    const dispatch = useDispatch();

    // Initializing state on useEffect, instead of initializing with props as default values
    useEffect(() => {
        setTitle(project.title);
        setDescription(project.description);
        setGeneralInfo(project.generalInfo);
    }, []);

    const onClick = () => {
        dispatch(updateProject(project, title, description, generalInfo, firebaseClient.projectService));
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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { updateProjectAction } from '../../../firebase/actions/project-actions';

const ProjectEditForm = () => {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [generalInfo, setGeneralInfo] = useState("");

    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    // Initializing state on useEffect, instead of initializing with props as default values
    useEffect(() => {
        setTitle(currentProject.title);
        setDescription(currentProject.description);
        setGeneralInfo(currentProject.generalInfo);
    }, []);

    const onClick = () => {
        dispatch(updateProjectAction(currentProject, title, description, generalInfo));
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
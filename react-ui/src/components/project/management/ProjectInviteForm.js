import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useBoards } from '../../contexts/BoardsContext';

const ProjectInviteForm = () => {

    let [email, setEmail] = useState('');

    const { project } = useBoards();
    // const { addContributorToProject } = useWorkspace();

    const addContributor = () => {
        console.log("TODO: Add contributor");
        // addContributorToProject(project.id, email);

        setEmail("");
    }

    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Invite to project: </Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter user e-mail" />
            </Form.Group>

            <Button onClick={addContributor} className="align-self-center" variant="secondary">Invite</Button>
        </Form>
    );
};

export default ProjectInviteForm;
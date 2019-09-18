import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateProjectForm from './CreateProjectForm';

const CreateProjectModal = ({ showModal, handleClose }) => {

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CreateProjectForm />
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProjectModal;
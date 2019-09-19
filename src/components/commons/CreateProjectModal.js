import React from 'react';
import CreateProjectForm from './CreateProjectForm';
import ModalBase from './ModalBase';

import { Modal } from 'react-bootstrap';

const CreateProjectModal = ({ showModal, handleClose }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Project" items={[<CreateProjectForm />]} />
    );
};

export default CreateProjectModal;
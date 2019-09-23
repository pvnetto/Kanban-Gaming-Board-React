import React from 'react';
import CreateProjectForm from './CreateProjectForm';
import ModalBase from '../../commons/ModalBase';

import { Modal } from 'react-bootstrap';

const CreateProjectModal = ({ showModal, handleClose, addProject }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Project">
            <CreateProjectForm addProject={addProject} />
        </ModalBase>
    );
};

export default CreateProjectModal;
import React from 'react';
import CreateTaskForm from './CreateTaskForm';
import ModalBase from './ModalBase';

const CreateTaskModal = ({ showModal, handleClose }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Task" items={<CreateTaskForm />} />
    );
};

export default CreateTaskModal;
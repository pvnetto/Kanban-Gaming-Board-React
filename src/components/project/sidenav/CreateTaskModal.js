import React from 'react';
import CreateTaskForm from './CreateTaskForm';
import ModalBase from '../../commons/ModalBase';

const CreateTaskModal = ({ showModal, handleClose, addTask, projectId, boards }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Task" >
            <CreateTaskForm {...{ addTask, projectId, boards }} />
        </ModalBase>
    );
};

export default CreateTaskModal;
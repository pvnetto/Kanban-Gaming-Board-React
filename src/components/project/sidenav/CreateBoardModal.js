import React from 'react';
import CreateBoardForm from './CreateBoardForm';
import ModalBase from '../../commons/ModalBase';

const CreateBoardModal = ({ showModal, handleClose, addBoard, projectId }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Board">
            <CreateBoardForm addBoard={addBoard} projectId={projectId} />
        </ModalBase>
    );
};

export default CreateBoardModal;
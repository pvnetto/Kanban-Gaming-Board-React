import React from 'react';
import CreateBoardForm from './CreateBoardForm';
import ModalBase from '../../commons/ModalBase';

const CreateBoardModal = ({ showModal, handleClose }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Board" items={<CreateBoardForm />} />
    );
};

export default CreateBoardModal;
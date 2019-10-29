import React from 'react';
import PropTypes from 'prop-types';
import CreateProjectForm from './CreateProjectForm';
import ModalBase from '../../commons/ModalBase';

const CreateProjectModal = ({ showModal, handleClose }) => {
    return (
        <ModalBase showModal={showModal} handleClose={handleClose} title="Create Project">
            <CreateProjectForm />
        </ModalBase>
    );
};

CreateProjectModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default CreateProjectModal;
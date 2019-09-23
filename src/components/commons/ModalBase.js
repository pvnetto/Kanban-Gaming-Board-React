import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalBase = ({ showModal, handleClose, title, children }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBase;
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalBase = ({ showModal, handleClose, title, items }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {items}
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBase;
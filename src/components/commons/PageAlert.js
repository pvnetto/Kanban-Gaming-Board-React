import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const PageAlert = ({ msg, show, onClose }) => {
    useEffect(() => {
        if (show) {
            // Dismisses the alert automatically after x milliseconds
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
        }
    }, [show])

    return (
        <Alert style={{ zIndex: 2000 }} className={'position-fixed w-100'} show={show} variant={'success'}>
            {msg}
        </Alert>
    );
};

export default PageAlert;
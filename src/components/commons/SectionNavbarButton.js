import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionNavbarButton = ({ onClick, btnIcon, btnTitle }) => {
    return (
        <Button onClick={onClick} className="d-flex flex-row align-items-center py-1 border-0 transparent-btn-warning">
            <FontAwesomeIcon className="icon-md" icon={btnIcon} />
            <p className="ml-2">{btnTitle}</p>
        </Button>
    );
};

export default SectionNavbarButton;
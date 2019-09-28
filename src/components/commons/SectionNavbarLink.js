import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionNavbarLink = ({ title, icon, onClick, link }) => {
    return (
        <Link to={`${link || ""}`} onClick={onClick} className="d-flex flex-row align-items-center py-1 border-0 transparent-btn-warning">
            <FontAwesomeIcon className="icon-md" icon={icon} />
            <p className="ml-2">{title}</p>
        </Link>
    );
};

export default SectionNavbarLink;
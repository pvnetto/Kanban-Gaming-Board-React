import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './section.module.scss';

const SectionNavbarButton = ({ title, icon, onClick }) => {
    return (
        <Button onClick={onClick} className={`${styles.sectionBtn} d-flex flex-row align-items-center py-1 border-0 transparent-btn-warning`}>
            <FontAwesomeIcon className="icon-md" icon={icon} />
            <p className="ml-2">{title}</p>
        </Button>
    );
};

SectionNavbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default SectionNavbarButton;
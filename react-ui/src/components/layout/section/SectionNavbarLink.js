import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './section.module.scss';

const SectionNavbarLink = ({ title, icon, onClick, link = '' }) => {
    return (
        <Link to={`${link}`} onClick={onClick} className={`${styles.sectionBtn} d-flex flex-row align-items-center py-1 border-0 transparent-btn-warning`}>
            <FontAwesomeIcon className="icon-md" icon={icon} />
            <p className="ml-2">{title}</p>
        </Link>
    );
};

SectionNavbarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    link: PropTypes.string.isRequired,
}

export default SectionNavbarLink;
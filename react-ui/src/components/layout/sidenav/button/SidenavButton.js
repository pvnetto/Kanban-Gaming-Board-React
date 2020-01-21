import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './sidenav-button.module.scss';

const SidenavButton = ({ title, icon, onClick, active, className, isExpanded = true }) => {

    return (
        <li className={`${className} nav-item disable-select w-100`}>
            <p className={`${styles.navButton} ${isExpanded ? 'pl-3' : 'pl-0 justify-content-center'} ${active ? styles.active : ''} cursor-pointer py-3 d-flex flex-row align-items-center`}
                onClick={onClick}>

                <FontAwesomeIcon style={{ width: '25px' }} icon={icon} />
                {isExpanded &&
                    <span className="ml-3">
                        {" " + title}
                    </span>}
            </p>
        </li>
    );
};

SidenavButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    isRequired: PropTypes.bool
}

export default SidenavButton;
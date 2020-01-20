import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './sidenav-button.module.scss';

const SidenavButton = ({ title, icon, onClick, active, isExpanded = true }) => {

    return (
        <li className="nav-item disable-select w-100">
            <p className={`${styles.navButton} ${isExpanded ? 'pl-3' : 'pl-0 justify-content-center'} cursor-pointer py-3 d-flex flex-row align-items-center ${active ? 'active' : ''}`}
                onClick={onClick}>

                <FontAwesomeIcon style={{ width: '30px' }} icon={icon} />
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
import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidenav-logo.module.scss';

const SidenavLogo = ({ isExpanded }) => {
    return (
        <li className={`${styles.logo} ${isExpanded ? styles.expand : ''} nav-item text-center p-1`}>
            <span className="logo-blue">K </span>
            <span className="logo-red">G </span>
            <span className="logo-green">B</span>
        </li>
    );
};

SidenavLogo.propTypes = {
    isExpanded: PropTypes.bool,
}

export default SidenavLogo;
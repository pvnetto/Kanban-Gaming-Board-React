import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../logo/Logo';

import styles from './sidenav-logo.module.scss';

const SidenavLogo = ({ isExpanded }) => {
    return (
        <li>
            <Logo className={`${styles.logo} ${isExpanded ? styles.expand : ''} nav-item text-center p-1`}>
                <Logo.Blue>K</Logo.Blue>
                <Logo.Red>G</Logo.Red>
                <Logo.Green>B</Logo.Green>
            </Logo>
        </li>
    );
};

SidenavLogo.propTypes = {
    isExpanded: PropTypes.bool,
}

export default SidenavLogo;
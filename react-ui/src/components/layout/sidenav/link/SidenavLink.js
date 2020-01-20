import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './sidenav-link.module.scss';

const SidenavLink = ({ title, icon, url = '', link = '', isExpanded, className }) => {
    return (
        <li className="nav-item w-100">
            <NavLink
                activeClassName={styles.active}
                className={`${className} ${styles.navLink} ${isExpanded ? 'pl-3' : 'pl-0 justify-content-center'} py-3 d-flex flex-row align-items-center`} to={`${url}${link}`}
            >
                <FontAwesomeIcon style={{ width: 30 }} icon={icon} />
                {isExpanded &&
                    <span className="ml-3">
                        {" " + title}
                    </span>}
            </NavLink>
        </li>
    );
};

SidenavLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    url: PropTypes.string,
    link: PropTypes.string,
    isExpanded: PropTypes.bool,
}

export default SidenavLink;
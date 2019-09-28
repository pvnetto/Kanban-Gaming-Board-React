import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";

const SidenavLink = ({ title, icon, url, link, isExpanded }) => {
    return (
        <li className="nav-item w-100">
            <NavLink className={`nav-link py-3 ${isExpanded ? 'pl-3' : 'pl-0 justify-content-center'} d-flex flex-row align-items-center`} to={`${url || ''}${link || ''}`}>
                <FontAwesomeIcon style={{ width: '30px' }} icon={icon} />
                {
                    isExpanded &&
                    <span className="ml-3">
                        {" " + title}
                    </span>
                }
            </NavLink>
        </li>
    );
};

export default SidenavLink;
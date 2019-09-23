import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";

const SidenavLink = (props) => {
    return (
        <li className="nav-item w-100">
            <NavLink className="nav-link py-3 pl-3 d-flex flex-row align-items-center" to={`${props.url || ''}${props.link || ''}`}>
                <FontAwesomeIcon style={{ width: '30px' }} icon={props.btnIcon} />
                {
                    props.isExpanded &&
                    <span className="ml-3">
                        {" " + props.btnTitle}
                    </span>
                }
            </NavLink>
        </li>
    );
};

export default SidenavLink;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

const SidenavButton = (props) => {
    return (
        <li className="nav-item w-100">
            <Link className="nav-link py-3 pl-3 d-flex flex-row align-items-center" to={`${''}${props.link}`}>
                <FontAwesomeIcon icon={props.btnIcon} />
                <span className="ml-3">
                    {" " + props.btnTitle}
                </span>
            </Link>
        </li>
    );
};

export default SidenavButton;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidenavButton from './SidenavButton';
import SidenavLink from './SidenavLink';

const ExpandLink = (props) => {
    return (
        <NavLink className="nav-link py-1 pl-3 d-flex flex-row align-items-center" to={`${props.url || ''}${props.link || ''}`}>
            <FontAwesomeIcon className="ml-4" style={{ width: '20px' }} icon={props.btnIcon} />
            <span className="ml-2 text-sm">
                {" " + props.btnTitle}
            </span>
        </NavLink>
    );
}

const SidenavButtonExpand = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <SidenavButton {...props} onClick={toggleExpand} />
            {isExpanded &&
                props.expandBtns &&
                <div className="my-1">
                    {props.expandBtns.map(btn => <ExpandLink {...btn} />)}
                </div>
            }
        </>
    );
};

export default SidenavButtonExpand;
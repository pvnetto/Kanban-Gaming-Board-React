import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidenavButton from './SidenavButton';

const ExpandLink = (props) => {
    return (
        <NavLink className={`nav-link py-1 ${props.isExpanded ? 'pl-3' : 'pl-1'} d-flex flex-row align-items-center`} to={`${props.url || ''}${props.link || ''}`}>
            <FontAwesomeIcon className="ml-4" style={{ width: '15px' }} icon={props.btnIcon} />

            {
                props.isExpanded &&
                <span className="ml-2 text-sm">
                    {" " + props.btnTitle}
                </span>
            }
        </NavLink>
    );
}

const ExpandButton = (props) => {
    return (
        <p className={`nav-link cursor-pointer py-1 ${props.isExpanded ? 'pl-3' : 'pl-1'} d-flex flex-row align-items-center`} onClick={props.onClick}>
            <FontAwesomeIcon className="ml-4" style={{ width: '15px' }} icon={props.btnIcon} />

            {
                props.isExpanded &&
                <span className="ml-2 text-sm">
                    {" " + props.btnTitle}
                </span>
            }
        </p>
    );
}

const SidenavButtonExpand = (props) => {
    const [show, setShow] = useState(false);

    const toggleExpand = () => {
        setShow(!show);
    }

    return (
        <>
            <SidenavButton {...props} onClick={toggleExpand} />
            {show &&
                props.expandBtns &&
                <div className="my-1">
                    {props.expandBtns.map(btn => btn.url ?
                        <ExpandLink {...btn} isExpanded={props.isExpanded} /> :
                        <ExpandButton {...btn} isExpanded={props.isExpanded} />)}
                </div>
            }
        </>
    );
};

export default SidenavButtonExpand;
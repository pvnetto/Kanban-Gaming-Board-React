import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidenavButton from './SidenavButton';

export const ExpandLink = ({ title, icon, link, url, show, isExpanded }) => {

    if (!show) {
        return null;
    }

    return (
        <NavLink className={`nav-link py-1 ${isExpanded ? 'pl-3' : 'pl-1'} d-flex flex-row align-items-center`} to={`${url || ''}${link || ''}`}>
            <FontAwesomeIcon className="ml-4" style={{ width: '15px' }} icon={icon} />

            {
                isExpanded &&
                <span className="ml-2 text-sm">
                    {" " + title}
                </span>
            }
        </NavLink>
    );
}

export const ExpandButton = ({ title, icon, show, isExpanded, onClick }) => {
    if (!show) {
        return null;
    }

    return (
        <p className={`nav-link cursor-pointer py-1 ${isExpanded ? 'pl-3' : 'pl-1'} d-flex flex-row align-items-center`} onClick={onClick}>
            <FontAwesomeIcon className="ml-4" style={{ width: '15px' }} icon={icon} />

            {
                isExpanded &&
                <span className="ml-2 text-sm">
                    {" " + title}
                </span>
            }
        </p>
    );
}

const SidenavExpand = (props) => {
    const [show, setShow] = useState(false);

    const toggleExpand = () => {
        setShow(!show);
    }

    return (
        <>
            <SidenavButton {...props} onClick={toggleExpand} />
            {show &&
                <div className="my-1">
                    {props.children(show, props.isExpanded)}
                </div>
            }
        </>
    );
};

SidenavExpand.Button = ExpandButton;
SidenavExpand.Link = ExpandLink;

export default SidenavExpand;
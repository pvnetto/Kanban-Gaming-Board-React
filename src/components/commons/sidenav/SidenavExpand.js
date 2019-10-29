import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidenavButton from './SidenavButton';

export const ExpandLink = ({ title, icon, link = '', url = '', show, isExpanded }) => {

    if (!show) {
        return null;
    }

    return (
        <NavLink className={`nav-link py-1 ${isExpanded ? 'pl-3' : 'pl-1'} d-flex flex-row align-items-center`} to={`${url}${link}`}>
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

ExpandLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    link: PropTypes.string,
    url: PropTypes.string,
    show: PropTypes.bool,
    isExpanded: PropTypes.bool,
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

ExpandButton.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    show: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onClick: PropTypes.func,
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
SidenavExpand.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    active: PropTypes.bool,
    isRequired: PropTypes.bool,
}

export default SidenavExpand;
import React, { useState } from 'react';
import SidenavLogo from './SidenavLogo';
import SidenavLink from './SidenavLink';
import PropTypes from 'prop-types';

import { faPowerOff, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidenav = ({ children, onExpand }) => {

    let [isExpanded, setExpanded] = useState(true);

    const toggleExpanded = () => {
        setExpanded(!isExpanded);
        onExpand();
    }

    return (
        <div className={`sidenav ${isExpanded ? 'expand' : ''} bg-secondary border-2 border-light`}>
            <ul className="navbar-nav w-100">
                <SidenavLogo isExpanded={isExpanded} />

                <hr className="m-1 border border-light" />

                <div>
                    {children(isExpanded)}
                </div>

                <div className="d-flex flex-column justify-content-end w-100 h-100">
                    <SidenavLink title={"Logout"} url={"/logout"} icon={faPowerOff} isExpanded={isExpanded} />
                </div>

                <hr className="m-1 border border-light" />

                <li onClick={toggleExpanded} className="nav-item p-3 d-flex flex-row justify-content-end align-items-center">
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faWindowMinimize} />
                </li>
            </ul>
        </div>
    );
};

Sidenav.propTypes = {
    children: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
}

export default Sidenav;
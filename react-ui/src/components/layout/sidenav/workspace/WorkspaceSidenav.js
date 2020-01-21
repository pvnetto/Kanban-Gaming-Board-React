import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { faPowerOff, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SidenavLogo from '../logo';
import SidenavLink from '../link';
import Sidenav from '../Sidenav';

import style from './workspace-sidenav.module.scss';

const WorkspaceSidenav = ({ children, onExpand }) => {

    let [isExpanded, setExpanded] = useState(true);
    const [isLocked, setLocked] = useState(false);

    const toggleExpanded = () => {
        if (isLocked) return;
        setExpanded(!isExpanded);
        onExpand();
    }

    useEffect(() => {
        const handleResize = () => {
            if (!window) return;

            const width = window.innerWidth;

            if (width <= 1025) {
                setExpanded(false);
                setLocked(true);
                onExpand();
            }
            else {
                setLocked(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <Sidenav className={`${style.workspaceSidenav} ${isExpanded ? style.expand : ''} bg-secondary border-2 border-light`}>
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
        </Sidenav>
    );
};

WorkspaceSidenav.propTypes = {
    children: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
}

export default WorkspaceSidenav;
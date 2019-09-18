import React from 'react';
import SidenavLogo from './SidenavLogo';
import SidenavLink from './SidenavLink';

import { faPowerOff, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidenavButton from './SidenavButton';

const Sidenav = (props) => {
    return (
        <div className="sidenav bg-secondary border-2 border-light">
            <ul className="navbar-nav w-100">
                <SidenavLogo />

                <hr className="m-1 border border-light" />

                {props.buttons}

                <hr className="m-1 border border-light" />

                <div className="d-flex flex-column justify-content-between w-100 h-100">
                    <div>
                        {props.options}
                    </div>
                    <SidenavLink btnTitle={"Logout"} btnIcon={faPowerOff} />
                </div>

                <hr className="m-1 border border-light" />

                <li className="nav-item p-3 d-flex flex-row justify-content-end align-items-center">
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faWindowMinimize} />
                </li>
            </ul>
        </div>
    );
};

export default Sidenav;
import React from 'react';
import SidenavLogo from './SidenavLogo';
import SidenavButton from './SidenavButton';

const Sidenav = (props) => {
    return (
        <div className="sidenav bg-secondary border-2 border-light">
            <ul className="navbar-nav w-100">
                <SidenavLogo />

                <hr className="m-1 border border-light" />

                {props.buttons}

                <hr className="m-1 border border-light" />

                <div className="d-flex flex-column-reverse justify-content-between w-100 h-100">
                    {props.options}
                    <SidenavButton btnTitle={"Logout"} btnIcon={"LO"} />
                </div>

                <hr className="m-1 border border-light" />

                <li className="nav-item p-3 d-flex flex-row justify-content-end">
                    <i>Min</i>
                </li>
            </ul>
        </div>
    );
};

export default Sidenav;
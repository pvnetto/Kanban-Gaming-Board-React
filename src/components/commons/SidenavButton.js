import React from 'react';

const SidenavButton = (props) => {
    return (
        <li className="nav-item w-100">
            <a className="nav-link py-3 pl-3" href="">
                <i>{props.btnIcon}</i>
                <span>
                    {" " + props.btnTitle}
                </span>
            </a>
        </li>
    );
};

export default SidenavButton;
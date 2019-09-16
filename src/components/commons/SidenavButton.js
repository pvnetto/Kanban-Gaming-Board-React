import React from 'react';

const SidenavButton = (props) => {
    return (
        <li>
            <i>{props.btnIcon}</i>
            <button>{props.btnTitle}</button>
        </li>
    );
};

export default SidenavButton;
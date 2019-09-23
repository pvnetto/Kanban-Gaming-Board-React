import React from 'react';

const SidenavLogo = ({ isExpanded }) => {
    return (
        <li className={`${isExpanded ? 'expand' : ''} nav-item logo text-center p-1`}>
            <span className="logo-blue">K </span>
            <span className="logo-red">G </span>
            <span className="logo-green">B</span>
        </li>
    );
};

export default SidenavLogo;
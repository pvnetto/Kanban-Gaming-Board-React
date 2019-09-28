import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidenavButton = ({ title, icon, onClick, active, isExpanded }) => {
    return (
        <li className="nav-item disable-select w-100">
            <p className={`nav-link cursor-pointer py-3 ${isExpanded ? 'pl-3' : 'pl-0 justify-content-center'} d-flex flex-row align-items-center ${active ? 'active' : ''}`}
                onClick={onClick}>

                <FontAwesomeIcon style={{ width: '30px' }} icon={icon} />
                {
                    isExpanded &&
                    <span className="ml-3">
                        {" " + title}
                    </span>
                }
            </p>
        </li>
    );
};

export default SidenavButton;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const SidenavButton = (props) => {
    return (
        <li className="nav-item disable-select w-100">
            <p className="nav-link cursor-pointer py-3 pl-3 d-flex flex-row" onClick={props.onClick}>
                <FontAwesomeIcon style={{ width: '30px' }} icon={props.btnIcon} />
                <span className="ml-3">
                    {" " + props.btnTitle}
                </span>
            </p>
        </li>
    );
};

export default SidenavButton;
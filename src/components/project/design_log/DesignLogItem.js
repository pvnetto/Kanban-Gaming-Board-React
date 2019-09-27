import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const DesignLogItem = (props) => {

    let [showContent, setShowContent] = useState(false);

    return (
        <div onClick={() => setShowContent(!showContent)} className="hover-icon-secondary flex-fill p-2 mb-2 bg-dark bg-dark-hover border border-radius-5 border-light disable-select">
            <div className="d-flex flex-row justify-content-between">
                <p className="d-flex flex-row align-items-center">
                    <FontAwesomeIcon style={{ width: '15px' }} className="mr-2" icon={showContent ? faMinus : faPlus} />
                    <span className="font-weight-bold mr-1">Log #{props.id}:</span>
                    {props.title}
                </p>

                <DropdownButton drop={"left"} onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                </DropdownButton>
            </div>

            {showContent &&
                <div>
                    <p className="ml-4">
                        {props.content}
                    </p>
                </div>
            }
        </div>
    );
};

export default DesignLogItem;
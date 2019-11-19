import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const DesignLogItem = ({ id, title, content, removeLog, index }) => {

    let [showContent, setShowContent] = useState(false);

    return (
        <div onClick={() => setShowContent(!showContent)} className="hover-icon-secondary flex-fill p-2 mb-2 bg-dark bg-dark-hover border border-radius-5 border-light disable-select">
            <div className="d-flex flex-row justify-content-between">
                <p className="d-flex flex-row align-items-center">
                    <FontAwesomeIcon style={{ width: '15px' }} className="mr-2" icon={showContent ? faMinus : faPlus} />
                    <span className="font-weight-bold mr-1">Log #{index}:</span>
                    {title}
                </p>

                <DropdownButton title={""} drop={"left"}>
                    {/* <Dropdown.Item>Edit</Dropdown.Item> */}
                    <Dropdown.Item onSelect={() => removeLog(id)}>Delete</Dropdown.Item>
                </DropdownButton>
            </div>

            {showContent &&
                <div>
                    <p className="ml-4">
                        {content}
                    </p>
                </div>
            }
        </div>
    );
};

DesignLogItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    removeLog: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default DesignLogItem;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const DesignLogItem = (props) => {

    let [showContent, setShowContent] = useState(false);
    const toggleShowContent = () => {
        setShowContent(!showContent)
    }

    return (
        <div onClick={toggleShowContent} className="hover-icon-secondary flex-fill p-2 bg-dark bg-dark-hover border border-light disable-select">
            <div>
                <p className="d-flex flex-row align-items-center">
                    <FontAwesomeIcon style={{ width: '15px' }} className="mr-2" icon={showContent ? faMinus : faPlus} />
                    <span className="font-weight-bold mr-1">Log #{props.index}:</span>
                    {props.title}
                </p>
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
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionContainer = (props) => {
    return (
        <div className="bg-dark border-2 border-light mb-2">
            <div className="m-3">
                <h4 className="ml-2 emphasized d-flex flex-row align-items-center">
                    <FontAwesomeIcon className="mr-2" icon={props.titleIcon} />
                    {props.title}
                </h4>
                <hr className="border-top-1 border-light" />
            </div>

            <div className="m-3">
                {props.children}
                <hr className="border-top-1 border-light" />
            </div>

            <div className="p-3"></div>
        </div>
    );
};

export default SectionContainer;
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SectionContainer = ({ title, icon, children }) => {
    return (
        <div className="bg-dark border-2 border-radius-5 border-light mb-2">
            <div className="m-4">
                <h4 className="ml-2 emphasized d-flex flex-row align-items-center">
                    <FontAwesomeIcon className="mr-2" icon={icon} />
                    {title}
                </h4>
                <hr className="border-top-1 border-light" />
            </div>

            <div className="m-4">
                {children}
                <hr className="border-top-1 border-light" />
            </div>

            <div className="p-3"></div>
        </div>
    );
};

SectionContainer.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
}

export default SectionContainer;
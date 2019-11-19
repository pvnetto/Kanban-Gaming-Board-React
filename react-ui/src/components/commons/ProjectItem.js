import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const ProjectItem = ({ id, title, description, redirect = '' }) => {
    return (
        <Link to={`/project/${id}${redirect}`}>
            <div className="p-3 d-flex flex-row align-items-center hover-bg-dark">
                <FontAwesomeIcon className="mr-3" icon={faDiceD20} />
                <div className="text-sm">
                    <p className="font-weight-bold">{title}</p>
                    <p><FontAwesomeIcon className="icon-sm mr-2" icon={faAlignJustify} />{description}</p>
                </div>
            </div>
        </Link >
    );
};

ProjectItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    redirect: PropTypes.string,
}

export default ProjectItem;
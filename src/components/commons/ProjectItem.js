import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const ProjectItem = () => {
    return (
        <Link to="/project/1">
            <div className="p-3 d-flex flex-row align-items-center hover-bg-dark">
                <FontAwesomeIcon className="mr-3" icon={faDiceD20} />
                <div className="text-sm">
                    <p className="font-weight-bold">Project Name</p>
                    <p><FontAwesomeIcon className="icon-sm" icon={faAlignJustify} /> This is the project description</p>
                </div>
            </div>
        </Link>
    );
};

export default ProjectItem;
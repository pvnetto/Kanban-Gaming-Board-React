import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const ProjectItem = (props) => {
    return (
        <Link to={`/project/${props.id}${props.redirect || ''}`}>
            <div className="p-3 d-flex flex-row align-items-center hover-bg-dark">
                <FontAwesomeIcon className="mr-3" icon={faDiceD20} />
                <div className="text-sm">
                    <p className="font-weight-bold">{props.title}</p>
                    <p><FontAwesomeIcon className="icon-sm mr-2" icon={faAlignJustify} />{props.description}</p>
                </div>
            </div>
        </Link >
    );
};

export default ProjectItem;
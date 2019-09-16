import React from 'react';
import ProjectItem from './ProjectItem';

const SectionContainer = (props) => {
    return (
        <div>
            <div>
                <i>{props.titleIcon}</i>
                <h4>{props.title}</h4>
                <hr />
            </div>
            <div>
                {props.items || "No items to render :("}
            </div>
        </div>
    );
};

export default SectionContainer;
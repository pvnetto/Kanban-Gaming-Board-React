import React from 'react';

const SectionNavbar = (props) => {
    return (
        <div className="col-12">
            <div>
                <i>{props.sectionIcon}</i>
                <h4>{props.sectionTitle}</h4>
            </div>
            {props.options}
        </div>
    );
};

export default SectionNavbar;
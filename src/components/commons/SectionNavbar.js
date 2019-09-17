import React from 'react';

const SectionNavbar = (props) => {
    return (
        <div className="col-12 bg-dark border-2 border-light border-top-0 border-left-0 p-3">
            <div className="d-flex">
                <i>{props.sectionIcon}</i>
                <h4 className="font-weight-bold emphasized">{props.sectionTitle}</h4>
            </div>
            {props.options}
        </div>
    );
};

export default SectionNavbar;
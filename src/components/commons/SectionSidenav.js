import React from 'react';

const SectionSidenav = (props) => {
    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <div className="inner-sidenav bg-dark border-2 border-light">
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    {props.buttons}
                </ul>
            </div>
        </div>
    );
};

export default SectionSidenav;
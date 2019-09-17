import React from 'react';

const NavigationBar = () => {
    return (
        <div className="w-100 d-flex flex-row bg-dark border-2 border-left-0 border-light p-3">
            <i>I</i>
            <p>Workspace {"/"} {"Enter current section"}</p>
        </div>
    );
};

export default NavigationBar;
import React from 'react';

import style from './sidenav.module.scss';

const Sidenav = ({ children, className }) => {
    return (
        <div className={`${style.sidenav} ${className}`}>
            {children}
        </div>
    );
};

export default Sidenav;
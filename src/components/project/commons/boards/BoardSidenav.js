import React from 'react';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SidenavButton from '../../../commons/sidenav/SidenavButton';
import { createWorkspaceLink, createWorkspaceBtn } from '../../../commons/sidenav/SidenavButtonCreator';

const BoardSidenav = () => {

    const boardBtns = [
        createWorkspaceBtn("ALL ITEMS", faGamepad),
        createWorkspaceBtn("PROGRAMMING", faDiceD20),
        createWorkspaceBtn("ART", faGamepad),
        createWorkspaceBtn("DESIGN", faGamepad),
        createWorkspaceBtn("WRITING", faGamepad),
        createWorkspaceBtn("MARKETING", faGamepad),
        createWorkspaceBtn("SOUND", faGamepad),
        createWorkspaceBtn("BUGS", faGamepad),
    ];

    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <div className="inner-sidenav bg-dark border-2 border-light">
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    {boardBtns.map(btn => <SidenavButton {...btn} />)}
                </ul>
            </div>
        </div>
    );
};

export default BoardSidenav;
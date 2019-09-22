import React from 'react';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SidenavButton from '../../../commons/sidenav/SidenavButton';
import { createWorkspaceLink, createWorkspaceBtn } from '../../../commons/sidenav/SidenavButtonCreator';

const BoardSidenav = ({ categories, onClick, activeCategory }) => {

    const boardBtns = [
        createWorkspaceBtn(categories.ALL, faGamepad),
        createWorkspaceBtn(categories.PROGRAMMING, faDiceD20),
        createWorkspaceBtn(categories.ART, faGamepad),
        createWorkspaceBtn(categories.DESIGN, faGamepad),
        createWorkspaceBtn(categories.WRITING, faGamepad),
        createWorkspaceBtn(categories.MARKETING, faGamepad),
        createWorkspaceBtn(categories.SOUND, faGamepad),
        createWorkspaceBtn(categories.BUGS, faGamepad),
    ];

    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <div className="inner-sidenav bg-dark border-2 border-light">
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    {boardBtns.map(btn => <SidenavButton {...btn} onClick={() => onClick(btn.btnTitle)} active={activeCategory == btn.btnTitle} />)}
                </ul>
            </div>
        </div>
    );
};

export default BoardSidenav;
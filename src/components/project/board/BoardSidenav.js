import React from 'react';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SidenavButton from '../../commons/sidenav/SidenavButton';
import { createWorkspaceBtn } from '../../commons/sidenav/SidenavButtonCreator';
import { allCategories } from '../../commons/Categories';

const BoardSidenav = ({ onClick, activeCategory }) => {

    const boardBtns = [
        createWorkspaceBtn(allCategories.ALL, faGamepad),
        createWorkspaceBtn(allCategories.PROGRAMMING, faDiceD20),
        createWorkspaceBtn(allCategories.ART, faGamepad),
        createWorkspaceBtn(allCategories.DESIGN, faGamepad),
        createWorkspaceBtn(allCategories.WRITING, faGamepad),
        createWorkspaceBtn(allCategories.MARKETING, faGamepad),
        createWorkspaceBtn(allCategories.SOUND, faGamepad),
        createWorkspaceBtn(allCategories.BUGS, faGamepad),
    ];

    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <div className="inner-sidenav bg-dark border-2 border-light">
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    {boardBtns.map(btn => <SidenavButton {...btn} isExpanded={true} onClick={() => onClick(btn.btnTitle)} active={activeCategory === btn.btnTitle} />)}
                </ul>
            </div>
        </div>
    );
};

export default BoardSidenav;
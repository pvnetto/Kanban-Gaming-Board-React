import React from 'react';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SectionSidenav from '../commons/SectionSidenav';
import SidenavButton from '../commons/SidenavButton';
import { createWorkspaceLink, createWorkspaceBtn } from '../commons/SidenavButtonCreator';

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

    const sidenavBtns = boardBtns.map(btn => <SidenavButton {...btn} />);

    return (
        <SectionSidenav buttons={sidenavBtns} />
    );
};

export default BoardSidenav;
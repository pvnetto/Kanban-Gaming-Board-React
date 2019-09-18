import React from 'react';
import SectionSidenav from '../commons/SectionSidenav';
import SidenavLink from '../commons/SidenavLink';

import { faGamepad } from '@fortawesome/free-solid-svg-icons';

const BoardSidenav = () => {

    const sidenavBtns = [
        <SidenavLink btnTitle={"ALL ITEMS"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"PROGRAMMING"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"ART"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"DESIGN"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"WRITING"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"MARKETING"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"SOUND"} btnIcon={faGamepad} />,
        <SidenavLink btnTitle={"BUGS"} btnIcon={faGamepad} />
    ];

    return (
        <SectionSidenav buttons={sidenavBtns} />
    );
};

export default BoardSidenav;
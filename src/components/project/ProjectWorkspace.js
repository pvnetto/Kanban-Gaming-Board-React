import React from 'react';
import Sidenav from '../commons/Sidenav';
import NavigationBar from '../commons/NavigationBar';
import SidenavButton from '../commons/SidenavButton';

const ProjectWorkspace = () => {
    const sidenavBtns = [
        <SidenavButton btnTitle={"CREATE"} btnIcon={"+"} />,
        <SidenavButton btnTitle={"DASHBOARD"} btnIcon={"DS"} />,
        <SidenavButton btnTitle={"BOARDS"} btnIcon={"B"} />,
        <SidenavButton btnTitle={"BACKLOG"} btnIcon={"BL"} />,
        <SidenavButton btnTitle={"DESIGN LOG"} btnIcon={"DL"} />,
        <SidenavButton btnTitle={"MANAGEMENT"} btnIcon={"M"} />
    ];

    const optionBtns = [
        <SidenavButton btnTitle={"Back to Workspace"} btnIcon={"BWS"} />
    ]


    return (
        <div>
            <Sidenav buttons={sidenavBtns} options={optionBtns} />
            <NavigationBar />
        </div>
    );
};

export default ProjectWorkspace;
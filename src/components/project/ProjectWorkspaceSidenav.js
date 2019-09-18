import React from 'react';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../commons/Sidenav';
import SidenavLink from '../commons/SidenavLink';
import SidenavButtonExpand from '../commons/SidenavButtonExpand';

const ProjectWorkspaceSidenav = ({ url }) => {

    const createWorkspaceLink = (btnTitle, btnIcon, link) => {
        return { btnTitle, btnIcon, link, url };
    };

    const createWorkspaceBtn = (btnTitle, btnIcon) => {
        return { btnTitle, btnIcon };
    };

    const workspaceLinks = {
        CREATE: createWorkspaceBtn("CREATE", faPlusSquare),
        DASHBOARD: createWorkspaceLink("DASHBOARD", faGamepad, "/dashboard"),
        BOARDS: createWorkspaceBtn("BOARDS", faClipboardList),
        BACKLOG: createWorkspaceLink("BACKLOG", faList, "/backlog"),
        DESIGN_LOG: createWorkspaceLink("DESIGN LOG", faEdit, "/design_log"),
        MANAGEMENT: createWorkspaceLink("MANAGEMENT", faCogs, "/management")
    };

    const createLinks = [
        createWorkspaceBtn("Board", faList),
        createWorkspaceBtn("Task", faEdit)
    ]

    const boardLinks = [
        createWorkspaceLink("Board 1", faClipboardList, "/boards/1"),
    ];

    const sidenavBtns = [
        <SidenavButtonExpand {...workspaceLinks.CREATE} expandBtns={createLinks} />,
        <SidenavLink {...workspaceLinks.DASHBOARD} />,
        <SidenavButtonExpand {...workspaceLinks.BOARDS} expandBtns={boardLinks} />,
        <SidenavLink {...workspaceLinks.BACKLOG} />,
        <SidenavLink {...workspaceLinks.DESIGN_LOG} />,
        <SidenavLink {...workspaceLinks.MANAGEMENT} />
    ];

    const optionBtns = [
        <SidenavLink btnTitle={"Back to Workspace"} btnIcon={faArrowLeft} url={"/workspace"} />
    ];

    return (
        <Sidenav buttons={sidenavBtns} options={optionBtns} />
    );
}

export default ProjectWorkspaceSidenav;
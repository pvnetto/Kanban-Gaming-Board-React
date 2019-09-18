import React from 'react';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../commons/Sidenav';
import SidenavLink from '../commons/SidenavLink';
import SidenavButtonExpand from '../commons/SidenavButtonExpand';

import { createWorkspaceLink, createWorkspaceBtn } from '../commons/SidenavButtonCreator';

const ProjectWorkspaceSidenav = ({ url }) => {

    const workspaceLinks = {
        CREATE: createWorkspaceBtn("CREATE", faPlusSquare, url),
        DASHBOARD: createWorkspaceLink("DASHBOARD", faGamepad, "/dashboard", url),
        BOARDS: createWorkspaceBtn("BOARDS", faClipboardList, url),
        BACKLOG: createWorkspaceLink("BACKLOG", faList, "/backlog", url),
        DESIGN_LOG: createWorkspaceLink("DESIGN LOG", faEdit, "/design_log", url),
        MANAGEMENT: createWorkspaceLink("MANAGEMENT", faCogs, "/management", url)
    };

    const createLinks = [
        createWorkspaceBtn("Board", faList),
        createWorkspaceBtn("Task", faEdit)
    ]

    const boardLinks = [
        createWorkspaceLink("Board 1", faClipboardList, "/boards/1", url),
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
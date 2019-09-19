import React, { useState } from 'react';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../../commons/sidenav/Sidenav';
import SidenavLink from '../../commons/sidenav/SidenavLink';
import SidenavButtonExpand from '../../commons/sidenav/SidenavButtonExpand';
import { createWorkspaceLink, createWorkspaceBtn } from '../../commons/sidenav/SidenavButtonCreator';
import CreateBoardModal from './CreateBoardModal';
import CreateTaskModal from './CreateTaskModal';


const ProjectWorkspaceSidenav = ({ url }) => {

    // Sidenav hooks
    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);

    const handleOpenBoardModal = () => {
        setShowCreateBoard(true);
    }

    const handleCloseBoardModal = () => {
        setShowCreateBoard(false);
    }

    const handleOpenTaskModal = () => {
        setShowCreateTask(true);
    }

    const handleCloseTaskModal = () => {
        setShowCreateTask(false);
    }

    // Sidenav buttons configurations
    const workspaceLinks = {
        CREATE: createWorkspaceBtn("CREATE", faPlusSquare, url),
        DASHBOARD: createWorkspaceLink("DASHBOARD", faGamepad, "/dashboard", url),
        BOARDS: createWorkspaceBtn("BOARDS", faClipboardList, url),
        BACKLOG: createWorkspaceLink("BACKLOG", faList, "/backlog", url),
        DESIGN_LOG: createWorkspaceLink("DESIGN LOG", faEdit, "/design_log", url),
        MANAGEMENT: createWorkspaceLink("MANAGEMENT", faCogs, "/management", url)
    };

    const createLinks = [
        createWorkspaceBtn("Board", faList, handleOpenBoardModal),
        createWorkspaceBtn("Task", faEdit, handleOpenTaskModal)
    ]

    const boardLinks = [
        createWorkspaceLink("Board 1", faClipboardList, "/boards/1", url),
    ];

    // Sidenav buttons components
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
        <>
            <CreateBoardModal showModal={showCreateBoard} handleClose={handleCloseBoardModal} />
            <CreateTaskModal showModal={showCreateTask} handleClose={handleCloseTaskModal} />

            <Sidenav buttons={sidenavBtns} options={optionBtns} />
        </>
    );
}

export default ProjectWorkspaceSidenav;
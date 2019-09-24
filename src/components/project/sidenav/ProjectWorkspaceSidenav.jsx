import React, { useState } from 'react';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../../commons/sidenav/Sidenav';
import SidenavLink from '../../commons/sidenav/SidenavLink';
import SidenavButtonExpand from '../../commons/sidenav/SidenavButtonExpand';
import { createWorkspaceLink, createWorkspaceBtn } from '../../commons/sidenav/SidenavButtonCreator';
import ModalBase from '../../commons/ModalBase';
import CreateBoardForm from './CreateBoardForm';
import CreateTaskForm from './CreateTaskForm';


const ProjectWorkspaceSidenav = ({ url, params, boards, onExpand, addBoard, addTask }) => {

    // Sidenav hooks
    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);

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
        createWorkspaceBtn("Board", faList, () => setShowCreateBoard(true)),
        createWorkspaceBtn("Task", faEdit, () => setShowCreateTask(true))
    ]

    const boardLinks = boards.map(board => createWorkspaceLink(board.title, faClipboardList, `/boards/${board.title}`, url));

    // Sidenav buttons components
    const renderSidenavBtns = (isExpanded) => (
        <>
            <SidenavButtonExpand {...workspaceLinks.CREATE} expandBtns={createLinks} isExpanded={isExpanded} />
            <SidenavLink {...workspaceLinks.DASHBOARD} isExpanded={isExpanded} />
            <SidenavButtonExpand {...workspaceLinks.BOARDS} expandBtns={boardLinks} isExpanded={isExpanded} />
            <SidenavLink {...workspaceLinks.BACKLOG} isExpanded={isExpanded} />
            <SidenavLink {...workspaceLinks.DESIGN_LOG} isExpanded={isExpanded} />
            <SidenavLink {...workspaceLinks.MANAGEMENT} isExpanded={isExpanded} />

            <hr className="m-1 border border-light" />

            <SidenavLink btnTitle={"Back to Workspace"} btnIcon={faArrowLeft} url={"/workspace"} isExpanded={isExpanded} />
        </>
    );

    return (
        <>
            <ModalBase title={"Create Board"} showModal={showCreateBoard} handleClose={() => setShowCreateBoard(false)}>
                <CreateBoardForm addBoard={addBoard} projectId={params.projectId} />
            </ModalBase>

            <ModalBase showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} title="Create Task">
                <CreateTaskForm addTask={addTask} boards={boards} projectId={params.projectId} />
            </ ModalBase>

            <Sidenav onExpand={onExpand}>
                {renderSidenavBtns}
            </Sidenav>
        </>
    );
}

export default ProjectWorkspaceSidenav;
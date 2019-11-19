import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../../commons/sidenav/Sidenav';
import SidenavLink from '../../commons/sidenav/SidenavLink';
import ModalBase from '../../commons/ModalBase';
import CreateBoardForm from './CreateBoardForm';
import CreateTaskForm from './CreateTaskForm';
import SidenavExpand from '../../commons/sidenav/SidenavExpand';
import { useBoards } from '../../contexts/BoardsContext';
import { useTasks } from '../../contexts/TasksContext';


const ProjectWorkspaceSidenav = ({ url, onExpand }) => {

    // Sidenav hooks
    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);

    const { boards } = useBoards();
    const { addTaskToBoard, addTaskToBacklog } = useTasks();

    const showExpandLinks = (show, isExpanded) => (
        <>
            <SidenavExpand.Button title="Board" icon={faList} show={show} isExpanded={isExpanded} onClick={() => setShowCreateBoard(true)} />
            <SidenavExpand.Button title="Task" icon={faEdit} show={show} isExpanded={isExpanded} onClick={() => setShowCreateTask(true)} />
        </>
    );

    const showBoardLinks = (show, isExpanded) => (
        <>
            {boards.map((board, idx) => (
                <SidenavExpand.Link key={idx} title={board.title} icon={faClipboardList}
                    link={`/boards/${board.id}`} url={url}
                    show={show} isExpanded={isExpanded} />
            ))}
        </>
    )

    // Sidenav buttons components
    const renderSidenavBtns = (isExpanded) => (
        <>
            <SidenavExpand title={"CREATE"} icon={faPlusSquare} url={url} isExpanded={isExpanded}>
                {showExpandLinks}
            </ SidenavExpand>

            <SidenavLink title={"DASHBOARD"} icon={faGamepad} link={"/dashboard"} url={url} isExpanded={isExpanded} />
            <SidenavExpand title={"BOARDS"} icon={faClipboardList} url={url} isExpanded={isExpanded}>
                {showBoardLinks}
            </ SidenavExpand>
            <SidenavLink title={"BACKLOG"} icon={faList} link={"/backlog"} url={url} isExpanded={isExpanded} />
            <SidenavLink title={"DESIGN LOG"} icon={faPencilRuler} link={"/design_log"} url={url} isExpanded={isExpanded} />
            <SidenavLink title={"MANAGEMENT"} icon={faCogs} link={"/management"} url={url} isExpanded={isExpanded} />

            <hr className="m-1 border border-light" />

            <SidenavLink title={"Back to Workspace"} icon={faArrowLeft} url={"/workspace"} isExpanded={isExpanded} />
        </>
    );

    return (
        <>
            <ModalBase title={"Create Board"} showModal={showCreateBoard} handleClose={() => setShowCreateBoard(false)}>
                <CreateBoardForm />
            </ModalBase>

            <ModalBase showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} title={"Create Task"}>
                <CreateTaskForm {...{ addTaskToBoard, addTaskToBacklog }} />
            </ ModalBase>

            <Sidenav onExpand={onExpand}>
                {renderSidenavBtns}
            </Sidenav>
        </>
    );
}

ProjectWorkspaceSidenav.propTypes = {
    url: PropTypes.string.isRequired,
    onExpand: PropTypes.func.isRequired,
};

export default ProjectWorkspaceSidenav;
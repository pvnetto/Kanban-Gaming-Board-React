import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { faPlusSquare, faGamepad, faCogs, faClipboardList, faEdit, faList, faArrowLeft, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import { addTaskToBoard, addTaskToBacklog } from '../../dispatchers/tasks/task-actions-async';
import WorkspaceSidenav from '../../layout/sidenav/workspace';
import SidenavLink from '../../layout/sidenav/link';
import ModalBase from '../../utils/ModalBase';
import BoardCreateForm from '../../layout/forms/BoardCreateForm';
import TaskCreateForm from '../../layout/forms/TaskCreateForm';
import SidenavDropdown from '../../layout/sidenav/dropdown';


const ProjectWorkspaceSidenav = ({ url, onExpand }) => {

    // Sidenav hooks
    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);

    const boards = useSelector(state => state.boards.boards);

    const showExpandLinks = (show, isExpanded) => (
        <>
            <SidenavDropdown.Button title="Board" icon={faList} show={show} isExpanded={isExpanded} onClick={() => setShowCreateBoard(true)} />
            <SidenavDropdown.Button title="Task" icon={faEdit} show={show} isExpanded={isExpanded} onClick={() => setShowCreateTask(true)} />
        </>
    );

    const showBoardLinks = (show, isExpanded) => (
        <>
            {boards.map((board, idx) => (
                <SidenavDropdown.Link key={idx} title={board.title} icon={faClipboardList}
                    link={`/boards/${board.id}`} url={url}
                    show={show} isExpanded={isExpanded} />
            ))}
        </>
    )

    return (
        <>
            <ModalBase title={"Create Board"} showModal={showCreateBoard} handleClose={() => setShowCreateBoard(false)}>
                <BoardCreateForm />
            </ModalBase>

            <ModalBase showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} title={"Create Task"}>
                <TaskCreateForm {...{ addTaskToBoard, addTaskToBacklog }} />
            </ ModalBase>

            <WorkspaceSidenav onExpand={onExpand}>
                {(isExpanded) => (
                    <>
                        <SidenavDropdown title={"CREATE"} icon={faPlusSquare} url={url} isExpanded={isExpanded}>
                            {showExpandLinks}
                        </ SidenavDropdown>

                        <SidenavLink title={"DASHBOARD"} icon={faGamepad} link={"/dashboard"} url={url} isExpanded={isExpanded} />

                        <SidenavDropdown title={"BOARDS"} icon={faClipboardList} url={url} isExpanded={isExpanded}>
                            {showBoardLinks}
                        </ SidenavDropdown>

                        <SidenavLink title={"BACKLOG"} icon={faList} link={"/backlog"} url={url} isExpanded={isExpanded} />
                        <SidenavLink title={"DESIGN LOG"} icon={faPencilRuler} link={"/design_log"} url={url} isExpanded={isExpanded} />
                        <SidenavLink title={"MANAGEMENT"} icon={faCogs} link={"/management"} url={url} isExpanded={isExpanded} />

                        <hr className="m-1 border border-light" />

                        <SidenavLink title={"Back to Workspace"} icon={faArrowLeft} url={"/workspace"} isExpanded={isExpanded} />
                    </>
                )}
            </WorkspaceSidenav>
        </>
    );
}

ProjectWorkspaceSidenav.propTypes = {
    url: PropTypes.string.isRequired,
    onExpand: PropTypes.func.isRequired,
};

export default ProjectWorkspaceSidenav;
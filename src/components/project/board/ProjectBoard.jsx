import React, { useState, useEffect, useContext } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import BoardsContext from '../../contexts/BoardsContext';
import SectionNavbarLink from '../../commons/SectionNavbarLink';

const ProjectBoard = (props) => {

    let [boardTasks, setBoardTasks] = useState([]);
    let { boards, project, tasks, removeBoard } = useContext(BoardsContext);

    useEffect(() => {
        const boardId = props.match.params.boardId;
        const currentBoard = boards.find(board => board.title === boardId);

        if (currentBoard) {
            setBoardTasks([...tasks]);
        }
    }, [tasks]);

    return (
        <BoardContainer {...props} tasks={boardTasks} columns={[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}>
            <BoardContainer.Header title={"Boards"}>
                <SectionNavbarLink title={"Close board"} icon={faWindowClose} link={`/project/${project.id}`} onClick={() => removeBoard(props.match.params.boardId)} />
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBoard;
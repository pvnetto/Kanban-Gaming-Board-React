import React, { useState, useEffect, useContext } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import BoardsContext from '../../contexts/BoardsContext';
import SectionNavbarButton from '../../commons/SectionNavbarButton';

const ProjectBoard = (props) => {

    let [boardTasks, setBoardTasks] = useState([]);
    let { boards, tasks } = useContext(BoardsContext);

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
                <SectionNavbarButton btnTitle={"Close board"} btnIcon={faWindowClose} onClick={() => console.log("Closing board")} />
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBoard;
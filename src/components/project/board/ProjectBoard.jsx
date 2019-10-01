import React, { useState, useEffect, useContext } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import SectionNavbarLink from '../../commons/SectionNavbarLink';
import { useTasks } from '../../contexts/TasksContext';
import { useBoards } from '../../contexts/BoardsContext';

const ProjectBoard = (props) => {

    let [tasks, setTasks] = useState([]);
    const { project, removeBoard } = useBoards();
    const { fetchTasksFromBoard, listenToBoardTaskChanges } = useTasks();

    useEffect(() => {
        let listener = null;

        const listenToTasks = async () => {
            const boardId = props.match.params.boardId;
            listener = await listenToBoardTaskChanges(boardId, (snapshotTasks) => {
                setTasks([...snapshotTasks]);
            });
        }

        listenToTasks();

        return () => {
            listener && listener();
        }
    }, []);

    return (
        <BoardContainer {...props} tasks={tasks} columns={[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}>
            <BoardContainer.Header title={"Boards"}>
                <SectionNavbarLink title={"Close board"} icon={faWindowClose} link={`/project/${project.id}`} onClick={() => removeBoard(props.match.params.boardId)} />
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBoard;
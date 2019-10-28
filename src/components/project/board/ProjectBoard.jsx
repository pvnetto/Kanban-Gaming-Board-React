import React, { useState, useEffect } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import SectionNavbarLink from '../../commons/SectionNavbarLink';
import { useTasks } from '../../contexts/TasksContext';
import { useBoards } from '../../contexts/BoardsContext';

const ProjectBoard = (props) => {

    let [tasks, setTasks] = useState({});
    const { project, removeBoard } = useBoards();
    const { listenToBoardTaskChanges, addTaskToBoard, addTaskToBacklog, updateBoardTasks, removeTaskFromBoard } = useTasks();

    useEffect(() => {
        let listener = null;

        const listenToTasks = async () => {
            const boardId = props.match.params.boardId;
            listener = await listenToBoardTaskChanges(boardId, (snapshotTasks) => {
                setTasks(Object.assign({}, snapshotTasks));
            });
        }

        listenToTasks();

        return () => {
            listener && listener();
        }
    }, []);

    const addTaskToBoardWithPreview = (boardId, name, description, category) => {
        const newTask = addTaskToBoard(boardId, name, description, category);

        let tasksCopy = Object.assign({}, tasks);
        tasksCopy[newTask.status].push(newTask);

        setTasks(tasksCopy);
    }

    return (
        <BoardContainer
            tasks={tasks}
            updateTasks={(tasks) => updateBoardTasks(props.match.params.boardId, tasks)}
            removeTask={(task) => removeTaskFromBoard(props.match.params.boardId, task)}
            columns={[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}
        >

            <BoardContainer.Header addTaskToBoard={addTaskToBoardWithPreview} addTaskToBacklog={addTaskToBacklog} title={"Boards"}>
                <SectionNavbarLink title={"Close board"} icon={faWindowClose} link={`/project/${project.id}`} onClick={() => removeBoard(props.match.params.boardId)} />
            </BoardContainer.Header>

        </BoardContainer>
    );
};

export default ProjectBoard;
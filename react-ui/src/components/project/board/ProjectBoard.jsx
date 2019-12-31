import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import SectionNavbarLink from '../../commons/SectionNavbarLink';
import { removeBoardAction } from '../../../firebase/actions/board-actions';
import { useTasks } from '../../contexts/TasksContext';
import { useAuth0 } from '../../../auth0-wrapper';

const ProjectBoard = ({ match }) => {

    let [tasks, setTasks] = useState(null);
    const { firebaseClient } = useAuth0();
    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    const { listenToBoardTaskChanges, addTaskToBoard, addTaskToBacklog, updateBoardTasks, removeTaskFromBoard } = useTasks();

    useEffect(() => {
        setTasks(null);
        let listener = null;

        const listenToTasks = async () => {
            const boardId = match.params.boardId;
            listener = await listenToBoardTaskChanges(boardId, (snapshotTasks) => {
                setTasks(Object.assign({}, snapshotTasks));
            });
        }

        listenToTasks();

        return () => {
            listener && listener();
        }
    }, [match]);

    const addTaskToBoardWithPreview = (boardId, name, description, category) => {
        const newTask = addTaskToBoard(boardId, name, description, category, firebaseClient.boardService);

        let tasksCopy = Object.assign({}, tasks);
        tasksCopy[newTask.status].push(newTask);

        setTasks(tasksCopy);
    }

    return (
        <BoardContainer tasks={tasks}
            updateTasks={(tasks) => updateBoardTasks(match.params.boardId, tasks)}
            removeTask={(task) => removeTaskFromBoard(match.params.boardId, task)}
            columns={[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}>

            <BoardContainer.Header addTaskToBoard={addTaskToBoardWithPreview} addTaskToBacklog={addTaskToBacklog} title={"Boards"}>
                <SectionNavbarLink
                    title={"Close board"}
                    icon={faWindowClose}
                    link={`/project/${currentProject.id}`}
                    onClick={() => dispatch(removeBoardAction(match.params.boardId))} />
            </BoardContainer.Header>

        </BoardContainer>
    );
};

ProjectBoard.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProjectBoard;
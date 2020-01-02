import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import SectionNavbarLink from '../../commons/SectionNavbarLink';
import { removeBoardAction } from '../../../firebase/actions/board-actions';
import { updateBoardTasks, removeTaskFromBoard, fetchTasksFromBoard } from '../../../firebase/actions/task-actions';

const ProjectBoard = ({ match }) => {

    const tasks = useSelector(state => state.tasks.board.tasks);
    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    useEffect(() => {
        const boardId = match.params.boardId;
        dispatch(fetchTasksFromBoard(boardId));
    }, [match]);

    return (
        <BoardContainer tasks={tasks}
            updateTasks={(tasks) => updateBoardTasks(match.params.boardId, tasks)}
            removeTask={(task) => removeTaskFromBoard(match.params.boardId, task)}
            columns={[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}>

            <BoardContainer.Header title={"Boards"}>
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
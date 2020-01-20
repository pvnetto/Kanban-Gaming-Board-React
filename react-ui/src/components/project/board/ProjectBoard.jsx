import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import BoardContainer from './BoardContainer';
import TaskStatus from '../../utils/types/TaskStatus';
import SectionNavbarLink from '../../layout/section/SectionNavbarLink';
import { removeBoardAction } from '../../dispatchers/boards/board-actions-async';
import { updateBoardTasks, removeTaskFromBoard, fetchTasksFromBoard } from '../../dispatchers/tasks/task-actions-async';

const ProjectBoard = ({ match }) => {

    const isPending = useSelector(state => state.tasks.board.isPending);
    const tasks = useSelector(state => state.tasks.board.tasks);
    const currentProject = useSelector(state => state.boards.currentProject);
    const dispatch = useDispatch();

    useEffect(() => {
        const boardId = match.params.boardId;
        dispatch(fetchTasksFromBoard(boardId));
    }, [match, currentProject]);

    if (!currentProject) return null;

    return (
        <BoardContainer
            tasks={tasks}
            isPending={isPending}
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
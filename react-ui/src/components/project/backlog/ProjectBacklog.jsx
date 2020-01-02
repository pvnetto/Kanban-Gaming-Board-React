import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTasksFromBacklog, updateBacklogTasks, removeTaskFromBacklog } from '../../dispatchers/tasks/task-actions-async';
import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';

const ProjectBacklog = () => {

    const currentProject = useSelector(state => state.boards.currentProject);
    const tasks = useSelector(state => state.tasks.backlog.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksFromBacklog());
    }, [currentProject]);

    if (!currentProject) return null;

    return (
        <BoardContainer tasks={tasks} removeTask={removeTaskFromBacklog} updateTasks={updateBacklogTasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
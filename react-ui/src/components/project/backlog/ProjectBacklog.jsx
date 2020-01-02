import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTasksFromBacklog, updateBacklogTasks, removeTaskFromBacklog } from '../../../firebase/actions/task-actions';
import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';

const ProjectBacklog = () => {

    const tasks = useSelector(state => state.tasks.backlog.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksFromBacklog());
    }, []);

    return (
        <BoardContainer tasks={tasks} removeTask={removeTaskFromBacklog} updateTasks={updateBacklogTasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
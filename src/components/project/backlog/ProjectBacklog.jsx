import React, { useState, useEffect, useContext } from 'react';

import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import BoardsContext from '../../contexts/BoardsContext';

const ProjectBacklog = (props) => {

    let [boardTasks, setBoardTasks] = useState([]);
    let { tasks } = useContext(BoardsContext);

    useEffect(() => {
        const backlogTasks = tasks.filter(task => task.status === TaskStatus.BACKLOG);
        setBoardTasks([...backlogTasks]);
    }, [tasks]);

    return (
        <BoardContainer {...props} tasks={boardTasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
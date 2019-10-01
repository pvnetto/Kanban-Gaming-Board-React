import React, { useState, useEffect, useContext } from 'react';

import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import BoardsContext from '../../contexts/BoardsContext';
import { useTasks } from '../../contexts/TasksContext';

const ProjectBacklog = (props) => {

    let [tasks, setTasks] = useState([]);
    const { fetchTasksFromBacklog } = useTasks();

    useEffect(() => {
        const getTasks = async () => {
            const fetchedTasks = await fetchTasksFromBacklog();
            setTasks([...fetchedTasks]);
        }

        getTasks();
    }, []);

    return (
        <BoardContainer {...props} tasks={tasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
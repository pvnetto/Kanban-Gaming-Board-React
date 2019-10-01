import React, { useState, useEffect } from 'react';

import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import { useTasks } from '../../contexts/TasksContext';

const ProjectBacklog = (props) => {

    let [tasks, setTasks] = useState([]);
    const { listenToBacklogTaskChanges } = useTasks();

    useEffect(() => {
        let listener = null;
        const listenToTasks = async () => {
            listener = await listenToBacklogTaskChanges((snapshotTasks) => {
                setTasks([...snapshotTasks]);
            });
        }

        listenToTasks();

        return () => {
            listener && listener();
        }
    }, []);

    return (
        <BoardContainer {...props} tasks={tasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
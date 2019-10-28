import React, { useState, useEffect } from 'react';

import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';
import { useTasks } from '../../contexts/TasksContext';

const ProjectBacklog = (props) => {

    let [tasks, setTasks] = useState([]);
    const { listenToBacklogTaskChanges, addTaskToBoard, addTaskToBacklog, updateBacklogTasks, removeTaskFromBacklog } = useTasks();

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

    const addTaskToBacklogWithPreview = (name, description, category) => {
        const newTask = addTaskToBacklog(name, description, category);
        setTasks([...tasks, newTask]);
    }

    return (
        <BoardContainer {...props} tasks={tasks} removeTask={removeTaskFromBacklog} updateTasks={updateBacklogTasks} columns={[TaskStatus.BACKLOG]}>
            <BoardContainer.Header addTaskToBoard={addTaskToBoard} addTaskToBacklog={addTaskToBacklogWithPreview} title={"Backlog"}>
            </BoardContainer.Header>
        </BoardContainer>
    );
};

export default ProjectBacklog;
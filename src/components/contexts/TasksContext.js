import React, { useState, useEffect, useContext } from 'react';

import TaskStatus from '../commons/TaskStatus';
import { useAuth0 } from '../../auth0-wrapper';
import { useBoards } from './BoardsContext';


const TasksContext = React.createContext({});
export const useTasks = () => useContext(TasksContext);
export const TasksProvider = ({ children }) => {

    const { project } = useBoards();
    const { firebaseClient } = useAuth0();

    const addTaskToBoard = async (boardId, name, description, category) => {
        let newTask = {
            name,
            description,
            category,
            status: TaskStatus.PLANNED
        };

        // setAlert({ show: true, msg: `${name} task was succesfully created.` });
        return await firebaseClient.insertTaskToBoard(project.id, boardId, newTask);
    }

    const addTaskToBacklog = async (name, description, category) => {
        let newTask = {
            name,
            description,
            category,
            status: TaskStatus.BACKLOG
        };

        return await firebaseClient.insertTaskToBacklog(project.id, newTask);
    }

    const fetchTasksFromBoard = async (boardId) => {
        let tasks = await firebaseClient.fetchTasksFromBoard(project.id, boardId);
        return tasks;
    }

    const fetchTasksFromBacklog = async () => {
        let backlogTasks = await firebaseClient.fetchTasksFromBacklog(project.id);
        return backlogTasks;
    }

    const listenToBoardTaskChanges = async (boardId, listener) => {
        let listenerRef = await firebaseClient.setBoardTasksListener(project.id, boardId, listener);
        return listenerRef;
    }

    const listenToBacklogTaskChanges = async (listener) => {
        let listenerRef = await firebaseClient.setBacklogTasksListener(project.id, listener);
        return listenerRef;
    }

    const removeTask = (id) => {
        // const tasksCopy = [...tasks];
        // const taskToRemove = tasksCopy.findIndex(task => task.id === id);
        // tasksCopy.splice(taskToRemove, 1);

        // setTasks([...tasksCopy]);
    }

    return (
        <TasksContext.Provider value={{
            addTaskToBoard,
            addTaskToBacklog,
            fetchTasksFromBoard,
            fetchTasksFromBacklog,
            listenToBoardTaskChanges,
            listenToBacklogTaskChanges,
            removeTask
        }}>
            {children}
        </TasksContext.Provider>
    );
}


export const TasksConsumer = TasksContext.Consumer;
export default TasksContext;

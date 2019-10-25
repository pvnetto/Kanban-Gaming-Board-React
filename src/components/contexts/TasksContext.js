import React, { useContext } from 'react';

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
        return await firebaseClient.taskService.insertTaskToBoard(project.id, boardId, newTask);
    }

    const addTaskToBacklog = async (name, description, category) => {
        let newTask = {
            name,
            description,
            category,
            status: TaskStatus.BACKLOG
        };

        return await firebaseClient.taskService.insertTaskToBacklog(project.id, newTask);
    }

    const fetchTasksFromProject = async () => {
        return await firebaseClient.taskService.fetchAllTasksFromProject(project.id);
    }

    const fetchTasksFromBoard = async (boardId) => {
        return await firebaseClient.taskService.fetchTasksFromBoard(project.id, boardId);
    }

    const fetchTasksFromBacklog = async () => {
        return await firebaseClient.taskService.fetchTasksFromBacklog(project.id);
    }

    const listenToBoardTaskChanges = async (boardId, listener) => {
        let listenerRef = await firebaseClient.taskService.setBoardTasksListener(project.id, boardId, listener);
        return listenerRef;
    }

    const listenToBacklogTaskChanges = async (listener) => {
        let listenerRef = await firebaseClient.taskService.setBacklogTasksListener(project.id, listener);
        return listenerRef;
    }

    const updateBoardTasks = async (boardId, tasks) => {
        return await firebaseClient.taskService.updateBoardTasks(project.id, boardId, tasks);
    }

    const updateBacklogTasks = async (tasks) => {
        return await firebaseClient.taskService.updateBacklogTasks(project.id, tasks);
    }

    const removeTaskFromBoard = async (boardId, task) => {
        return await firebaseClient.taskService.removeTaskFromBoard(project.id, boardId, task);
    }

    const removeTaskFromBacklog = async (task) => {
        return await firebaseClient.taskService.removeTaskFromBacklog(project.id, task);
    }

    return (
        <TasksContext.Provider value={{
            addTaskToBoard,
            addTaskToBacklog,
            fetchTasksFromProject,
            fetchTasksFromBoard,
            fetchTasksFromBacklog,
            listenToBoardTaskChanges,
            listenToBacklogTaskChanges,
            updateBoardTasks,
            updateBacklogTasks,
            removeTaskFromBoard,
            removeTaskFromBacklog
        }}>
            {children}
        </TasksContext.Provider>
    );
}


export const TasksConsumer = TasksContext.Consumer;
export default TasksContext;

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import TaskStatus from '../commons/TaskStatus';


const TasksContext = React.createContext({});
export const useTasks = () => useContext(TasksContext);
export const TasksProvider = ({ children }) => {

    const currentProject = useSelector(state => state.boards.currentProject);
    const firebaseClient = useSelector(state => state.auth.firebaseClient);

    const addTaskToBoard = (boardId, name, description, category) => {
        let newTask = {
            id: generateTaskID(),
            name,
            description,
            category,
            status: TaskStatus.PLANNED
        };

        firebaseClient.taskService.insertTaskToBoard(currentProject.id, boardId, newTask);

        return newTask;
    }

    const addTaskToBacklog = (name, description, category) => {
        let newTask = {
            id: generateTaskID(),
            name,
            description,
            category,
            status: TaskStatus.BACKLOG
        };

        firebaseClient.taskService.insertTaskToBacklog(currentProject.id, newTask);

        return newTask;
    }

    const generateTaskID = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

    const fetchTasksFromProject = async () => {
        return await firebaseClient.taskService.fetchAllTasksFromProject(currentProject.id);
    }

    const fetchTasksFromBoard = async (boardId) => {
        return await firebaseClient.taskService.fetchTasksFromBoard(currentProject.id, boardId);
    }

    const fetchTasksFromBacklog = async () => {
        return await firebaseClient.taskService.fetchTasksFromBacklog(currentProject.id);
    }

    const listenToBoardTaskChanges = async (boardId, listener) => {
        let listenerRef = await firebaseClient.taskService.setBoardTasksListener(currentProject.id, boardId, listener);
        return listenerRef;
    }

    const listenToBacklogTaskChanges = async (listener) => {
        let listenerRef = await firebaseClient.taskService.setBacklogTasksListener(currentProject.id, listener);
        return listenerRef;
    }

    const updateBoardTasks = async (boardId, tasks) => {
        return await firebaseClient.taskService.updateBoardTasks(currentProject.id, boardId, tasks);
    }

    const updateBacklogTasks = async (tasks) => {
        return await firebaseClient.taskService.updateBacklogTasks(currentProject.id, tasks);
    }

    const removeTaskFromBoard = async (boardId, task) => {
        return await firebaseClient.taskService.removeTaskFromBoard(currentProject.id, boardId, task);
    }

    const removeTaskFromBacklog = async (task) => {
        return await firebaseClient.taskService.removeTaskFromBacklog(currentProject.id, task);
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

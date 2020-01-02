import { FETCH_BACKLOG_TASKS_SUCCESS, ADD_TASK_BACKLOG_SUCCESS, REMOVE_TASK_BACKLOG_SUCCESS, BACKLOG_PENDING, BACKLOG_ERROR, UPDATE_TASKS_BACKLOG_SUCCESS } from './backlog-types';

export const fetchBacklogTasksSuccess = (tasks) => {
    return {
        type: FETCH_BACKLOG_TASKS_SUCCESS,
        data: tasks,
    }
}

export const addTaskBacklogSuccess = (newTask) => {
    return {
        type: ADD_TASK_BACKLOG_SUCCESS,
        data: newTask,
    }
}

export const removeTaskBacklogSuccess = (task) => {
    return {
        type: REMOVE_TASK_BACKLOG_SUCCESS,
        data: task,
    }
}

export const updateTasksBacklogSuccess = (updatedTasks) => {
    return {
        type: UPDATE_TASKS_BACKLOG_SUCCESS,
        data: updatedTasks,
    }
}

export const backlogPending = () => {
    return {
        type: BACKLOG_PENDING,
    }
}

export const backlogError = (error) => {
    return {
        type: BACKLOG_ERROR,
        error,
    }
}
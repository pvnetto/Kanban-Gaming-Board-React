import { FETCH_BOARD_TASKS_SUCCESS, ADD_TASK_BOARD_SUCCESS, REMOVE_TASK_BOARD_SUCCESS, BOARD_TASK_PENDING, BOARD_TASK_ERROR, UPDATE_TASKS_BOARD_SUCCESS } from './board-types';

export const fetchBoardTasksSuccess = (tasks) => {
    return {
        type: FETCH_BOARD_TASKS_SUCCESS,
        data: tasks,
    }
}

export const addTaskBoardSuccess = (newTask) => {
    return {
        type: ADD_TASK_BOARD_SUCCESS,
        data: newTask,
    }
}

export const removeTaskBoardSuccess = (task) => {
    return {
        type: REMOVE_TASK_BOARD_SUCCESS,
        data: task,
    }
}

export const updateBoardTasksSuccess = (updatedTasks) => {
    return {
        type: UPDATE_TASKS_BOARD_SUCCESS,
        data: updatedTasks
    }
}

export const boardPending = () => {
    return {
        type: BOARD_TASK_PENDING,
    }
}

export const boardError = (error) => {
    return {
        type: BOARD_TASK_ERROR,
        error,
    }
}
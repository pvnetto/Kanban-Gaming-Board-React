import { FETCH_BOARD_TASKS_SUCCESS, ADD_TASK_BOARD_SUCCESS, REMOVE_TASK_BOARD_SUCCESS, BOARD_TASK_PENDING, BOARD_TASK_ERROR, UPDATE_TASKS_BOARD_SUCCESS } from './board-types';

const defaultState = { tasks: {}, isPending: false, };
const boardTasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BOARD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: Object.assign({}, action.data),
                isPending: false,
            }
        case ADD_TASK_BOARD_SUCCESS: {
            const tasksCopy = Object.assign({}, state.tasks);
            tasksCopy[action.data.status].push(action.data);
            return {
                ...state,
                tasks: Object.assign({}, tasksCopy),
                isPending: false,
            }
        }
        case REMOVE_TASK_BOARD_SUCCESS: {
            const tasksCopy = Object.assign({}, state.tasks);
            const taskIdx = tasksCopy[action.data.status].findIndex(task => task.id === action.data.id);
            tasksCopy[action.data.status].splice(taskIdx, 1);
            return {
                ...state,
                tasks: Object.assign({}, tasksCopy),
                isPending: false,
            }
        }
        case UPDATE_TASKS_BOARD_SUCCESS:
            return {
                ...state,
                tasks: Object.assign({}, action.data),
                isPending: false,
            }
        case BOARD_TASK_PENDING:
            return {
                ...state,
                isPending: true,
            }
        case BOARD_TASK_ERROR:
            return {
                ...state,
                isPending: false,
            }
        default:
            return state
    }
};

export default boardTasksReducer; 
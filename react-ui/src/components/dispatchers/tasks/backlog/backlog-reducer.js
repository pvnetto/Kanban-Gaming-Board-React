import { FETCH_BACKLOG_TASKS_SUCCESS, ADD_TASK_BACKLOG_SUCCESS, BACKLOG_PENDING, BACKLOG_ERROR, REMOVE_TASK_BACKLOG_SUCCESS, UPDATE_TASKS_BACKLOG_SUCCESS } from './backlog-types';

const defaultState = { tasks: {}, isPending: false, };
const backlogTasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_BACKLOG_TASKS_SUCCESS:
            return {
                ...state,
                tasks: Object.assign({}, action.data),
                isPending: false,
            }
        case ADD_TASK_BACKLOG_SUCCESS: {
            const tasksCopy = Object.assign({}, state.tasks);
            tasksCopy[action.data.status].push(action.data);
            return {
                ...state,
                tasks: Object.assign({}, tasksCopy),
                isPending: false,
            }
        }
        case REMOVE_TASK_BACKLOG_SUCCESS: {
            const tasksCopy = Object.assign({}, tasksCopy);
            const taskIdx = tasksCopy[action.data.status].findIndex(task => task.id === action.data.id);
            tasksCopy[action.data.status].splice(taskIdx, 1);
            return {
                ...state,
                tasks: Object.assign({}, tasksCopy),
                isPending: false,
            }
        }
        case UPDATE_TASKS_BACKLOG_SUCCESS:
            return {
                ...state,
                tasks: Object.assign({}, action.data),
                isPending: false,
            }
        case BACKLOG_PENDING:
            return {
                ...state,
                isPending: true,
            }
        case BACKLOG_ERROR:
            return {
                ...state,
                isPending: false,
            }
        default:
            return state
    }
};

export default backlogTasksReducer; 
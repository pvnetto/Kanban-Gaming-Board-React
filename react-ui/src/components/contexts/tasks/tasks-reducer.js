import { combineReducers } from 'redux';

import boardTasksReducer from './board/board-reducer';
import backlogTasksReducer from './backlog/backlog-reducer';

const tasksReducer = combineReducers({ board: boardTasksReducer, backlog: backlogTasksReducer });

export default tasksReducer;
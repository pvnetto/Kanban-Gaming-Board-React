import { combineReducers } from 'redux';

import authReducer from './auth/auth-reducer';
import projectsReducer from './projects/project-reducer';
import boardReducer from './boards/board-reducer';
import tasksReducer from './tasks/tasks-reducer';

const rootReducer = combineReducers({ auth: authReducer, projects: projectsReducer, boards: boardReducer, tasks: tasksReducer });

export default rootReducer;

import { combineReducers } from 'redux';

import projectsReducer from './projects/project-reducer';
import boardReducer from './boards/board-reducer';
import authReducer from './auth/auth-reducer';

const rootReducer = combineReducers({ auth: authReducer, projects: projectsReducer, boards: boardReducer });

export default rootReducer;

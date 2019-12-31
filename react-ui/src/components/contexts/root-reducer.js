import { combineReducers } from 'redux';

import projectsReducer from './projects/project-reducer';
import boardReducer from './boards/board-reducer';

const rootReducer = combineReducers({ projects: projectsReducer, boards: boardReducer });

export default rootReducer;

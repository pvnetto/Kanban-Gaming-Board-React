import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import workspaceReducer, { defaultState } from './workspace-reducer';

const middlewares = [thunk];
const workspaceStore = createStore(workspaceReducer, defaultState, applyMiddleware(...middlewares));

export default workspaceStore;
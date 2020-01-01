import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import {silentAuthentication} from '../../auth0/auth-actions';

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

store.dispatch(silentAuthentication());

export default store;
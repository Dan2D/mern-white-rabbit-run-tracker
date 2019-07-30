import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from './reducers';
import {initialState} from './initialState';
import thunk from 'redux-thunk';

let middleware = [thunk];
const store = createStore(rootReducer, initialState,compose(
    applyMiddleware(...middleware)));

export default store;
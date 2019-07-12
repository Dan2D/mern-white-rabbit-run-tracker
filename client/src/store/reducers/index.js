import {combineReducers} from 'redux';
import settingsReducer from './settingsReducer';
import runReducer from "./runReducer";
import userReducer from './userReducer';
// import all your reducers here

export const rootReducer = combineReducers({user: userReducer, goals: runReducer, settings: settingsReducer});
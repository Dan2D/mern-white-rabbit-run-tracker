import {combineReducers} from 'redux';
import settingsReducer from './settingsReducer';
import runReducer from "./runReducer";
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({auth: authReducer, goals: runReducer, settings: settingsReducer, error: errorReducer});
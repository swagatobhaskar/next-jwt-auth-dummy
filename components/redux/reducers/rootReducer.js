import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import blogReducer from './blogReducer';

export const rootReducer = combineReducers({
    loginReducer,
    blogReducer
})
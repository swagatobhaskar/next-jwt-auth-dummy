import * as types from '../actions/actionTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    user: [],
    fetching: false,
    error: null,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload};
        case types.LOGIN_REQUEST:
            return { ...state, fetching: true};
        case types.LOGIN_SUCCESS:
            return { ...state, fetching: false, user: action.user };
        case types.LOGIN_ERROR:
            return { ...state, fetching: false, error: action.error };
        default:
            return state;
    };
}
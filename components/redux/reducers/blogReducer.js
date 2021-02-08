import * as types from '../actions/actionTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    fetching: false,
    blog: [],
    error: null,
}

export default function blogReducer(state = initialState, action) {
    switch(action.type){
        case HYDRATE:
            return {...state, ...action.payload};
        case types.FETCH_BLOG_LIST:
            return { ...state, fetching: true };
        case types.FETCH_BLOG_LIST_SUCCESS:
            return { ...state, fetching: false, blog: action.blogs };
        case types.FETCH_BLOG_LIST_ERROR:
            return { ...state, fetching: false, error: action.error };
        default:
            return state;
    };
}

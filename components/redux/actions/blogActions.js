import * as types from './actionTypes';

export function fetchBlogList(access_token) {
    return {
        type: types.FETCH_BLOG_LIST,
        access_token
    };
}

export function fetchBlogListSuccess(blogs){
    return {
        type: types.FETCH_BLOG_LIST_SUCCESS,
        payload: {blogs}
    };
}

export function fetchBlogListError(error) {
    return {
        type: types.FETCH_BLOG_LIST_ERROR,
        error
    };
}

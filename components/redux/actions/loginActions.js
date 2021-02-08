import * as types from './actionTypes';

export function loginRequest(username, password) {
    return {
        type: types.LOGIN_REQUEST,
        payload: {username, password}
    };
}

export function loginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {user}
    };
}

export function loginError(error) {
    return{
        type: types.LOGIN_ERROR,
        error
    };
}

import * as types from '../actions/actionTypes';
import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {handleToken, handleRefreshToken} from './utils/cookieHandle';

import Cookies from 'js-cookie';

export default function* loginWatcherSaga(){
    yield takeLatest(types.LOGIN_REQUEST, workerSaga );
}

function loginReq(action){
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    return axios({
        method: "POST",
        url: "http://localhost:8000/api/token/",
        data: {
            username: action.username,
            password: action.password
        },
        headers: headers,
    });
}


async function refreshCall() {
    console.log("INSIDE REFRESHCALL(...)")
    const cookies = Cookies.get('refresh');
    console.log("JSCookie refresh: ", cookies);

    const headers = {
        "Content-Type": "application/json",
      }
    const data = {
        "refresh": cookies
    }
    //const resp = axios.post('127.0.0.1:8000/api/refresh/', headers);
    try {
        const resp = await axios({
            method: "POST",
            url: "http://localhost:8000/api/token/refresh/",
            data: data,
            headers: headers,
        });
        const new_access_token = resp.data;
        console.log("NEW TOKENS: ", new_access_token);
        handleRefreshToken(new_access_token);
    } catch (error) {
        console.log(error);
    }
 }
 

function* workerSaga( {action} ){
    try{
        const resp = yield call(loginReq, action);
        const user = resp.data;
        const decoder = yield call(handleToken, user);   // use axios Interceptor here
        yield put({ type:types.LOGIN_SUCCESS, user:user });     // it doesn't need to take any payload.

        //setTimeout(refreshCall(), 300000); // 5*60*1000
        setInterval(refreshCall, 300000); // 5*60*1000
    } catch(error) {
        yield put({ type:types.LOGIN_ERROR, error });
    }
}

// I think i need to put whole workwesaga inside setTimeout()
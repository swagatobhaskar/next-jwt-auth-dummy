import { call, put, takeLatest } from "redux-saga/effects";
import * as types from '../actions/actionTypes';
import axios from 'axios';

export default function* blogsWatcherSaga(){
    yield takeLatest(types.FETCH_BLOG_LIST, blogListWorkerSaga);
    
    // add yield take for blog detail
}

function fetchBlogList(action){
    const accessToken = action.access_token;
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
      };
    return axios({
        method:"GET",
        url: 'http://127.0.0.1:8000/api/blogs/',
        headers: headers
    })
    // .catch(function (error) {
    //     console.log(error);
    // });
}

function* blogListWorkerSaga(action){
    try {
        const resp = yield call(fetchBlogList, action);
        const blogs = resp.data;
        yield put({ type: types.FETCH_BLOG_LIST_SUCCESS, blogs });
    }
    catch (error) {
        yield put({ type: types.FETCH_BLOG_LIST_ERROR, error});
    }
}

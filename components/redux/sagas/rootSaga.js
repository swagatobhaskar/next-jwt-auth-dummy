import { fork } from 'redux-saga/effects';
import loginWatcherSaga from './loginSaga';
import blogsWatcherSaga from './blogSaga';

export default function* rootSaga() {
    yield fork(loginWatcherSaga)
    yield fork(blogsWatcherSaga)
    // code after fork-effect
}

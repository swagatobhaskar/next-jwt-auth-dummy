import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension';
import { logger } from 'redux-logger';

import { rootReducer } from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const makeStore = context => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, composeWithDevTools(compose(applyMiddleware(sagaMiddleware, logger))));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

const wrapper = createWrapper(makeStore, {debug: true});

export default wrapper;
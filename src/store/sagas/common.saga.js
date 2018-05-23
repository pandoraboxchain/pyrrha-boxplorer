import { fork, put, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';

function* startBoxproxyMetaFetch(req) {

    try {
        const response = yield services.callApi(`system/version`);

        if (!response) {

            return yield put(actions.metaError(new Error('Wrong response')));
        }

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.metaError(response.error.map(({ error }) => new Error(error))));
        }

        yield put(actions.metaReceived({
            version: response.version
        }));

    } catch(err) {
        yield put(actions.metaError(err));
    }
}

function* initCommon() {
    yield put(actions.metaFetch());
} 

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initCommon);// Start if REHYDRATE process done only
    yield takeLatest('BOXPROXY_META_FETCH', startBoxproxyMetaFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

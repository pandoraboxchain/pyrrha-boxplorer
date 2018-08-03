import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startWorkersFetch() {
    
    try {
        const page = yield select(selectors.getWorkersPage);
        const orderBy = yield select(selectors.getWorkersOrderBy);
        const filterBy = yield select(selectors.getWorkersFilterBy);
        const response = yield services.callApi('workers', { page, orderBy, filterBy });

        if (!response.records) {

            return yield put(actions.workersError(new Error('Wrong response')));
        }

        yield put(actions.workersReceived(response.records, response.count, response.page));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.workersError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.workersError(err));
    }
}

function* startSingleWorkerFetch(req) {

    try {
        const response = yield services.callApi(`workers/address/${req.address}`);

        if (!response) {

            return yield put(actions.workersError(new Error('Wrong response')));
        }

        yield put(actions.workerSingleReceived(response.records[0]));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.workersError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.workersError(err));
    }
}

function* initWorkers() {
    const workers = yield select(selectors.getWorkers);

    if (workers.length === 0) {

        yield put(actions.workersFetch());
    }
} 

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initWorkers);// Start if REHYDRATE process done only
    yield takeLatest('WORKERS_FETCH', startWorkersFetch);
    yield takeLatest('WORKERS_RESET_FILTER', startWorkersFetch);
    yield takeLatest('WORKERS_REFRESH', startWorkersFetch);
    yield takeLatest('WORKERS_SINGLE_FETCH', startSingleWorkerFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startKernelsFetch() {
    
    try {
        const page = yield select(selectors.getKernelsPage);
        const orderBy = yield select(selectors.getKernelsOrderBy);
        const filterBy = yield select(selectors.getKernelsFilterBy);
        const response = yield services.callApi('kernels', { page, orderBy, filterBy });

        if (!response.records) {

            return yield put(actions.kernelsError(new Error('Wrong response')));
        }

        yield put(actions.kernelsReceived(response.records, response.count, response.page));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.kernelsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.kernelsError(err));
    }
}

function* startSingleKernelFetch(req) {

    try {
        const response = yield services.callApi(`kernels/address/${req.address}`);

        if (!response) {

            return yield put(actions.kernelsError(new Error('Wrong response')));
        }

        yield put(actions.kernelSingleReceived(response.records[0]));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.kernelsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.kernelsError(err));
    }
}

function* initKernels() {
    const kernels = yield select(selectors.getKernels);

    if (kernels.length === 0) {

        yield put(actions.kernelsFetch());
    }
} 

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initKernels);// Start if REHYDRATE process done only
    yield takeLatest('KERNELS_FETCH', startKernelsFetch);
    yield takeLatest('KERNELS_RESET_FILTER', startKernelsFetch);
    yield takeLatest('KERNELS_SINGLE_FETCH', startSingleKernelFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

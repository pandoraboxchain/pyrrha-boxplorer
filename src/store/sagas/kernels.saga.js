import { fork, put, call, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startKernelsFetch() {
    
    try {
        const response = yield services.callApi('kernels');

        if (!response.kernels) {

            return yield put(actions.kernelsError(new Error('Wrong response')));
        }

        yield put(actions.kernelsReceived(response.kernels));

        if (Array.isArray(response.error)) {

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
}

// Default set of sagas
export default [
    fork(watchRouter)
]

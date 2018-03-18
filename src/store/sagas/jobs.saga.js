import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startJobsFetch() {
    
    try {
        const response = yield services.callApi('jobs');

        if (!response.jobs) {

            return yield put(actions.jobsError(new Error('Wrong response')));
        }

        yield put(actions.jobsReceived(response.jobs));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.jobsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.jobsError(err));
    }
}

function* startSingleJobFetch(req) {

    try {
        const response = yield services.callApi(`jobs/address/${req.address}`);

        if (!response) {

            return yield put(actions.jobsError(new Error('Wrong response')));
        }

        yield put(actions.jobSingleReceived(response));

        if (Array.isArray(response.error) && response.error.length > 0) {

            yield put(actions.jobsError(response.error.map(({ error }) => new Error(error))));
        }

    } catch(err) {
        yield put(actions.jobsError(err));
    }
}

function* initJobs() {
    const jobs = yield select(selectors.getJobs);

    if (jobs.length === 0) {

        yield put(actions.jobsFetch());
    }
} 

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initJobs);// Start if REHYDRATE process done only
    yield takeLatest('JOBS_FETCH', startJobsFetch);
    yield takeLatest('JOBS_SINGLE_FETCH', startSingleJobFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

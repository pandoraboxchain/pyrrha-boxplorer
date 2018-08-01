import { fork, put, select, takeLatest } from 'redux-saga/effects';

import * as services from '../../services';
import * as actions from '../actions';
import * as selectors from '../selectors';

function* startJobsFetch() {
    
    try {
        const page = yield select(selectors.getJobsPage);
        const orderBy = yield select(selectors.getJobsOrderBy);
        const filterBy = yield select(selectors.getJobsFilterBy);
        const response = yield services.callApi('jobs', { page, orderBy, filterBy });

        if (!response.records) {

            return yield put(actions.jobsError(new Error('Wrong response')));
        }

        yield put(actions.jobsReceived(response.records, response.count, response.page));

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

        yield put(actions.jobSingleReceived(response.records[0]));

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
    yield takeLatest('JOBS_RESET_FILTER', startJobsFetch);
    yield takeLatest('JOBS_SINGLE_FETCH', startSingleJobFetch);
}

// Default set of sagas
export default [
    fork(watchRouter)
]

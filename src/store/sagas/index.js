import { all } from 'redux-saga/effects'
import rootRouterSagas from './router.saga';
import commonSagas from './common.saga';
import rootWebsoketSagas from './websocket.saga';
import kernelsSagas from './kernels.saga';
import datasetsSagas from './datasets.saga';
import workersSagas from './workers.saga';
import jobsSagas from './jobs.saga';

export default function* rootSaga() {
    yield all([
        ...rootRouterSagas,
        ...commonSagas,
        ...rootWebsoketSagas,
        ...kernelsSagas,
        ...datasetsSagas,
        ...workersSagas,
        ...jobsSagas
    ]);
}

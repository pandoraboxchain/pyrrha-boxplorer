import { all } from 'redux-saga/effects'
import rootRouterSagas from './router.saga';
import kernelsSagas from './kernels.saga';

export default function* rootSaga() {
    yield all([
        ...rootRouterSagas,
        ...kernelsSagas
    ]);
}

import { all } from 'redux-saga/effects'
import rootRouterSagas from './router.saga';

export default function* rootSaga() {
    yield all([
        ...rootRouterSagas,
    ]);
}

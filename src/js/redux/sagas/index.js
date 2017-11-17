import { all } from 'redux-saga/effects'
import { boxchainDataSaga } from './boxchainDataSaga';


export default function* sagas() {
  yield all([
    ...boxchainDataSaga,
  ]);
}

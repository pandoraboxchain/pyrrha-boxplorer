import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as Constants, actions as Actions } from '../modules/boxchainModule';
import { apiCall } from '../../utility/boxchainCall';

import type { boxchainType } from '../../common/types/boxchainType'

export function* fetchBoxchainData(action) {
  try {
    const requestRaw = yield call(apiCall, action.url);
    const workers = requestRaw.workers;
    const result: boxchainType = {
      title: 'Everything is Awesome',
      description: __CONFIG__.description,
      source: 'This message is coming from Redux',
      workers,
    };
    yield put(Actions.getDATA(result));
  } catch (error) {
    throw error;
  }
}


function* watchGetUrl() {
  yield takeLatest(Constants.GET_URL, fetchBoxchainData);
}

export const boxchainDataSaga = [
  fork(watchGetUrl),
];

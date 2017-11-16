import { put, fork, takeLatest, takeEvery, call } from 'redux-saga/effects';
import { constants as Constants, actions as Actions } from '../modules/boxchainModule';
import { apiCall } from '../../utility/boxchainCall';

import type { boxchainType } from '../../common/types/boxchainType'

export function* fetchBoxchainData(action) {
  try {
    const requestRaw = yield call(apiCall, action.url);
    const result: boxchainType = {
      title: action.title,
      requestRaw,
    };
    yield put(Actions.getData(result));
  } catch (error) {
    throw error;
  }
}


function* watchBoxchain() {
  yield takeLatest(Constants.SET_URL, fetchBoxchainData);
  // yield takeEvery(action => action.type === "GET_DATA" && Object.keys(action).length === 1, fetchBoxchainData);
}

export const boxchainDataSaga = [
  fork(watchBoxchain),
];

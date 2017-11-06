import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { constants as exampleConstants, actions as exampleActions } from '../modules/example';
import { request } from '../../utility/boxchainCall';

import type { exampleType } from '../../common/types/example'

export function* fetchExampleData() {
  try {
    const requestRaw = yield call(request);
    const workers = requestRaw.workers;
    const result: exampleType = {
      title: 'Everything is Awesome',
      description: __CONFIG__.description,
      source: 'This message is coming from Redux',
      workers,
    };
    yield put(exampleActions.updateExample(result));
  } catch (error) {
    throw error;
  }
}


function* watchGetExample() {
  yield takeLatest(exampleConstants.GET_EXAMPLE, fetchExampleData);
}

export const exampleSaga = [
  fork(watchGetExample),
];

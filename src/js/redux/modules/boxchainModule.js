import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

import type { boxchainType } from '../../common/types/boxchainType'

const SET_URL = 'app/example/SET_URL';
const GET_DATA = 'app/example/GET_DATA';

export const constants = {
  SET_URL,
  GET_DATA,
};

// ------------------------------------
// Actions
// ------------------------------------

export function setUrl(url, title) {
  return {
    type: SET_URL,
    url,
    title,
  }
}

// export function getDATA(url, result) {
//   return {
//     type: GET_DATA,
//     url,
//     result,
//   }
// }
// export const getAwesomeCode = createAction(GET_EXAMPLE, () => ({}));
export const getData = createAction(GET_DATA, (result : boxchainType) => ({ result }));

export const actions = {
  setUrl,
  getData
};

export const reducers = {
  [GET_DATA]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
}

export const initialState = () =>
  Map({
    result: '',
  })

export default handleActions(reducers, initialState());

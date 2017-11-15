import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

import type { boxchainType } from '../../common/types/boxchainType'

const GET_URL = 'app/example/GET_URL';
const GET_DATA = 'app/example/GET_DATA';

export const constants = {
  GET_URL,
  GET_DATA,
};

// ------------------------------------
// Actions
// ------------------------------------
function getURL(url) {
  return {
    type: GET_URL,
    url,
  }
}
// export const getAwesomeCode = createAction(GET_EXAMPLE, () => ({}));
export const getDATA = createAction(GET_DATA, (result : boxchainType) => ({ result }));

export const actions = {
  getURL,
  getDATA,
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

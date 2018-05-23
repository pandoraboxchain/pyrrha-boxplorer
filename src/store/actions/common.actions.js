import { reduxAction as action } from '../../utils';

export const BOXPROXY_META_FETCH = 'BOXPROXY_META_FETCH';
export const BOXPROXY_META_RECEIVED = 'BOXPROXY_META_RECEIVED';
export const BOXPROXY_META_ERROR = 'BOXPROXY_META_ERROR';
export const BOXPROXY_META_REMOVE_ERROR = 'BOXPROXY_META_REMOVE_ERROR';

export const metaFetch = () => action(BOXPROXY_META_FETCH);
export const metaReceived = meta => action(BOXPROXY_META_RECEIVED, { meta });
export const metaError = error => action(BOXPROXY_META_ERROR, { error });
export const removeMetaError = index => action(BOXPROXY_META_REMOVE_ERROR, { index });

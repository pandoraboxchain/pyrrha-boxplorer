import { reduxAction as action } from '../../utils';

export const WEBSOCKET_ERROR = 'WEBSOCKET_ERROR';
export const WEBSOCKET_CONNECTED = 'WEBSOCKET_CONNECTED';
export const WEBSOCKET_INIT = 'WEBSOCKET_INIT';

export const websocketError = error => action(WEBSOCKET_ERROR, { error });
export const websocketConnected = connection => action(WEBSOCKET_CONNECTED, { connection });
export const websocketInit = error => action(WEBSOCKET_INIT);

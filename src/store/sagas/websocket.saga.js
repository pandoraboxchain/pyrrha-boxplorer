import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { store } from '../../store';
import config from '../../config';

import * as services from '../../services';
import * as actions from '../actions';

let reconnectionCounter = 0;

const processEvent = data => {
    
    switch (data.event) {
        case 'datasetsRecords':
        case 'datasetsRecordsRemove':
            store.dispatch(actions.datasetsRefresh());
            break;

        case 'kernelsRecords':
        case 'kernelsRecordsRemove':
            store.dispatch(actions.kernelsRefresh());
            break;

        case 'workersRecords':
            store.dispatch(actions.workersRefresh());
            break;

        case 'jobsRecords':
            store.dispatch(actions.jobsRefresh());
            break;

        default:
    }
};

function* handleWebsocketError(err) {
    yield reconnectWebsocket();
}

function* reconnectWebsocket() {
    yield call(delay, config.wsReconnectTimeout);
    reconnectionCounter++;
    yield initWebsocket();
}

function* initWebsocket() {

    try {
        const connection = yield services.socketOn(); 
        connection.onopen = () => connection.send('Ping');
        connection.onerror = err => store.dispatch(actions.websocketError(err));
        connection.onclose = err => store.dispatch(actions.websocketError(err));
        connection.onmessage = message => {
            let data;

            try {
                data = JSON.parse(message.data);
                processEvent(data);
            } catch(err) {
                store.dispatch(actions.websocketError(err));
            }
        };
        yield put(actions.websocketConnected(connection));
        reconnectionCounter = 0;
    } catch(err) {

        if (reconnectionCounter < config.wsReconnectCount) {
            yield put(actions.websocketError(err));
        } else {
            console.log('Websocket reconnection limit exceeded');
        }
        
    }
}

function* watchRouter() {
    yield takeLatest('persist/REHYDRATE', initWebsocket);// Start if REHYDRATE process done only  
    yield takeLatest('WEBSOCKET_INIT', initWebsocket);
    yield takeLatest('WEBSOCKET_ERROR', handleWebsocketError); 
}

// Default set of sagas
export default [
    fork(watchRouter)
]

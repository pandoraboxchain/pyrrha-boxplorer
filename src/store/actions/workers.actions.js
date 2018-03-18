import { reduxAction as action } from '../../utils';

export const WORKERS_FETCH = 'WORKERS_FETCH';
export const WORKERS_RECEIVED = 'WORKERS_RECEIVED';
export const WORKERS_ERROR = 'WORKERS_ERROR';
export const WORKERS_MESSAGE = 'WORKERS_MESSAGE';
export const WORKERS_REMOVE_MESSAGE = 'WORKERS_REMOVE_MESSAGE';
export const WORKERS_REMOVE_ERROR = 'WORKERS_REMOVE_ERROR';
export const WORKERS_CLEAN_MESSAGES = 'WORKERS_CLEAN_MESSAGES';
export const WORKERS_CLEAN_ERRORS = 'WORKERS_CLEAN_ERRORS';
export const WORKERS_SINGLE_FETCH = 'WORKERS_SINGLE_FETCH';
export const WORKERS_SINGLE_RECIEVED = 'WORKERS_SINGLE_RECIEVED';

export const workersFetch = () => action(WORKERS_FETCH);
export const workersReceived = workers => action(WORKERS_RECEIVED, { workers });
export const workersError = error => action(WORKERS_ERROR, { error });
export const addWorkersMessage = message => action(WORKERS_MESSAGE, { message });
export const removeWorkersMessage = index => action(WORKERS_REMOVE_MESSAGE, { index });
export const removeWorkersError = index => action(WORKERS_REMOVE_ERROR, { index });
export const cleanWorkersMessages = () => action(WORKERS_CLEAN_MESSAGES);
export const cleanWorkersErrors = () => action(WORKERS_CLEAN_ERRORS);
export const fetchSingleWorker = address => action(WORKERS_SINGLE_FETCH, { address });
export const workerSingleReceived = record => action(WORKERS_SINGLE_RECIEVED, { record });

import { reduxAction as action } from '../../utils';

export const JOBS_FETCH = 'JOBS_FETCH';
export const JOBS_RECEIVED = 'JOBS_RECEIVED';
export const JOBS_ERROR = 'JOBS_ERROR';
export const JOBS_MESSAGE = 'JOBS_MESSAGE';
export const JOBS_REMOVE_MESSAGE = 'JOBS_REMOVE_MESSAGE';
export const JOBS_REMOVE_ERROR = 'JOBS_REMOVE_ERROR';
export const JOBS_CLEAN_MESSAGES = 'JOBS_CLEAN_MESSAGES';
export const JOBS_CLEAN_ERRORS = 'JOBS_CLEAN_ERRORS';
export const JOBS_SINGLE_FETCH = 'JOBS_SINGLE_FETCH';
export const JOBS_SINGLE_RECIEVED = 'JOBS_SINGLE_RECIEVED';

export const jobsFetch = () => action(JOBS_FETCH);
export const jobsReceived = jobs => action(JOBS_RECEIVED, { jobs });
export const jobsError = error => action(JOBS_ERROR, { error });
export const addJobsMessage = message => action(JOBS_MESSAGE, { message });
export const removeJobsMessage = index => action(JOBS_REMOVE_MESSAGE, { index });
export const removeJobsError = index => action(JOBS_REMOVE_ERROR, { index });
export const cleanJobsMessages = () => action(JOBS_CLEAN_MESSAGES);
export const cleanJobsErrors = () => action(JOBS_CLEAN_ERRORS);
export const fetchSingleJob = address => action(JOBS_SINGLE_FETCH, { address });
export const jobSingleReceived = record => action(JOBS_SINGLE_RECIEVED, { record });

import { addRecordsByProperty } from '../../utils';

import {
    JOBS_FETCH,
    JOBS_RECEIVED,
    JOBS_ERROR,
    JOBS_MESSAGE,
    JOBS_REMOVE_MESSAGE,
    JOBS_REMOVE_ERROR,
    JOBS_CLEAN_MESSAGES,
    JOBS_CLEAN_ERRORS,
    JOBS_SINGLE_FETCH,
    JOBS_SINGLE_RECIEVED
} from '../actions';

const initialState = {
    isFetching: false,
    isSingleFetching: false,
    jobs: [],
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case JOBS_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessages: []
            };

        case JOBS_SINGLE_FETCH:
            return { 
                ...state,
                isSingleFetching: true,
                errorMessages: []
            };
        
        case JOBS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                jobs: action.jobs
            };

        case JOBS_SINGLE_RECIEVED:
            return {
                ...state,
                isSingleFetching: false,
                jobs: addRecordsByProperty([action.record], state.jobs, 'address')
            };

        case JOBS_MESSAGE:

            if (action.message && !Array.isArray(action.message)) {
                action.message = [action.message];
            }

            return {
                ...state, 
                messages: [
                    ...state.messages,
                    action.message
                ]
            };

        case JOBS_REMOVE_MESSAGE:
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case JOBS_CLEAN_MESSAGES:
            return {
                ...state,
                messages: []
            };
        
        case JOBS_ERROR:
            let errors = [];

            if (Array.isArray(action.error)) {

                errors = action.error.map(err => err.message);
            } else {
                errors = [action.error.message];
            }

            return {
                ...state,
                isFetching: false,
                errorMessages: [
                    ...state.errorMessages,
                    errors
                ]
            };

        case JOBS_REMOVE_ERROR:
            return { 
                ...state,
                errorMessages: state.errorMessages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case JOBS_CLEAN_ERRORS:
            return {
                ...state,
                errorMessages: []
            };

        default:
            return state;
    }
}

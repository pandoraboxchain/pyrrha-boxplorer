import { addRecordsByProperty } from '../../utils';

import {
    WORKERS_FETCH,
    WORKERS_RECEIVED,
    WORKERS_ERROR,
    WORKERS_MESSAGE,
    WORKERS_REMOVE_MESSAGE,
    WORKERS_REMOVE_ERROR,
    WORKERS_CLEAN_MESSAGES,
    WORKERS_CLEAN_ERRORS,
    WORKERS_SINGLE_FETCH,
    WORKERS_SINGLE_RECIEVED,
    WORKERS_UPDATE_FILTERS,
    WORKERS_RESET_FILTER
} from '../actions';

const initialState = {
    isFetching: false,
    isSingleFetching: false,
    workers: [],
    count: 0,
    page: 1,
    orderBy: {},
    filterBy: {},
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case WORKERS_RESET_FILTER:
            const { [action.key]:removed, ...newFilterBy } = state.filterBy;
            
            return {
                ...state,
                filterBy: newFilterBy
            };

        case WORKERS_UPDATE_FILTERS:
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    [action.key]: action.value
                }
            };
        
        case WORKERS_FETCH:
            let newOrderBy = state.orderBy;

            if (action.orderBy) {

                newOrderBy = {
                    [action.orderBy]: state.orderBy[action.orderBy] === 'ascending' ? 'descending' : 'ascending'
                };
            }

            return { 
                ...state,
                isFetching: true,
                errorMessages: [],
                page: action.page || state.page,
                orderBy: newOrderBy
            };

        case WORKERS_SINGLE_FETCH:
            return { 
                ...state,
                isSingleFetching: true,
                errorMessages: []
            };
        
        case WORKERS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                workers: action.workers,
                count: action.count,
                page: action.page
            };

        case WORKERS_SINGLE_RECIEVED:
            return {
                ...state,
                isSingleFetching: false,
                workers: addRecordsByProperty([action.record], state.workers, 'address')
            };

        case WORKERS_MESSAGE:

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

        case WORKERS_REMOVE_MESSAGE:
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case WORKERS_CLEAN_MESSAGES:
            return {
                ...state,
                messages: []
            };
        
        case WORKERS_ERROR:
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
                    ...errors
                ]
            };

        case WORKERS_REMOVE_ERROR:
            return { 
                ...state,
                errorMessages: state.errorMessages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case WORKERS_CLEAN_ERRORS:
            return {
                ...state,
                errorMessages: []
            };

        default:
            return state;
    }
}

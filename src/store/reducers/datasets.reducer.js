import { addRecordsByProperty } from '../../utils';

import {
    DATASETS_FETCH,
    DATASETS_RECEIVED,
    DATASETS_ERROR,
    DATASETS_MESSAGE,
    DATASETS_REMOVE_MESSAGE,
    DATASETS_REMOVE_ERROR,
    DATASETS_CLEAN_MESSAGES,
    DATASETS_CLEAN_ERRORS,
    DATASETS_SINGLE_FETCH,
    DATASETS_SINGLE_RECIEVED,
    DATASETS_UPDATE_FILTERS,
    DATASETS_RESET_FILTER
} from '../actions';

const initialState = {
    isFetching: false,
    isSingleFetching: false,
    datasets: [],
    count: 0,
    page: 1,
    orderBy: {},
    filterBy: {},
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case DATASETS_RESET_FILTER:
            const { [action.key]:removed, ...newFilterBy } = state.filterBy;
            
            return {
                ...state,
                filterBy: newFilterBy
            };

        case DATASETS_UPDATE_FILTERS:
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    [action.key]: action.value
                }
            };
        
        case DATASETS_FETCH:
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

        case DATASETS_SINGLE_FETCH:
            return { 
                ...state,
                isSingleFetching: true,
                errorMessages: []
            };
        
        case DATASETS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                datasets: action.datasets,
                count: action.count,
                page: action.page
            };

        case DATASETS_SINGLE_RECIEVED:
            return {
                ...state,
                isSingleFetching: false,
                datasets: addRecordsByProperty([action.record], state.datasets, 'address')
            };

        case DATASETS_MESSAGE:

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

        case DATASETS_REMOVE_MESSAGE:
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case DATASETS_CLEAN_MESSAGES:
            return {
                ...state,
                messages: []
            };
        
        case DATASETS_ERROR:
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

        case DATASETS_REMOVE_ERROR:
            return { 
                ...state,
                errorMessages: state.errorMessages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case DATASETS_CLEAN_ERRORS:
            return {
                ...state,
                errorMessages: []
            };

        default:
            return state;
    }
}

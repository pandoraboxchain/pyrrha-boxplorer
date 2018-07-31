import { addRecordsByProperty } from '../../utils';

import {
    KERNELS_FETCH,
    KERNELS_RECEIVED,
    KERNELS_ERROR,
    KERNELS_MESSAGE,
    KERNELS_REMOVE_MESSAGE,
    KERNELS_REMOVE_ERROR,
    KERNELS_CLEAN_MESSAGES,
    KERNELS_CLEAN_ERRORS,
    KERNELS_SINGLE_FETCH,
    KERNELS_SINGLE_RECIEVED,
    KERNELS_UPDATE_FILTERS,
    KERNELS_RESET_FILTER
} from '../actions';

const initialState = {
    isFetching: false,
    isSingleFetching: false,
    kernels: [],
    count: 0,
    page: 1,
    orderBy: {},
    filterBy: {},
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {

        case KERNELS_RESET_FILTER:
            const { [action.key]:removed, ...newFilterBy } = state.filterBy;
            
            return {
                ...state,
                filterBy: newFilterBy
            };

        case KERNELS_UPDATE_FILTERS:
            return {
                ...state,
                filterBy: {
                    ...state.filterBy,
                    [action.key]: action.value
                }
            };

        case KERNELS_FETCH:

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

        case KERNELS_SINGLE_FETCH:
            return { 
                ...state,
                isSingleFetching: true,
                errorMessages: []
            };
        
        case KERNELS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                kernels: action.kernels,
                count: action.count,
                page: action.page
            };

        case KERNELS_SINGLE_RECIEVED:
            return {
                ...state,
                isSingleFetching: false,
                kernels: addRecordsByProperty([action.record], state.kernels, 'address')
            };

        case KERNELS_MESSAGE:

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

        case KERNELS_REMOVE_MESSAGE:
            return { 
                ...state,
                messages: state.messages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case KERNELS_CLEAN_MESSAGES:
            return {
                ...state,
                messages: []
            };
        
        case KERNELS_ERROR:
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

        case KERNELS_REMOVE_ERROR:
            return { 
                ...state,
                errorMessages: state.errorMessages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        case KERNELS_CLEAN_ERRORS:
            return {
                ...state,
                errorMessages: []
            };

        default:
            return state;
    }
}

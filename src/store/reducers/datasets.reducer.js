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
    DATASETS_SINGLE_RECIEVED
} from '../actions';

const initialState = {
    isFetching: false,
    isSingleFetching: false,
    datasets: [],
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    // console.log(action)

    switch (action.type) {
        
        case DATASETS_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessages: []
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
                datasets: action.datasets
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
                    errors
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

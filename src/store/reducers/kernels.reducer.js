import {
    KERNELS_FETCH,
    KERNELS_RECEIVED,
    KERNELS_ERROR,
    KERNELS_MESSAGE,
    KERNELS_REMOVE_MESSAGE,
    KERNELS_REMOVE_ERROR,
    KERNELS_CLEAN_MESSAGES,
    KERNELS_CLEAN_ERRORS
} from '../actions';

const initialState = {
    isFetching: false,
    kernels: [],
    messages: [],
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    console.log(action)

    switch (action.type) {
        
        case KERNELS_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessages: []
            };
        
        case KERNELS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                kernels: action.kernels
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
                    errors
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

import {
    BOXPROXY_META_FETCH,
    BOXPROXY_META_RECEIVED,
    BOXPROXY_META_ERROR,
    BOXPROXY_META_REMOVE_ERROR
} from '../actions';

const initialState = {
    isFetching: false,
    meta: {},
    errorMessages: []
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case BOXPROXY_META_FETCH:
            return { 
                ...state,
                isFetching: true,
                errorMessages: []
            };

        case BOXPROXY_META_RECEIVED:
            return {
                ...state,
                isFetching: false,
                meta: action.meta
            };

        case BOXPROXY_META_ERROR:
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

        case BOXPROXY_META_REMOVE_ERROR:
            return { 
                ...state,
                errorMessages: state.errorMessages.filter((item, index) => (index !== (action.index !== undefined ? action.index : index)))
            };

        default:
            return state;
    }
}

import {
    WEBSOCKET_ERROR,
    WEBSOCKET_CONNECTED
} from '../actions';

const initialState = {
    isConnected: false,
    connection: null
};

export const reduce = (state = initialState, action = {}) => {

    switch (action.type) {
        
        case WEBSOCKET_ERROR:
            return { 
                ...state,
                isConnected: false,
                connection: null
            };

        case WEBSOCKET_CONNECTED:
            return { 
                ...state,
                isConnected: true,
                connection: action.connection
            };
        
        default:
            return state;
    }
}

import {
    API_REQUEST,
    API_SUCCESS,
    API_ERROR,
} from '../constants/types';

const initialState = {
    loading: undefined,
    message: undefined,
    error: undefined
};

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_REQUEST:
            return { ...state, loading: true };
        case API_SUCCESS:
            return { ...state, loading: false, error: undefined, message: action.payload.message };
        case API_ERROR:
            return { ...state, loading: false, error: action.payload.error, message: action.payload.message };
        default:
            return state;
    }
}

export default apiReducer;
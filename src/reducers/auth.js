import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from '../constants/types';

const initialState = {
    user: undefined,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        //Login
        case LOGIN_SUCCESS:
            axios.defaults.headers.common["Authorization"] = `Token ${action?.payload?.data?.token}`;
            localStorage.setItem('user', JSON.stringify(action?.payload?.data?.token));
            localStorage.setItem('profile_img', JSON.stringify(action?.payload?.data?.profile_img));
            return { ...state, user: action.payload };
        case LOGIN_FAIL:
            localStorage.clear();
            return state;

        //Logout
        case LOGOUT_SUCCESS:
            localStorage.clear();
            return { ...state, user: action.payload }
        case LOGOUT_FAIL:
            return state;
        default:
            return state;
    }
}


export default authReducer;
import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";


//LOGIN
export const doLogin = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_LOGIN,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.LOGIN_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.LOGIN_FAIL,
            payload: data
        })
    }
})

//LOGOUT
export const doLogout = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_LOGOUT,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.LOGOUT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.LOGOUT_FAIL,
            payload: data
        })
    }
})

//CHANGE_PASSWORD
export const changePassword = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_CHANGE_PASSWORD,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.CHANGE_PASSWORD_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
            payload: data
        })
    }
})

//FORGOT_PASSWORD
export const forgotPassword = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_FORGOT_PASSWORD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.FORGOT_PASSWORD_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.FORGOT_PASSWORD_FAIL,
            payload: data
        })
    }
})
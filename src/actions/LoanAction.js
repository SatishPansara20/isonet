import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";


export const getLoanList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_LOAN_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_LOAN_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_LOAN_LIST_FAIL,
            payload: data
        })
    }
})

export const searchLoanManagement = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_LOAN_MANAGEMENT,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_LOAN_MANAGEMENT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_LOAN_MANAGEMENT_FAIL,
            payload: data
        })
    }
})
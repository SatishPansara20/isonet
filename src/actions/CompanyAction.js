import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";


export const getCompanyList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_COMPANY_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_COMPANY_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_COMPANY_LIST_FAIL,
            payload: data
        })
    }
})

export const getCompanyInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_COMPANY_LIST + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_CATEGORY_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_CATEGORY_INFO_FAIL,
            payload: data
        })
    }
})

export const deleteCompany = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_COMPANY + `${id}/`,
        method: 'DELETE',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_COMPANY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_COMPANY_FAIL,
            payload: data
        })
    }
})
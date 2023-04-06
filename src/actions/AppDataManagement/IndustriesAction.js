import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getIndustriesList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_INDUSTRY_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_INDUSTRIES_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_INDUSTRIES_LIST_FAIL,
            payload: data
        })
    }
})

export const addIndustries = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_INDUSTRY_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_INDUSTRIES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_INDUSTRIES_FAIL,
            payload: data
        })
    }
})

export const deleteIndustries = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_INDUSTRY + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_INDUSTRIES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_INDUSTRIES_FAIL,
            payload: data
        })
    }
})

export const getIndustriesInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_INDUSTRY_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_INDUSTRIES_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_INDUSTRIES_INFO_FAIL,
            payload: data
        })
    }
})

export const patchIndustries = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_INDUSTRY + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_INDUSTRIES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_INDUSTRIES_FAIL,
            payload: data
        })
    }
})

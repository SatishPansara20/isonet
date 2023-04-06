import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getInterestList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_INTEREST_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_INTEREST_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_INTEREST_LIST_FAIL,
            payload: data
        })
    }
})

export const addInterest = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_INTEREST_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_INTEREST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_INTEREST_FAIL,
            payload: data
        })
    }
})

export const deleteInterest = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_INTEREST + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_INTEREST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_INTEREST_FAIL,
            payload: data
        })
    }
})

export const getInterestInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_INTEREST_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_INTEREST_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_INTEREST_INFO_FAIL,
            payload: data
        })
    }
})

export const patchInterest = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_INTEREST + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_INTEREST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_INTEREST_FAIL,
            payload: data
        })
    }
})
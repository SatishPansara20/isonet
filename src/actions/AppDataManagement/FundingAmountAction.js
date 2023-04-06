import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getFundingAmountList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_FUNDING_AMOUNT_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_FUNDING_AMOUNT_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FUNDING_AMOUNT_LIST_FAIL,
            payload: data
        })
    }
})

export const addFundingAmount = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_FUNDING_AMOUNT_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_FUNDING_AMOUNT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_FUNDING_AMOUNT_FAIL,
            payload: data
        })
    }
})

export const deleteFundingAmount = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_FUNDING_AMOUNT + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_FUNDING_AMOUNT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_FUNDING_AMOUNT_FAIL,
            payload: data
        })
    }
})

export const getFundingAmountInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_FUNDING_AMOUNT_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_FUNDING_AMOUNT_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FUNDING_AMOUNT_INFO_FAIL,
            payload: data
        })
    }
})

export const patchFundingAmount = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_FUNDING_AMOUNT + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_FUNDING_AMOUNT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_FUNDING_AMOUNT_FAIL,
            payload: data
        })
    }
})
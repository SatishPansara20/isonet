import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getBuyRatesList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_BUY_RATE_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_BUY_RATES_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_BUY_RATES_LIST_FAIL,
            payload: data
        })
    }
})

export const addBuyRates = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_BUY_RATE_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_BUY_RATES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_BUY_RATES_FAIL,
            payload: data
        })
    }
})

export const deleteBuyRates = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_BUY_RATE + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_BUY_RATES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_BUY_RATES_FAIL,
            payload: data
        })
    }
})

export const getBuyRatesInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_BUY_RATE_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_BUY_RATES_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_BUY_RATES_INFO_FAIL,
            payload: data
        })
    }
})

export const patchBuyRates = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_BUY_RATE + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_BUY_RATES_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_BUY_RATES_FAIL,
            payload: data
        })
    }
})

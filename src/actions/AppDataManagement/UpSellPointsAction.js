import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getUpSellPointsList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_UP_SELL_POINT_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_UP_SELL_POINTS_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_UP_SELL_POINTS_LIST_FAIL,
            payload: data
        })
    }
})

export const addUpSellPoints = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_UP_SELL_POINT,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_UP_SELL_POINTS_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_UP_SELL_POINTS_FAIL,
            payload: data
        })
    }
})

export const deleteUpSellPoints = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_UP_SELL_POINT + `${id}/`,
        method: 'DELETE',
        success: (data) => ({
            type: ACTION_TYPE.DELETE_UP_SELL_POINTS_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_UP_SELL_POINTS_FAIL,
            payload: data
        })
    }
})

export const getUpSellPointsInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_UP_SELL_POINT_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_UP_SELL_POINTS_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_UP_SELL_POINTS_INFO_FAIL,
            payload: data
        })
    }
})

export const patchUpSellPoints = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_UP_SELL_POINT + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_UP_SELL_POINTS_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_UP_SELL_POINTS_FAIL,
            payload: data
        })
    }
})

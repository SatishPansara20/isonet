import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";

export const getCategoryList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_CATEGORY_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_CATEGORY_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_CATEGORY_LIST_FAIL,
            payload: data
        })
    }
})

export const addCategory = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_CATEGORY,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_CATEGORY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_CATEGORY_FAIL,
            payload: data
        })
    }
})

export const deleteCategory = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_CATEGORY + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_CATEGORY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_CATEGORY_FAIL,
            payload: data
        })
    }
})

export const getCategoryInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_CATEGORY_INFO + `${id}/`,
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

export const patchCategory = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_CATEGORY + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_CATEGORY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_CATEGORY_FAIL,
            payload: data
        })
    }
})
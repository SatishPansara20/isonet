import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";


export const postCmsList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_CMS_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_CMS_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_CMS_LIST_FAIL,
            payload: data
        })
    }
})

export const initialCms = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_INITIAL_CMS,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_INITIAL_CMS_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_INITIAL_CMS_FAIL,
            payload: data
        })
    }
})

export const patchCms = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_CMS_PATCH + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_CMS_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_CMS_FAIL,
            payload: data
        })
    }
})
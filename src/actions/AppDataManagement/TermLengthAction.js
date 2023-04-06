import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getTermLengthList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_TERM_LENGTH_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_TERMS_LENGTH_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_TERMS_LENGTH_LIST_FAIL,
            payload: data
        })
    }
})

export const addTermLength = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_TERM_LENGTH_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_TERMS_LENGTH_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_TERMS_LENGTH_FAIL,
            payload: data
        })
    }
})

export const deleteTermLength = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_TERM_LENGTH + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_TERMS_LENGTH_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_TERMS_LENGTH_FAIL,
            payload: data
        })
    }
})

export const getTermLengthInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_TERM_LENGTH_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_TERMS_LENGTH_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_TERMS_LENGTH_INFO_FAIL,
            payload: data
        })
    }
})

export const patchTermLength = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_TERM_LENGTH + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_TERMS_LENGTH_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_TERMS_LENGTH_FAIL,
            payload: data
        })
    }
})

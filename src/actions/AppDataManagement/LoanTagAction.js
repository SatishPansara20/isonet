import * as API_TYPE from "../../constants/api";
import * as ACTION_TYPE from "../../constants/types";

export const getLoanTagList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_LOAN_TAG_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_LOAN_TAG_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_LOAN_TAG_LIST_FAIL,
            payload: data
        })
    }
})

export const addLoanTag = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_LOAN_TAG_ADD,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_LOAN_TAG_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_LOAN_TAG_FAIL,
            payload: data
        })
    }
})

export const deleteLoanTag = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_LOAN_TAG + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_LOAN_TAG_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_LOAN_TAG_FAIL,
            payload: data
        })
    }
})

export const getLoanTagInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_LOAN_TAG_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_LOAN_TAG_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_LOAN_TAG_INFO_FAIL,
            payload: data
        })
    }
})

export const patchLoanTag = (id, data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_LOAN_TAG + `${id}/`,
        method: 'PATCH',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_LOAN_TAG_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_LOAN_TAG_FAIL,
            payload: data
        })
    }
})
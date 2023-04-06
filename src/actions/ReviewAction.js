import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";


export const getReviewList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_REVIEW_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_REVIEW_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_REVIEW_LIST_FAIL,
            payload: data
        })
    }
})

export const deleteReview = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_REVIEW + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_REVIEW_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_REVIEW_FAIL,
            payload: data
        })
    }
})
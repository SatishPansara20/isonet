import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";

export const getArticleList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_ARTICLE_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_LIST_FAIL,
            payload: data
        })
    }
})

export const postReportedArticleList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_REPORTED_ARTICLE_LIST,
        method: 'POST',
        success: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_ARTICLE_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_ARTICLE_LIST_FAIL,
            payload: data
        })
    }
})

export const addArticle = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_ARTICLE,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_ARTICLE_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_ARTICLE_FAIL,
            payload: data
        })
    }
})

export const deleteArticle = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_ARTICLE + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_FAIL,
            payload: data
        })
    }
})

export const getArticleInfo = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_ARTICLE_INFO + `${id}/`,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_INFO_FAIL,
            payload: data
        })
    }
})

export const patchArticle = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PATCH_ARTICLE,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_ARTICLE_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_ARTICLE_FAIL,
            payload: data
        })
    }
})

// Article Comment APIS

export const getCommentList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_ARTICLE_COMMENT_LIST,
        method: 'POST',
        data : data,
        success: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_COMMENT_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_ARTICLE_COMMENT_LIST_FAIL,
            payload: data
        })
    }
})

export const deleteComment = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_ARTICLE_COMMENT,
        method: 'POST',
        data : data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_COMMENT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_COMMENT_FAIL,
            payload: data
        })
    }
})

export const deleteCommentReply = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_ARTICLE_COMMENT_REPLY,
        method: 'POST',
        data : data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_COMMENT_REPLY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_ARTICLE_COMMENT_REPLY_FAIL,
            payload: data
        })
    }
})
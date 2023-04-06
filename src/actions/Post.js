import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";

// Post APIS
//Get All Posts
export const getAllPostList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_ALL_POST_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_ALL_POST_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_ALL_POST_LIST_FAIL,
            payload: data
        })
    }
})

//Get Funder Posts
export const getFunderPostList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_FUNDER_POST_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_FUNDER_POST_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FUNDER_POST_LIST_FAIL,
            payload: data
        })
    }
})


//Get Broker Posts
export const getBrokerPostList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_BROKER_POST_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_BROKER_POST_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_BROKER_POST_LIST_FAIL,
            payload: data
        })
    }
})


export const postReportedPostList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_REPORTED_POST_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_REPORTED_POST_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_REPORTED_POST_LIST_FAIL,
            payload: data
        })
    }
})

export const getPostInfo = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_INFO,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_POST_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_POST_INFO_FAIL,
            payload: data
        })
    }
})


export const deletePost = (id) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_DELETE + `${id}/`,
        method: 'DELETE',

        success: (data) => ({
            type: ACTION_TYPE.DELETE_POST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_POST_FAIL,
            payload: data
        })
    }
})

// Post Comment APIS

export const getCommentList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_COMMENT_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_COMMENT_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_COMMENT_LIST_FAIL,
            payload: data
        })
    }
})

export const deleteComment = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_COMMENT,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_COMMENT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_COMMENT_FAIL,
            payload: data
        })
    }
})

export const deleteCommentReply = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_COMMENT_REPLY,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_COMMENT_REPLY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_COMMENT_REPLY_FAIL,
            payload: data
        })
    }
})

export const postFlaggedPostsList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_FLAGGED_POSTS_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_POSTS_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_POSTS_LIST_FAIL,
            payload: data
        })
    }
})

export const postFlaggedPostsSearch = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_FLAGGED_POSTS_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_POSTS_SEARCH_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_POSTS_SEARCH_FAIL,
            payload: data
        })
    }
})
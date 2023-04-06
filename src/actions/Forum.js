import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";

export const getForumList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_FORUM_LIST,
        method: 'POST',
        success: (data) => ({
            type: ACTION_TYPE.GET_FORUM_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FORUM_LIST_FAIL,
            payload: data
        })
    }
})

export const addForum = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_ADD_FORUM,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_ADD_FORUM_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_ADD_FORUM_FAIL,
            payload: data
        })
    }
})

export const deleteForum = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_FORUM,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_FAIL,
            payload: data
        })
    }
})

export const getForumInfo = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_FORUM_INFO,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_FORUM_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FORUM_INFO_FAIL,
            payload: data
        })
    }
})

export const patchForum = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_UPDATE_FORUM,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.PATCH_FORUM_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.PATCH_FORUM_FAIL,
            payload: data
        })
    }
})

export const ReportedForumList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_REPORTED_FORUM_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_FORUM_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_FORUM_LIST_FAIL,
            payload: data
        })
    }
})

export const reportedForumSearch = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_REPORTED_FORUM_SEARCH,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_FORUM_SEARCH_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_REPORTED_FORUM_SEARCH_FAIL,
            payload: data
        })
    }
})

export const flaggedForumList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_FLAGGED_FORUM_LIST,
        method: 'POST',
        success: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_FORUM_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_FORUM_LIST_FAIL,
            payload: data
        })
    }
})

export const flaggedForumSearch = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_POST_FLAGGED_FORUM_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_FORUM_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.POST_FLAGGED_FORUM_LIST_FAIL,
            payload: data
        })
    }
})


// Forum Comment APIS

export const getCommentList = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_FORUM_COMMENT_LIST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_FORUM_COMMENT_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_FORUM_COMMENT_LIST_FAIL,
            payload: data
        })
    }
})

export const deleteComment = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_FORUM_COMMENT,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_COMMENT_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_COMMENT_FAIL,
            payload: data
        })
    }
})

export const deleteCommentReply = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_FORUM_COMMENT_REPLY,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_COMMENT_REPLY_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_FORUM_COMMENT_REPLY_FAIL,
            payload: data
        })
    }
})
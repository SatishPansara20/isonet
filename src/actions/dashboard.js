import * as API_TYPE from "../constants/api";
import * as ACTION_TYPE from "../constants/types";

export const getDashboardList = () => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_DASHBOARD_LIST,
        method: 'GET',
        success: (data) => ({
            type: ACTION_TYPE.GET_DASHBOARD_LIST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_DASHBOARD_LIST_FAIL,
            payload: data
        })
    }
})

export const searchData = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_DATA,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_DATA_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_DATA_FAIL,
            payload: data
        })
    }
})

export const searchFlaggedForumData = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_DATA,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_DATA_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_DATA_FAIL,
            payload: data
        })
    }
})

export const searchBlockedUser = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_BLOCKED_USER,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_BLOCKED_DATA_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_BLOCKED_DATA_FAIL,
            payload: data
        })
    }
})

export const searchSubscribedUser = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_SUBSCRIBED_USER,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_SUBSCRIBED_USER_DATA_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_SUBSCRIBED_USER_DATA_FAIL,
            payload: data
        })
    }
})

export const searchReportedArticle = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_REPORTED_ARTICLE,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_ARTICLE_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_ARTICLE_FAIL,
            payload: data
        })
    }
})
export const searchReportedForum = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_REPORTED_FORUM,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_FORUM_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_FORUM_FAIL,
            payload: data
        })
    }
})

export const searchReportedPost = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_REPORTED_POST,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_POST_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEARCH_REPORTED_POST_FAIL,
            payload: data
        })
    }
})

export const pushNotification = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_PUSH_NOTIFICATION,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.SEND_PUSH_NOTIFICATION_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.SEND_PUSH_NOTIFICATION_FAIL,
            payload: data
        })
    }
})

export const editNotification = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_UPDATE_NOTIFICATION,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.UPDATE_NOTIFICATION_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.UPDATE_NOTIFICATION_FAIL,
            payload: data
        })
    }
})

export const getNotification = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_NOTIFICATION,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_NOTIFICATION_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_NOTIFICATION_FAIL,
            payload: data
        })
    }
})

export const deleteNotification = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_DELETE_NOTIFICATION,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.DELETE_NOTIFICATION_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.DELETE_NOTIFICATION_FAIL,
            payload: data
        })
    }
})

export const getNotificationInfo = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_GET_NOTIFICATION_INFO,
        method: 'POST',
        data: data,
        success: (data) => ({
            type: ACTION_TYPE.GET_NOTIFICATION_INFO_SUCCESS,
            payload: data
        }),
        error: (data) => ({
            type: ACTION_TYPE.GET_NOTIFICATION_INFO_FAIL,
            payload: data
        })
    }
})

export const searchNotification = (data) => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_SEARCH_NOTIFICATION,
        method: 'POST',
        data: data,
    }
})
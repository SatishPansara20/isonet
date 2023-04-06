//API
export const API = 'API'
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR'


//Authentication
//LOGIN
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
//LOGOUT
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
//CHANGE_PASSWORD
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'
//FORGOT_PASSWORD
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL'


//DASHBOARD MANAGEMENT
export const GET_DASHBOARD_LIST_SUCCESS = 'GET_DASHBOARD_LIST_SUCCESS'
export const GET_DASHBOARD_LIST_FAIL = 'GET_DASHBOARD_LIST_FAIL'

// SEARCH 
export const SEARCH_DATA_SUCCESS = 'SEARCH_DATA_SUCCESS'
export const SEARCH_DATA_FAIL = 'SEARCH_DATA_FAIL'
export const SEARCH_BLOCKED_DATA_SUCCESS = 'SEARCH_BLOCKED_DATA_SUCCESS'
export const SEARCH_BLOCKED_DATA_FAIL = 'SEARCH_BLOCKED_DATA_FAIL'
export const SEARCH_SUBSCRIBED_USER_DATA_SUCCESS = 'SEARCH_SUBSCRIBED_USER_DATA_SUCCESS'
export const SEARCH_SUBSCRIBED_USER_DATA_FAIL = 'SEARCH_SUBSCRIBED_USER_DATA_FAIL'
export const SEARCH_REPORTED_ARTICLE_SUCCESS = 'SEARCH_REPORTED_ARTICLE_SUCCESS'
export const SEARCH_REPORTED_ARTICLE_FAIL = 'SEARCH_REPORTED_ARTICLE_FAIL'
export const SEARCH_REPORTED_FORUM_SUCCESS = 'SEARCH_REPORTED_FORUM_SUCCESS'
export const SEARCH_REPORTED_FORUM_FAIL = 'SEARCH_REPORTED_FORUM_FAIL'
export const SEARCH_REPORTED_POST_SUCCESS = 'SEARCH_REPORTED_POST_SUCCESS'
export const SEARCH_REPORTED_POST_FAIL = 'SEARCH_REPORTED_POST_FAIL'
export const SEARCH_LOAN_MANAGEMENT_SUCCESS = 'SEARCH_LOAN_MANAGEMENT_SUCCESS'
export const SEARCH_LOAN_MANAGEMENT_FAIL = 'SEARCH_LOAN_MANAGEMENT_FAIL'

//USER Management - (Funder / Broker Management / Subscribe user)
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS'
export const GET_USER_LIST_FAIL = 'GET_USER_LIST_FAIL'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL'
// export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
// export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL'
export const PUT_APPROVE_USER_ACCOUNT_SUCCESS = 'PUT_APPROVE_USER_ACCOUNT_SUCCESS'
export const PUT_APPROVE_USER_ACCOUNT_FAIL = 'PUT_APPROVE_USER_ACCOUNT_FAIL'
export const POST_USER_VERIFIED_SUCCESS = 'POST_USER_VERIFIED_SUCCESS'
export const POST_USER_VERIFIED_FAIL = 'POST_USER_VERIFIED_FAIL'
export const POST_BLOCKED_USER_LIST_SUCCESS = 'POST_BLOCKED_USER_LIST_SUCCESS'
export const POST_BLOCKED_USER_LIST_FAIL = 'POST_BLOCKED_USER_LIST_FAIL'
export const PATCH_BLOCK_USER_ACCOUNT_SUCCESS = 'PATCH_BLOCK_USER_ACCOUNT_SUCCESS'
export const PATCH_BLOCK_USER_ACCOUNT_FAIL = 'PATCH_BLOCK_USER_ACCOUNT_FAIL'
export const GET_USER_SUBSCRIPTION_LIST_SUCCESS = 'GET_USER_SUBSCRIPTION_LIST_SUCCESS'
export const GET_USER_SUBSCRIPTION_LIST_ERROR = 'GET_USER_SUBSCRIPTION_LIST_ERROR'
export const POST_FLAGGED_USERS_LIST_SUCCESS = 'POST_FLAGGED_USERS_LIST_SUCCESS'
export const POST_FLAGGED_USERS_LIST_FAIL = 'POST_FLAGGED_USERS_LIST_FAIL'
export const POST_FLAGGED_USERS_SEARCH_SUCCESS = 'POST_FLAGGED_USERS_SEARCH_SUCCESS'
export const POST_FLAGGED_USERS_SEARCH_FAIL = 'POST_FLAGGED_USERS_SEARCH_FAIL'
export const POST_REPORTED_USERS_LIST_SUCCESS = 'POST_REPORTED_USERS_LIST_SUCCESS'
export const POST_REPORTED_USERS_LIST_FAIL = 'POST_REPORTED_USERS_LIST_FAIL'
export const POST_REPORTED_USERS_SEARCH_SUCCESS = 'POST_REPORTED_USERS_SEARCH_SUCCESS'
export const POST_REPORTED_USERS_SEARCH_FAIL = 'POST_REPORTED_USERS_SEARCH_FAIL'


//COMPANY MANAGEMENT
export const GET_COMPANY_LIST_SUCCESS = 'GET_COMPANY_LIST_SUCCESS'
export const GET_COMPANY_LIST_FAIL = 'GET_COMPANY_LIST_FAIL'
export const GET_COMPANY_INFO_SUCCESS = 'GET_COMPANY_INFO_SUCCESS'
export const GET_COMPANY_INFO_FAIL = 'GET_COMPANY_INFO_FAIL'
export const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS'
export const DELETE_COMPANY_FAIL = 'DELETE_COMPANY_FAIL'

// CATEGORY MANAGEMENT
export const GET_CATEGORY_LIST_SUCCESS = 'GET_CATEGORY_LIST_SUCCESS'
export const GET_CATEGORY_LIST_FAIL = 'GET_CATEGORY_LIST_FAIL'
export const POST_ADD_CATEGORY_SUCCESS = 'POST_ADD_CATEGORY_SUCCESS'
export const POST_ADD_CATEGORY_FAIL = 'POST_ADD_CATEGORY_FAIL'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL'
export const GET_CATEGORY_INFO_SUCCESS = 'GET_CATEGORY_INFO_SUCCESS'
export const GET_CATEGORY_INFO_FAIL = 'GET_CATEGORY_INFO_FAIL'
export const PATCH_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS'
export const PATCH_CATEGORY_FAIL = 'POST_CATEGORY_FAIL'

//-------------- Admin Driven Data Management -------------//
//INDUSTRIES MANAGEMENT
export const GET_INDUSTRIES_LIST_SUCCESS = 'GET_INDUSTRIES_LIST_SUCCESS'
export const GET_INDUSTRIES_LIST_FAIL = 'GET_INDUSTRIES_LIST_FAIL'
export const POST_ADD_INDUSTRIES_SUCCESS = 'POST_ADD_INDUSTRIES_SUCCESS'
export const POST_ADD_INDUSTRIES_FAIL = 'POST_ADD_INDUSTRIES_FAIL'
export const DELETE_INDUSTRIES_SUCCESS = 'DELETE_INDUSTRIES_SUCCESS'
export const DELETE_INDUSTRIES_FAIL = 'DELETE_INDUSTRIES_FAIL'
export const GET_INDUSTRIES_INFO_SUCCESS = 'GET_INDUSTRIES_INFO_SUCCESS'
export const GET_INDUSTRIES_INFO_FAIL = 'GET_INDUSTRIES_INFO_FAIL'
export const PATCH_INDUSTRIES_SUCCESS = 'POST_INDUSTRIES_SUCCESS'
export const PATCH_INDUSTRIES_FAIL = 'POST_INDUSTRIES_FAIL'

//STATE MANAGEMENT
export const GET_STATE_LIST_SUCCESS = 'GET_STATE_LIST_SUCCESS'
export const GET_STATE_LIST_FAIL = 'GET_STATE_LIST_FAIL'
export const POST_ADD_STATE_SUCCESS = 'POST_ADD_STATE_SUCCESS'
export const POST_ADD_STATE_FAIL = 'POST_ADD_STATE_FAIL'
export const DELETE_STATE_SUCCESS = 'DELETE_STATE_SUCCESS'
export const DELETE_STATE_FAIL = 'DELETE_STATE_FAIL'
export const GET_STATE_INFO_SUCCESS = 'GET_STATE_INFO_SUCCESS'
export const GET_STATE_INFO_FAIL = 'GET_STATE_INFO_FAIL'
export const PATCH_STATE_SUCCESS = 'POST_STATE_SUCCESS'
export const PATCH_STATE_FAIL = 'POST_STATE_FAIL'

// FUNDING_AMOUNT MANAGEMENT
export const GET_FUNDING_AMOUNT_LIST_SUCCESS = 'GET_FUNDING_AMOUNT_LIST_SUCCESS'
export const GET_FUNDING_AMOUNT_LIST_FAIL = 'GET_FUNDING_AMOUNT_LIST_FAIL'
export const POST_ADD_FUNDING_AMOUNT_SUCCESS = 'POST_ADD_FUNDING_AMOUNT_SUCCESS'
export const POST_ADD_FUNDING_AMOUNT_FAIL = 'POST_ADD_FUNDING_AMOUNT_FAIL'
export const DELETE_FUNDING_AMOUNT_SUCCESS = 'DELETE_FUNDING_AMOUNT_SUCCESS'
export const DELETE_FUNDING_AMOUNT_FAIL = 'DELETE_FUNDING_AMOUNT_FAIL'
export const GET_FUNDING_AMOUNT_INFO_SUCCESS = 'GET_FUNDING_AMOUNT_INFO_SUCCESS'
export const GET_FUNDING_AMOUNT_INFO_FAIL = 'GET_FUNDING_AMOUNT_INFO_FAIL'
export const PATCH_FUNDING_AMOUNT_SUCCESS = 'POST_FUNDING_AMOUNT_SUCCESS'
export const PATCH_FUNDING_AMOUNT_FAIL = 'POST_FUNDING_AMOUNT_FAIL'

// TERMS_LENGTH MANAGEMENT
export const GET_TERMS_LENGTH_LIST_SUCCESS = 'GET_TERMS_LENGTH_LIST_SUCCESS'
export const GET_TERMS_LENGTH_LIST_FAIL = 'GET_TERMS_LENGTH_LIST_FAIL'
export const POST_ADD_TERMS_LENGTH_SUCCESS = 'POST_ADD_TERMS_LENGTH_SUCCESS'
export const POST_ADD_TERMS_LENGTH_FAIL = 'POST_ADD_TERMS_LENGTH_FAIL'
export const DELETE_TERMS_LENGTH_SUCCESS = 'DELETE_TERMS_LENGTH_SUCCESS'
export const DELETE_TERMS_LENGTH_FAIL = 'DELETE_TERMS_LENGTH_FAIL'
export const GET_TERMS_LENGTH_INFO_SUCCESS = 'GET_TERMS_LENGTH_INFO_SUCCESS'
export const GET_TERMS_LENGTH_INFO_FAIL = 'GET_TERMS_LENGTH_INFO_FAIL'
export const PATCH_TERMS_LENGTH_SUCCESS = 'POST_TERMS_LENGTH_SUCCESS'
export const PATCH_TERMS_LENGTH_FAIL = 'POST_TERMS_LENGTH_FAIL'

// BUY_RATES MANAGEMENT
export const GET_BUY_RATES_LIST_SUCCESS = 'GET_BUY_RATES_LIST_SUCCESS'
export const GET_BUY_RATES_LIST_FAIL = 'GET_BUY_RATES_LIST_FAIL'
export const POST_ADD_BUY_RATES_SUCCESS = 'POST_ADD_BUY_RATES_SUCCESS'
export const POST_ADD_BUY_RATES_FAIL = 'POST_ADD_BUY_RATES_FAIL'
export const DELETE_BUY_RATES_SUCCESS = 'DELETE_BUY_RATES_SUCCESS'
export const DELETE_BUY_RATES_FAIL = 'DELETE_BUY_RATES_FAIL'
export const GET_BUY_RATES_INFO_SUCCESS = 'GET_BUY_RATES_INFO_SUCCESS'
export const GET_BUY_RATES_INFO_FAIL = 'GET_BUY_RATES_INFO_FAIL'
export const PATCH_BUY_RATES_SUCCESS = 'POST_BUY_RATES_SUCCESS'
export const PATCH_BUY_RATES_FAIL = 'POST_BUY_RATES_FAIL'

// UP_SELL_POINTS MANAGEMENT
export const GET_UP_SELL_POINTS_LIST_SUCCESS = 'GET_UP_SELL_POINTS_LIST_SUCCESS'
export const GET_UP_SELL_POINTS_LIST_FAIL = 'GET_UP_SELL_POINTS_LIST_FAIL'
export const POST_ADD_UP_SELL_POINTS_SUCCESS = 'POST_ADD_UP_SELL_POINTS_SUCCESS'
export const POST_ADD_UP_SELL_POINTS_FAIL = 'POST_ADD_UP_SELL_POINTS_FAIL'
export const DELETE_UP_SELL_POINTS_SUCCESS = 'DELETE_UP_SELL_POINTS_SUCCESS'
export const DELETE_UP_SELL_POINTS_FAIL = 'DELETE_UP_SELL_POINTS_FAIL'
export const GET_UP_SELL_POINTS_INFO_SUCCESS = 'GET_UP_SELL_POINTS_INFO_SUCCESS'
export const GET_UP_SELL_POINTS_INFO_FAIL = 'GET_UP_SELL_POINTS_INFO_FAIL'
export const PATCH_UP_SELL_POINTS_SUCCESS = 'POST_UP_SELL_POINTS_SUCCESS'
export const PATCH_UP_SELL_POINTS_FAIL = 'POST_UP_SELL_POINTS_FAIL'

//INTERESTS MANAGEMENT
export const GET_INTEREST_LIST_SUCCESS = 'GET_INTEREST_LIST_SUCCESS'
export const GET_INTEREST_LIST_FAIL = 'GET_INTEREST_LIST_FAIL'
export const POST_ADD_INTEREST_SUCCESS = 'POST_ADD_INTEREST_SUCCESS'
export const POST_ADD_INTEREST_FAIL = 'POST_ADD_INTEREST_FAIL'
export const DELETE_INTEREST_SUCCESS = 'DELETE_INTEREST_SUCCESS'
export const DELETE_INTEREST_FAIL = 'DELETE_INTEREST_FAIL'
export const GET_INTEREST_INFO_SUCCESS = 'GET_INTEREST_INFO_SUCCESS'
export const GET_INTEREST_INFO_FAIL = 'GET_INTEREST_INFO_FAIL'
export const PATCH_INTEREST_SUCCESS = 'POST_INTEREST_SUCCESS'
export const PATCH_INTEREST_FAIL = 'POST_INTEREST_FAIL'

//LOAN TAG MANAGEMENT
export const GET_LOAN_TAG_LIST_SUCCESS = 'GET_LOAN_TAG_LIST_SUCCESS'
export const GET_LOAN_TAG_LIST_FAIL = 'GET_LOAN_TAG_LIST_FAIL'
export const POST_ADD_LOAN_TAG_SUCCESS = 'POST_ADD_LOAN_TAG_SUCCESS'
export const POST_ADD_LOAN_TAG_FAIL = 'POST_ADD_LOAN_TAG_FAIL'
export const GET_LOAN_TAG_INFO_SUCCESS = 'GET_LOAN_TAG_INFO_SUCCESS'
export const GET_LOAN_TAG_INFO_FAIL = 'GET_LOAN_TAG_INFO_FAIL'
export const DELETE_LOAN_TAG_SUCCESS = 'DELETE_LOAN_TAG_SUCCESS'
export const DELETE_LOAN_TAG_FAIL = 'DELETE_LOAN_TAG_FAIL'
export const PATCH_LOAN_TAG_SUCCESS = 'POST_LOAN_TAG_SUCCESS'
export const PATCH_LOAN_TAG_FAIL = 'POST_LOAN_TAG_FAIL'

// ------------------------------------------------------------------------//

//REVIEW MANAGEMENT
export const GET_REVIEW_LIST_SUCCESS = 'GET_REVIEW_LIST_SUCCESS'
export const GET_REVIEW_LIST_FAIL = 'GET_REVIEW_LIST_FAIL'
export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS'
export const DELETE_REVIEW_FAIL = 'DELETE_REVIEW_FAIL'

//CMS MANAGEMENT
export const POST_CMS_LIST_SUCCESS = 'POST_CMS_LIST_SUCCESS'
export const POST_CMS_LIST_FAIL = 'POST_CMS_LIST_FAIL'
export const PATCH_CMS_SUCCESS = 'POST_CMS_SUCCESS'
export const PATCH_CMS_FAIL = 'POST_CMS_FAIL'
export const PATCH_INITIAL_CMS_SUCCESS = 'POST_INITIAL_CMS_SUCCESS'
export const PATCH_INITIAL_CMS_FAIL = 'POST_INITIAL_CMS_FAIL'


//POST MANAGMENT
export const GET_ALL_POST_LIST_SUCCESS = 'GET_ALL_POST_LIST_SUCCESS'
export const GET_ALL_POST_LIST_FAIL = 'GET_ALL_POST_LIST_FAIL'
export const GET_FUNDER_POST_LIST_SUCCESS = 'GET_FUNDER_POST_LIST_SUCCESS'
export const GET_FUNDER_POST_LIST_FAIL = 'GET_FUNDER_POST_LIST_FAIL'
export const GET_BROKER_POST_LIST_SUCCESS = 'GET_BROKER_POST_LIST_SUCCESS'
export const GET_BROKER_POST_LIST_FAIL = 'GET_BROKER_POST_LIST_FAIL'
export const GET_REPORTED_POST_LIST_SUCCESS = 'GET_REPORTED_POST_LIST_SUCCESS'
export const GET_REPORTED_POST_LIST_FAIL = 'GET_REPORTED_POST_LIST_FAIL'
export const GET_POST_INFO_SUCCESS = 'GET_POST_INFO_SUCCESS'
export const GET_POST_INFO_FAIL = 'GET_POST_INFO_FAIL'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL'
export const POST_FLAGGED_POSTS_LIST_SUCCESS = 'POST_FLAGGED_POSTS_LIST_SUCCESS'
export const POST_FLAGGED_POSTS_LIST_FAIL = 'POST_FLAGGED_POSTS_LIST_FAIL'
export const POST_FLAGGED_POSTS_SEARCH_SUCCESS = 'POST_FLAGGED_POSTS_SEARCH_SUCCESS'
export const POST_FLAGGED_POSTS_SEARCH_FAIL = 'POST_FLAGGED_POSTS_SEARCH_FAIL'

//POST COMMENT
export const GET_COMMENT_LIST_SUCCESS = 'GET_COMMENT_LIST_SUCCESS'
export const GET_COMMENT_LIST_FAIL = 'GET_COMMENT_LIST_FAIL'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL'
export const DELETE_COMMENT_REPLY_SUCCESS = 'DELETE_COMMENT_REPLY_SUCCESS'
export const DELETE_COMMENT_REPLY_FAIL = 'DELETE_COMMENT_REPLY_FAIL'

//ARTICLE MANAGEMENT
export const GET_ARTICLE_LIST_SUCCESS = 'GET_ARTICLE_LIST_SUCCESS'
export const GET_ARTICLE_LIST_FAIL = 'GET_ARTICLE_LIST_FAIL'
export const POST_REPORTED_ARTICLE_LIST_SUCCESS = 'POST_REPORTED_ARTICLE_LIST_SUCCESS'
export const POST_REPORTED_ARTICLE_LIST_FAIL = 'POST_REPORTED_ARTICLE_LIST_FAIL'
export const POST_ADD_ARTICLE_SUCCESS = 'POST_ADD_ARTICLE_SUCCESS'
export const POST_ADD_ARTICLE_FAIL = 'POST_ADD_ARTICLE_FAIL'
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS'
export const DELETE_ARTICLE_FAIL = 'DELETE_ARTICLE_FAIL'
export const GET_ARTICLE_INFO_SUCCESS = 'GET_ARTICLE_INFO_SUCCESS'
export const GET_ARTICLE_INFO_FAIL = 'GET_ARTICLE_INFO_FAIL'
export const PATCH_ARTICLE_SUCCESS = 'POST_ARTICLE_SUCCESS'
export const PATCH_ARTICLE_FAIL = 'POST_ARTICLE_FAIL'

// ARTICLE COMMENT
export const GET_ARTICLE_COMMENT_LIST_SUCCESS = 'GET_ARTICLE_COMMENT_LIST_SUCCESS'
export const GET_ARTICLE_COMMENT_LIST_FAIL = 'GET_ARTICLE_COMMENT_LIST_FAIL'
export const DELETE_ARTICLE_COMMENT_SUCCESS = 'DELETE_ARTICLE_COMMENT_SUCCESS'
export const DELETE_ARTICLE_COMMENT_FAIL = 'DELETE_ARTICLE_COMMENT_FAIL'
export const DELETE_ARTICLE_COMMENT_REPLY_SUCCESS = 'DELETE_ARTICLE_COMMENT_REPLY_SUCCESS'
export const DELETE_ARTICLE_COMMENT_REPLY_FAIL = 'DELETE_ARTICLE_COMMENT_REPLY_FAIL'

//FORUM MANAGEMENT
export const GET_FORUM_LIST_SUCCESS = 'GET_FORUM_LIST_SUCCESS'
export const GET_FORUM_LIST_FAIL = 'GET_FORUM_LIST_FAIL'
export const POST_ADD_FORUM_SUCCESS = 'POST_ADD_FORUM_SUCCESS'
export const POST_ADD_FORUM_FAIL = 'POST_ADD_FORUM_FAIL'
export const DELETE_FORUM_SUCCESS = 'DELETE_FORUM_SUCCESS'
export const DELETE_FORUM_FAIL = 'DELETE_FORUM_FAIL'
export const GET_FORUM_INFO_SUCCESS = 'GET_FORUM_INFO_SUCCESS'
export const GET_FORUM_INFO_FAIL = 'GET_FORUM_INFO_FAIL'
export const PATCH_FORUM_SUCCESS = 'POST_FORUM_SUCCESS'
export const PATCH_FORUM_FAIL = 'POST_FORUM_FAIL'
export const POST_FLAGGED_FORUM_LIST_SUCCESS = 'POST_FLAGGED_FORUM_LIST_SUCCESS'
export const POST_FLAGGED_FORUM_LIST_FAIL = 'POST_FLAGGED_FORUM_LIST_FAIL'

// FORUM COMMENT
export const GET_FORUM_COMMENT_LIST_SUCCESS = 'GET_FORUM_COMMENT_LIST_SUCCESS'
export const GET_FORUM_COMMENT_LIST_FAIL = 'GET_FORUM_COMMENT_LIST_FAIL'
export const DELETE_FORUM_COMMENT_SUCCESS = 'DELETE_FORUM_COMMENT_SUCCESS'
export const DELETE_FORUM_COMMENT_FAIL = 'DELETE_FORUM_COMMENT_FAIL'
export const DELETE_FORUM_COMMENT_REPLY_SUCCESS = 'DELETE_FORUM_COMMENT_REPLY_SUCCESS'
export const DELETE_FORUM_COMMENT_REPLY_FAIL = 'DELETE_FORUM_COMMENT_REPLY_FAIL'
export const POST_REPORTED_FORUM_LIST_SUCCESS = 'POST_REPORTED_FORUM_LIST_SUCCESS'
export const POST_REPORTED_FORUM_LIST_FAIL = 'POST_REPORTED_FORUM_LIST_FAIL'
export const POST_REPORTED_FORUM_SEARCH_SUCCESS = 'POST_REPORTED_FORUM_SEARCH_SUCCESS'
export const POST_REPORTED_FORUM_SEARCH_FAIL = 'POST_REPORTED_FORUM_SEARCH_FAIL'

//LOAN MANAGEMENT
export const GET_LOAN_LIST_SUCCESS = 'GET_LOAN_LIST_SUCCESS'
export const GET_LOAN_LIST_FAIL = 'GET_LOAN_LIST_FAIL'

// PUSH NOTIFICATION
export const SEND_PUSH_NOTIFICATION_SUCCESS = `SEND_PUSH_NOTIFICATION_SUCCESS`
export const SEND_PUSH_NOTIFICATION_FAIL = `SEND_PUSH_NOTIFICATION_FAIL`

export const GET_NOTIFICATION_SUCCESS = `GET_NOTIFICATION_SUCCESS`
export const GET_NOTIFICATION_FAIL = `GET_NOTIFICATION_FAIL`

export const DELETE_NOTIFICATION_SUCCESS = `DELETE_NOTIFICATION_SUCCESS`
export const DELETE_NOTIFICATION_FAIL = `DELETE_NOTIFICATION_FAIL`

export const GET_NOTIFICATION_INFO_SUCCESS = `GET_NOTIFICATION_INFO_SUCCESS`
export const GET_NOTIFICATION_INFO_FAIL = `GET_NOTIFICATION_INFO_FAIL`

export const UPDATE_NOTIFICATION_SUCCESS = `UPDATE_NOTIFICATION_SUCCESS`
export const UPDATE_NOTIFICATION_FAIL = `UPDATE_NOTIFICATION_FAIL`
export const {
    REACT_APP_API_BASE: API_BASE,
    REACT_APP_API_BASE_BASE_URL_IMAGE: BASE_URL_IMAGE,
    REACT_APP_API_IMAGE_BASE: IMAGE_BASE_URL,
} = process.env


//Authentication
export const API_LOGIN = `${API_BASE}adminapp/admin_login/`
export const API_LOGOUT = `${API_BASE}adminapp/logout/`
export const API_CHANGE_PASSWORD = `${API_BASE}adminapp/change_password/`
export const API_FORGOT_PASSWORD = `${API_BASE}adminapp/forgot_password/`


//Searching
export const API_SEARCH_DATA = `${API_BASE}adminapp/search/searchlist/`

export const API_SEARCH_SUBSCRIBED_USER = `${API_BASE}adminapp/subsusersearch/get_queryset/`
export const API_SEARCH_BLOCKED_USER = `${API_BASE}adminapp/blockedusersearch/get_queryset/`
export const API_POST_FLAGGED_USERS_SEARCH = `${API_BASE}adminapp/search/searchlist/`
export const API_POST_REPORTED_USERS_SEARCH = `${API_BASE}baseapp/manage_report/report_listing/`
export const API_SEARCH_NOTIFICATION = `${API_BASE}adminapp/admin_notification/search_queryset/`
export const API_SEARCH_LOAN_MANAGEMENT = `${API_BASE}adminapp/loanmanagementsearch/get_queryset/`
export const API_SEARCH_REPORTED_ARTICLE = `${API_BASE}adminapp/reportedarticlesearch/get_queryset/`
export const API_SEARCH_REPORTED_POST = `${API_BASE}baseapp/manage_report/report_listing/`
export const API_POST_FLAGGED_POSTS_SEARCH = `${API_BASE}baseapp/manage_feed/list_flagged_feed/`
export const API_SEARCH_REPORTED_FORUM = `${API_BASE}adminapp/flaggedforumsearch/get_queryset/`
export const API_POST_FLAGGED_FORUM_SEARCH = `${API_BASE}allpostapp/manage_forum/list_flagged_forum/`
export const API_REPORTED_FORUM_SEARCH = `${API_BASE}baseapp/manage_report/report_listing/`


//Dashboard Management
export const API_GET_DASHBOARD_LIST = `${API_BASE}adminapp/admin_dashboard/`


//User Management - (Funder / Broker Management)
export const API_GET_USER_LIST = `${API_BASE}adminapp/user_management/`
export const API_DELETE_USER = `${API_BASE}adminapp/user_management/`
export const API_POST_USER_VERIFIED = `${API_BASE}adminapp/user_management/verify_user/`
export const API_PUT_USER_APPROVE = `${API_BASE}adminapp/user_management/`
export const API_POST_BLOCKED_USER_LIST = `${API_BASE}adminapp/user_management/blocked_user_list/`
export const API_PATCH_USER_BLOCK = `${API_BASE}adminapp/user_management/`
export const API_POST_FLAGGED_USERS_LIST = `${API_BASE}adminapp/user_management/list_flagged_user/`
export const API_POST_REPORTED_USERS_LIST = `${API_BASE}baseapp/manage_report/report_listing/`


// Subscribed user
export const API_GET_SUBSCRIPTION_USER_LIST = `${API_BASE}adminapp/subscriptionuser/`


//Company Management
export const API_GET_COMPANY_LIST = `${API_BASE}adminapp/company_list`
export const API_DELETE_COMPANY = `${API_BASE}adminapp/company_delete/`


// Post Management
export const API_ALL_POST_LIST = `${API_BASE}adminapp/post_list?news_feed_type=ALL`
export const API_FUNDER_POST_LIST = `${API_BASE}adminapp/post_list?news_feed_type=FU`
export const API_BROKER_POST_LIST = `${API_BASE}adminapp/post_list?news_feed_type=BR`
export const API_POST_INFO = `${API_BASE}adminapp/post_retrieve/`
export const API_POST_DELETE = `${API_BASE}adminapp/post_delete/`
export const API_REPORTED_POST_LIST = `${API_BASE}baseapp/manage_report/report_listing/`
export const API_POST_FLAGGED_POSTS_LIST = `${API_BASE}baseapp/manage_feed/list_flagged_feed/`
//Post Comment
export const API_GET_COMMENT_LIST = `${API_BASE}adminapp/feed_comment/list_comment/`
export const API_DELETE_COMMENT = `${API_BASE}adminapp/feed_comment/delete_comment/`
export const API_DELETE_COMMENT_REPLY = `${API_BASE}adminapp/feed_comment/delete_comment_reply/`


//Forum MANAGEMENT 
export const API_GET_FORUM_LIST = `${API_BASE}allpostapp/manage_forum/admin_list_forum/`
export const API_GET_FORUM_INFO = `${API_BASE}allpostapp/manage_forum/get_forum_details/`
export const API_ADD_FORUM = `${API_BASE}allpostapp/manage_forum/create_forum/`
export const API_UPDATE_FORUM = `${API_BASE}allpostapp/manage_forum/update_forum/`
export const API_DELETE_FORUM = `${API_BASE}allpostapp/manage_forum/delete_forum/`
export const API_REPORTED_FORUM_LIST = `${API_BASE}baseapp/manage_report/report_listing/`
export const API_POST_FLAGGED_FORUM_LIST = `${API_BASE}allpostapp/manage_forum/list_flagged_forum/`
// Forum comment
export const API_GET_FORUM_COMMENT_LIST = `${API_BASE}allpostapp/manage_forum/get_forum_comment_list/`
export const API_DELETE_FORUM_COMMENT = `${API_BASE}allpostapp/manage_comment_forum/delete_forum_comment/`
export const API_DELETE_FORUM_COMMENT_REPLY = `${API_BASE}allpostapp/manage_comment_forum/delete_forum_comment_reply/`


//ARTICLE MANAGEMENT 
export const API_GET_ARTICLE_LIST = `${API_BASE}adminapp/article_crud/`
export const API_REPORTED_ARTICLE_LIST = `${API_BASE}adminapp/reported_article/reported_article_list/`
export const API_POST_ARTICLE = `${API_BASE}adminapp/create_article/`
export const API_DELETE_ARTICLE = `${API_BASE}adminapp/article_crud/`
export const API_GET_ARTICLE_INFO = `${API_BASE}adminapp/article_crud/`
export const API_PATCH_ARTICLE = `${API_BASE}adminapp/article_update/update_article/`
// ARTICLE COMMENT
export const API_GET_ARTICLE_COMMENT_LIST = `${API_BASE}adminapp/article_comment/get_article_comment_details/`
export const API_DELETE_ARTICLE_COMMENT = `${API_BASE}adminapp/article_comment/delete_article_comment/`
export const API_DELETE_ARTICLE_COMMENT_REPLY = `${API_BASE}adminapp/article_comment/delete_article_comment_reply/`


//LOAN MANAGEMENT
export const API_GET_LOAN_LIST = `${API_BASE}adminapp/loan_list`


// Category Management
export const API_GET_CATEGORY_LIST = `${API_BASE}adminapp/feed_category_crud/`
export const API_GET_CATEGORY_INFO = `${API_BASE}adminapp/feed_category_crud/`
export const API_POST_CATEGORY = `${API_BASE}adminapp/feed_category_crud/`
export const API_DELETE_CATEGORY = `${API_BASE}adminapp/feed_category_crud/`
export const API_PATCH_CATEGORY = `${API_BASE}adminapp/feed_category_crud/`


// Review Management
export const API_GET_REVIEW_LIST = `${API_BASE}adminapp/review_list`
export const API_DELETE_REVIEW = `${API_BASE}adminapp/review_delete/`


//Push Notification 
export const API_PUSH_NOTIFICATION = `${API_BASE}adminapp/admin_notification/custom_notification/`
export const API_GET_NOTIFICATION = `${API_BASE}adminapp/admin_notification/list_schedule_notifications/`
export const API_DELETE_NOTIFICATION = `${API_BASE}adminapp/admin_notification/delete_schedule_notification/`
export const API_GET_NOTIFICATION_INFO = `${API_BASE}adminapp/admin_notification/get_schedule_notification/`
export const API_UPDATE_NOTIFICATION = `${API_BASE}adminapp/admin_notification/update_schedule_notification/`


// App Data Management------------------------------------------------
//Interest Management
export const API_GET_INTEREST_LIST = `${API_BASE}adminapp/intrestcrud/`
export const API_POST_INTEREST_ADD = `${API_BASE}adminapp/intrestcrud/`
export const API_DELETE_INTEREST = `${API_BASE}adminapp/intrestcrud/`
export const API_GET_INTEREST_INFO = `${API_BASE}adminapp/intrestcrud/`
export const API_PATCH_INTEREST = `${API_BASE}adminapp/intrestcrud/`

//Industry Management
export const API_GET_INDUSTRY_LIST = `${API_BASE}adminapp/industries_crud/`
export const API_POST_INDUSTRY_ADD = `${API_BASE}adminapp/industries_crud/`
export const API_DELETE_INDUSTRY = `${API_BASE}adminapp/industries_crud/`
export const API_GET_INDUSTRY_INFO = `${API_BASE}adminapp/industries_crud/`
export const API_PATCH_INDUSTRY = `${API_BASE}adminapp/industries_crud/`

//State Management
export const API_GET_STATE_LIST = `${API_BASE}adminapp/state_crud/`
export const API_POST_STATE_ADD = `${API_BASE}adminapp/state_crud/`
export const API_DELETE_STATE = `${API_BASE}adminapp/state_crud/`
export const API_GET_STATE_INFO = `${API_BASE}adminapp/state_crud/`
export const API_PATCH_STATE = `${API_BASE}adminapp/state_crud/`

//Funding Amount Management
export const API_GET_FUNDING_AMOUNT_LIST = `${API_BASE}adminapp/admin_fund_crud/`
export const API_POST_FUNDING_AMOUNT_ADD = `${API_BASE}adminapp/admin_fund_crud/`
export const API_DELETE_FUNDING_AMOUNT = `${API_BASE}adminapp/admin_fund_crud/`
export const API_GET_FUNDING_AMOUNT_INFO = `${API_BASE}adminapp/admin_fund_crud/`
export const API_PATCH_FUNDING_AMOUNT = `${API_BASE}adminapp/admin_fund_crud/`

//LOAN TAG MANAGEMENT
export const API_GET_LOAN_TAG_LIST = `${API_BASE}adminapp/loan_tag_crud/`
export const API_POST_LOAN_TAG_ADD = `${API_BASE}adminapp/loan_tag_crud/`
export const API_DELETE_LOAN_TAG = `${API_BASE}adminapp/loan_tag_crud/`
export const API_GET_LOAN_TAG_INFO = `${API_BASE}adminapp/loan_tag_crud/`
export const API_PATCH_LOAN_TAG = `${API_BASE}adminapp/loan_tag_crud/`

//Term Length Management
export const API_GET_TERM_LENGTH_LIST = `${API_BASE}adminapp/termlength_crud/`
export const API_POST_TERM_LENGTH_ADD = `${API_BASE}adminapp/termlength_crud/`
export const API_DELETE_TERM_LENGTH = `${API_BASE}adminapp/termlength_crud/`
export const API_GET_TERM_LENGTH_INFO = `${API_BASE}adminapp/termlength_crud/`
export const API_PATCH_TERM_LENGTH = `${API_BASE}adminapp/termlength_crud/`

//Buy Rates Management
export const API_GET_BUY_RATE_LIST = `${API_BASE}adminapp/buyrates_crud/`
export const API_POST_BUY_RATE_ADD = `${API_BASE}adminapp/buyrates_crud/`
export const API_DELETE_BUY_RATE = `${API_BASE}adminapp/buyrates_crud/`
export const API_GET_BUY_RATE_INFO = `${API_BASE}adminapp/buyrates_crud/`
export const API_PATCH_BUY_RATE = `${API_BASE}adminapp/buyrates_crud/`

//UpSell Points Management
export const API_GET_UP_SELL_POINT_LIST = `${API_BASE}adminapp/upsellpoints_crud/`
export const API_POST_UP_SELL_POINT = `${API_BASE}adminapp/upsellpoints_crud/`
export const API_DELETE_UP_SELL_POINT = `${API_BASE}adminapp/upsellpoints_crud/`
export const API_GET_UP_SELL_POINT_INFO = `${API_BASE}adminapp/upsellpoints_crud/`
export const API_PATCH_UP_SELL_POINT = `${API_BASE}adminapp/upsellpoints_crud/`
// ----------------------------------------------------------------------


// CMS Management
export const API_POST_CMS_LIST = `${API_BASE}adminapp/cms/cms_list/`
export const API_CMS_PATCH = `${API_BASE}adminapp/cms/`
export const API_INITIAL_CMS = `${API_BASE}adminapp/cms/`
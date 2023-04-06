import {
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,
} from "../constants/types";

const initialState = {
    user: [],
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        // VIEW USER LIST
        case GET_USER_LIST_SUCCESS:
            return { ...state, user: action.payload };
        case GET_USER_LIST_FAIL:
            return state;

        default:
            return state;
    }
}
export default UserReducer;
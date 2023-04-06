import { combineReducers } from 'redux';

import api from './api';
import auth from './auth';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    api,
    auth,
    UserReducer,
})

export default rootReducer;
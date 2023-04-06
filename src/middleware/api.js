import axios from 'axios'
import { API_BASE } from '../constants/api'
import { API } from '../constants/types'
import { fetchFailed, fetchRequested, fetchSucceeded } from '../actions/api'

const apiMiddleware = store => next => action => {

    if (next) next(action);

    const { type, payload } = action;

    if (type === API) {
        const {
            url,
            data,
            request = fetchRequested,
            success = fetchSucceeded,
            error = fetchFailed,
            method = 'get'
        } = payload;

        store.dispatch(request({ payload }));

        return axios({
            baseURL: API_BASE, method, url, data
        }).then(res => {
            store.dispatch(success(res?.data));
            store.dispatch(fetchSucceeded());
            return Promise.resolve(res?.data);
        }).catch(err => {
            store.dispatch(error(err?.response?.data));
            store.dispatch(fetchFailed())
            return Promise.reject(err?.response?.data);
        });
    }
}

export default apiMiddleware;
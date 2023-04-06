import { API_REQUEST, API_SUCCESS, API_ERROR } from "../constants/types";

export const fetchRequested = props => ({
    type: API_REQUEST,
    ...props
})

export const fetchSucceeded = data => ({
    type: API_SUCCESS,
    payload: { data }
})

export const fetchFailed = err => ({
    type: API_ERROR,
    payload: { err }
})
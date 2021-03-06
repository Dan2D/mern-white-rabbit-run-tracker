import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    REGISTER_GOALS,
    REGISTER_SETTINGS
} from '../actions/types';
import {returnErrors} from './errorActions';
import axios from 'axios';

const config = { headers: { "Content-type": "application/json"}};

export const loadUser = () =>  (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    axios.get("/auth/user", tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        return 
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
}

export const register = ({email, username, password}) => (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    const body = JSON.stringify({email, username, password});
    console.log(body);
    axios.post("/users", body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })  
        return axios.post(`/goals/register/${res.data.user._id}`, body, config)
    })
    .then(res => {
        dispatch({
            type: REGISTER_GOALS,
            payload: res.data
        })
        return axios.post(`/settings/register/${res.data._id}`, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SETTINGS,
                payload: res.data
            })
        })
    })
    .catch(err => {
        console.log(err.response, err.response.data, err.response.status)
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

export const userLogin = ({username, password}) => dispatch => {
    const body = JSON.stringify({username, password});
    axios.post("/auth", body, config)
    .then(res => {
        dispatch({type:CLEAR_ERRORS});
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logOut = () => {
    return {type: LOGOUT_SUCCESS}
}


export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    if (token){
        config.headers['x-auth-token'] = token
    }
    return config
}
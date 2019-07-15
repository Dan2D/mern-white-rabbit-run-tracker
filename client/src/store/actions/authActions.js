import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_HOME,
    CLEAR_ERRORS,
    REGISTER_GOALS
} from '../actions/types';
import {returnErrors} from './errorActions';
import axios from 'axios';

const config = { headers: { "Content-type": "application/json"}};


// Check Token and Load User
export const loadUser = () =>  (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    // GET TOKEN FROM auth state, which gets it from local storage
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
// TODO(GOT REGISTRATION TO CREATE NEW GOAL DOC INSTANCE, LOOK OVER AND CLEAN UP)
export const register = ({email, username, password}) => (dispatch, getState) => {
    const body = JSON.stringify({email, username, password});
    axios.post("/users", body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })  
        return axios.post(`/goals/register/${res.data.user.id}`, body, config)
        // export const registerGoals = () => (dispatch, getState) => {
        //     const id = getState().auth.user._id;
        //     console.log(id)
        //     const body = JSON.stringify({id});
        //     axios.post('/goals', body, tokenConfig(getState))
        //     .then(res => {
        //         console.log("REGISTER_GOALS")
        //         dispatch({
        //             type: REGISTER_GOALS
        //         })
        //     })
        // }
    })
    .then(res => {
        dispatch({
            type: REGISTER_GOALS,
            payload: res.data
        })
    })
    .catch(err => {
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
        })  ;
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logOut = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Configures header if web-token is needed
export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    if (token){
        config.headers['x-auth-token'] = token
    }
    return config
}
import {UPDATE_SETTINGS, GET_SETTINGS} from '../actions/types';
import {tokenConfig} from './authActions';
import axios from 'axios';

// export const createSettings = (userID) => dispatch => {
//     axios.post(`/settings/register/${userID}`)
//     .then(res => {
//         dispatch({
//             type: REGISTER_SETTINGS,
//             payload: res.data
//         })
//     })
// }

export const getUserSettings = (userID) => (dispatch, getState)=> {
    console.log("GETTING SETTINGS", userID)
    axios.get(`/settings/${userID}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_SETTINGS,
            payload: res.data
        })
    })
}

export const updateUserSettings = (userID, distUnits) => (dispatch, getState)=> {
    const body = JSON.stringify({userID, distUnits});
    return axios.patch("/settings/", body, tokenConfig(getState))
    .then(res => {
        return dispatch({
            type: UPDATE_SETTINGS,
            payload: res.data
        })
    })
}


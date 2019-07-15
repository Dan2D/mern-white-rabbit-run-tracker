import {REGISTER_GOALS, GET_GOALS, ADD_GOAL, DEL_GOAL, EDIT_GOAL, FINISH_GOAL, ADD_RUN, DEL_RUN, EDIT_RUN, FINISH_RUN} from './types';
import axios from 'axios';
import {tokenConfig} from './authActions';
const config = {headers: {"Content-type": "application/json"}};


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

// GET USER GOALS
export const getUserGoals = (userGoalsID) => (dispatch, getState) => {
    console.log("GETTING GOALS")
    console.log(userGoalsID, "USER ID")
 axios.get(`/goals/${userGoalsID}`, tokenConfig(getState) )
.then(res => {
    dispatch({
        type: GET_GOALS,
        payload: res.data
    })
})
.catch(err => console.log(`ERROR: ${err}`))
}
// ADD GOAL
export const addGoal = (goalObj) => dispatch => {
    const {userGoalsID, name, raceDay, targetPace, goalDist, distUnit, goalType} = goalObj;
    console.log(userGoalsID)
    const body = JSON.stringify({userGoalsID, name, raceDay, targetPace, goalDist, distUnit, goalType});
    axios.post('/goals/add', body, config)
    .then(res => {
        dispatch({
            type: ADD_GOAL,
            payload: res.data
        })
    })
}
// DELETE GOAL
export const delGoal = (userGoalsID, goalID) => dispatch => {
    axios.delete(`/goals/${userGoalsID}/goal/${goalID}`)
    .then(res => {
        dispatch({
            type: DEL_GOAL,
            payload: goalID
        })
    })
}
// EDIT GOAL
export const editGoal = (goalObj) => dispatch => {
    const {userGoalsID, goalID,  name, raceDay, targetPace, goalDist, distUnit, goalType} = goalObj;
    const body = JSON.stringify({userGoalsID, name, raceDay, targetPace, goalDist, distUnit, goalType});
    console.log(body)
    axios.patch(`/goals/goal/${goalID}`, body, config)
    .then(res => {
        console.log(res.data, "GOAL")
        dispatch({
            type: EDIT_GOAL,
            payload: res.data
        })
    })
}

// FINISH GOAL
export const finishGoal = (goalObj) => dispatch => {
    //usergoalsid goalid mood actualpace goalINDX
    const {userGoalsID, goalID, actualPace, mood, goalIndx} = goalObj;
    console.log(goalObj)
    const body = JSON.stringify({userGoalsID, actualPace, mood});
    axios.patch(`/goals/goal/complete/${goalID}`, body, config)
    .then(res => {
        console.log(res.data, "RES DATA")
        dispatch({
            type: FINISH_GOAL,
            payload: res.data,
            goalIndx
        })
    })
}

// ADD RUN
export const addRun = (runObj) => (dispatch, getState) => {
    const {userGoalsID, goalID, name, targetPace, date, distance, distUnit, type} = runObj;
    const body = JSON.stringify({userGoalsID, goalID, name, targetPace, date, distance, distUnit, type});
    axios.post('/goals/addrun', body, tokenConfig(getState))
    .then(res => {
        console.log(res.data)
        dispatch({
            type: ADD_RUN,
            payload: res.data,
            goalID
        })
    })

}
// DELETE RUN
export const delRun = (idObj) => (dispatch, getState) => {
    console.log(idObj)
    const {userGoalsID, goalID, runID} = idObj;
    axios.delete(`/goals/${userGoalsID}/goal/${goalID}/runs/${runID}`, tokenConfig(getState))
      .then(res => {
          dispatch({
              type: DEL_RUN,
              goalID,
              runID
          })
      })
}
// EDIT RUN
export const editRun = (runObj) => (dispatch, getState) =>{
    const {userGoalsID, goalID, id, name, targetPace, actualPace, date, distance, type, completed, mood, runIndx} = runObj;
   const body = JSON.stringify({userGoalsID, goalID, name, targetPace, actualPace, date, distance, type, completed, mood});
   axios.patch(`/goals/runs/${id}`, body, tokenConfig(getState))
   .then(res => {
       console.log(res.data, "RES DATA")
       dispatch({
           type: EDIT_RUN,
           payload: res.data,
           goalID,
           runIndx
       })
   })
}

// FINISH RUN
export const finishRun = (runObj) => (dispatch, getState) => {
    const {userGoalsID, goalID, runID, mood, actualPace, runIndx} = runObj;
    console.log(runObj)
    const body = JSON.stringify({userGoalsID, goalID, mood, actualPace});
    axios.patch(`/goals/run/complete/${runID}`, body, tokenConfig(getState))
    .then(res => {
        console.log(res.data, "RUN")
        dispatch({
            type: FINISH_RUN,
            payload: res.data,
            goalID,
            runIndx
        })
    })
}

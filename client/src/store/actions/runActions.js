import {GET_GOALS, ADD_GOAL, EDIT_GOAL, DEL_GOAL, EDIT_RUN, ADD_RUN, DEL_RUN} from './types';
import axios from 'axios';
const config = {headers: {"Content-type": "application/json"}};
// Will get ID FROM USER AFTER SET UP LOG IN
export const getUserGoals = () => dispatch => {
    const id = "5d274f78ce98878a2c4ed59a";
 axios.get(`/goals/${id}`)
.then(res => {
    console.log(res.data, "RES DATA")
    dispatch({
        type: GET_GOALS,
        payload: res.data
    })
})
.catch(err => console.log(`ERROR: ${err}`))
}

export const addGoal = (goalObj) => dispatch => {
    const {userGoalsID, name, raceDay, targetPace, goalDist, goalType} = goalObj;
    const body = JSON.stringify({userGoalsID, name, raceDay, targetPace, goalDist, goalType});
    axios.post('/goals/add', body, config)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: ADD_GOAL,
            payload: res.data
        })
    })
}

export const delGoal = (userGoalsID, goalID) => dispatch => {
    axios.delete(`/goals/${userGoalsID}/goal/${goalID}`)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: DEL_GOAL,
            payload: goalID
        })
    })
}

export const editGoal = (goalObj) => dispatch => {
    const {userGoalsID, goalID,  name, raceDay, targetPace, goalDist, goalType} = goalObj;
    const body = JSON.stringify({userGoalsID, name, raceDay, targetPace, goalDist, goalType});
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

export const addRun = (runObj) => dispatch => {
    console.log(runObj)
    const userGoalsID = "5d274f78ce98878a2c4ed59a";
    const {goalID, name, targetPace, date, distance, type, completed, mood} = runObj;
    const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
    const body = JSON.stringify({userGoalsID, goalID, name, targetPace, date, distance, type, completed, mood});
    console.log(body)
    axios.post('/goals/addrun', body, config)
    .then(res => {
        console.log(res.data, "ADD RUN")
        dispatch({
            type: ADD_RUN,
            payload: res.data
        })
    })

}

export const delRun = (userGoalsID, goalID, runID) => dispatch => {
    axios.delete(`/goals/${userGoalsID}/goal/${goalID}/runs/${runID}`)
      .then(res => {
          console.log(res.data);
          dispatch({
              type: DEL_RUN,
              payload: res.data
          })
      })
}

export const editRun = (runObj) => dispatch =>{
    console.log(runObj)
    const {userGoalsID, goalID, id, name, targetPace, date, distance, type, completed, mood} = runObj;
   const config = {headers: {"Content-type": "application/json"}};
   const body = JSON.stringify({userGoalsID, goalID, name, targetPace, date, distance, type, completed, mood});

   axios.patch(`/goals/runs/${id}`, body, config)
   .then(res => {
       console.log(res.data)
       dispatch({
           type: EDIT_RUN,
           payload: res.data
       })
   })
   
   
   
    // dispatch(delRun(runObj.id));
    // dispatch(addRun(runObj));
}

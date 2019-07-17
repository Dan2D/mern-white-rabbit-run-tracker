import {
  GOALS_LOADING,
  GOALS_LOADED,
  GET_GOALS,
  ADD_GOAL,
  DEL_GOAL,
  EDIT_GOAL,
  FINISH_GOAL,
  ADD_RUN,
  DEL_RUN,
  EDIT_RUN,
  FINISH_RUN
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
const config = { headers: { "Content-type": "application/json" } };

export const getUserGoals = userGoalsID => (dispatch, getState) => {
  // dispatch({type: GOALS_LOADING});
  axios
    .get(`/goals/${userGoalsID}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GOALS,
        payload: res.data
      })
      // return dispatch({type: GOALS_LOADED})
    })
    .catch(err => console.log(`ERROR: ${err}`));
};

export const addGoal = goalObj => dispatch => {
  const {
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnit,
    goalType
  } = goalObj;
  const body = JSON.stringify({
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnit,
    goalType
  });
  axios.post("/goals/add", body, config).then(res => {
    dispatch({
      type: ADD_GOAL,
      payload: res.data
    });
  });
};

export const delGoal = (userGoalsID, goalID) => dispatch => {
  axios.delete(`/goals/${userGoalsID}/goal/${goalID}`).then(res => {
    dispatch({
      type: DEL_GOAL,
      payload: goalID
    });
  });
};

export const editGoal = goalObj => dispatch => {
  const {
    userGoalsID,
    goalID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnit,
    goalType
  } = goalObj;
  const body = JSON.stringify({
    userGoalsID,
    name,
    raceDay,
    targetPace,
    goalDist,
    distUnit,
    goalType
  });
  axios.patch(`/goals/goal/${goalID}`, body, config).then(res => {
    dispatch({
      type: EDIT_GOAL,
      payload: res.data
    });
  });
};


export const finishGoal = goalObj => dispatch => {
  const { userGoalsID, goalID, actualPace, mood, goalIndx } = goalObj;
  const body = JSON.stringify({ userGoalsID, actualPace, mood });
  axios.patch(`/goals/goal/complete/${goalID}`, body, config).then(res => {
    dispatch({
      type: FINISH_GOAL,
      payload: res.data,
      goalIndx
    });
  });
};


export const addRun = runObj => (dispatch, getState) => {
  const {
    userGoalsID,
    goalID,
    name,
    targetPace,
    date,
    distance,
    distUnit,
    type
  } = runObj;
  const body = JSON.stringify({
    userGoalsID,
    goalID,
    name,
    targetPace,
    date,
    distance,
    distUnit,
    type
  });
  axios.post("/goals/addrun", body, tokenConfig(getState)).then(res => {
    dispatch({
      type: ADD_RUN,
      payload: res.data,
      goalID
    });
  });
};

export const delRun = idObj => (dispatch, getState) => {
  const { userGoalsID, goalID, runID } = idObj;
  axios
    .delete(
      `/goals/${userGoalsID}/goal/${goalID}/runs/${runID}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: DEL_RUN,
        goalID,
        runID
      });
    });
};

export const editRun = runObj => (dispatch, getState) => {
  const {
    userGoalsID,
    goalID,
    id,
    name,
    targetPace,
    actualPace,
    date,
    distance,
    type,
    completed,
    mood,
    runIndx
  } = runObj;
  const body = JSON.stringify({
    userGoalsID,
    goalID,
    name,
    targetPace,
    actualPace,
    date,
    distance,
    type,
    completed,
    mood
  });
  axios.patch(`/goals/runs/${id}`, body, tokenConfig(getState)).then(res => {
    dispatch({
      type: EDIT_RUN,
      payload: res.data,
      goalID,
      runIndx
    });
  });
};

export const finishRun = runObj => (dispatch, getState) => {
  const { userGoalsID, goalID, runID, mood, actualPace, runIndx } = runObj;
  const goal = getState().goals.Goals.find(goal => goal._id === goalID);
  const run = goal.runs[runIndx];
  let progress = progressCalc(
    goal.targetPace,
    goal.goalDist,
    actualPace,
    run.distance
  );
  if (progress < parseInt(goal.progress)) {
    progress = goal.progress;
  }
  const body = JSON.stringify({
    userGoalsID,
    goalID,
    mood,
    actualPace,
    progress
  });
  axios
    .patch(`/goals/run/complete/${runID}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FINISH_RUN,
        payload: res.data,
        goalID,
        runIndx,
        progress
      });
    });
};

export const progressCalc = (goalPace, goalDist, runPace, runDist) => {
  goalPace = goalPace.split(":");
  goalPace = parseInt(goalPace[0] * 60) + parseInt(goalPace[1]);
  runPace = runPace.split(":");
  runPace = parseInt(runPace[0] * 60) + parseInt(runPace[1]);
  const distRatio = runDist / goalDist;
  const paceWeight = 1 - (runPace - goalPace) / goalPace;
  const result = distRatio * 0.5 + paceWeight * distRatio * 0.5;
  return (100 * result).toFixed(2);
};

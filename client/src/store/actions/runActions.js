import {GET_GOALS, ADD_GOAL, EDIT_GOAL, DEL_GOAL, ADD_RUN, DEL_RUN} from './types';
// dispatch is for async
export const addRun = (runObj) => {
    return {
        type: ADD_RUN,
        payload:runObj
    }
}

export const delRun = (id) => {
    return {
        type: DEL_RUN,
        payload: id
    }
}

export const addGoal = goalObj => {
    return {
        type: ADD_GOAL,
        payload: goalObj
    }
}

export const editRun = (runObj) => dispatch =>{
    dispatch(delRun(runObj.id));
    dispatch(addRun(runObj));
}

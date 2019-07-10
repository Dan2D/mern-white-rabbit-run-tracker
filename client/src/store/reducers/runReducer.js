import {ADD_RUN, DEL_RUN, ADD_GOAL} from '../actions/types';

let initialState = {};

const defaultReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_RUN:
            return {
                ...state,
                currentGoal: {
                    ...state.currentGoal,
                    runs: [
                        ...state.currentGoal.runs,
                        action.payload
                    ]
                }
            }
        case DEL_RUN:
            return {
                ...state,
                currentGoal: {
                    ...state.currentGoal,
                    runs: state.currentGoal.runs.filter(run => run.id !== action.payload)
                }
            }
        case ADD_GOAL:
            return {
                ...state,
                currentGoal: action.payload
            }
        default:
            return state;
    }
}

export default defaultReducer;

console.log("REDUCER CALLED")
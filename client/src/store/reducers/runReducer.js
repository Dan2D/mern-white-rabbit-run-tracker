import {ADD_RUN, DEL_RUN, EDIT_RUN, FINISH_RUN, ADD_GOAL, DEL_GOAL, GET_GOALS, EDIT_GOAL, FINISH_GOAL} from '../actions/types';
import produce from 'immer';

let initialState = {};

const runReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GOALS:
            return  action.payload;
        case ADD_RUN:
            return produce(state, draft => { 
             draft.Goals.find(goal => goal._id === action.goalID).runs.unshift(action.payload)
            })
            case DEL_RUN:
                return produce(state, draft => {
                    let goal = draft.Goals.find(goal => goal._id === action.goalID);
                    let runIndx = goal.runs.findIndex(run => run._id === action.runID);
                    goal.runs.splice(runIndx, 1)
                })
            case EDIT_RUN:
                return produce(state, draft => {
                    draft.Goals.find(goal => goal._id === action.goalID).runs[action.runIndx] = action.payload;
                })        
        case FINISH_RUN:
            return produce(state, draft => {
                draft.Goals.find(goal => goal._id === action.goalID).runs[action.runIndx] = action.payload
            })
         case ADD_GOAL:
            return {
                ...state,
                Goals: [action.payload, ...state.Goals]
            }
            case DEL_GOAL:
                return {
                    ...state,
                    Goals: state.Goals.filter(goal => goal._id !== action.payload)
                }
        case EDIT_GOAL:
            return {
                ...state,
                Goals: state.Goals.map(goal => {
                    if (goal._id === action.payload._id){
                        return action.payload
                    }
                    return goal
                })
            }
        case FINISH_GOAL:
            return produce(state, draft => {
                draft.Goals[action.goalIndx] = action.payload
            })
        default:
            return state;
    }
}

export default runReducer;

console.log("REDUCER CALLED")
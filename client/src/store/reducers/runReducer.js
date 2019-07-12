import {ADD_RUN, DEL_RUN, EDIT_RUN, ADD_GOAL, DEL_GOAL, GET_GOALS, EDIT_GOAL} from '../actions/types';

let initialState = {};

const defaultReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GOALS:
            return  action.payload;
              
        case ADD_RUN:
        case DEL_RUN:
        case EDIT_RUN:
            console.log(state, "RUN REDUCER")
            return {
                ...state,
                Goals: state.Goals.map(goal => {
                    if (goal._id === action.payload._id){
                        return {
                            ...goal,
                            runs: [...action.payload.runs]
                        }
                    }
                    return goal;
                })
            }
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
        default:
            return state;
    }
}

export default defaultReducer;

console.log("REDUCER CALLED")
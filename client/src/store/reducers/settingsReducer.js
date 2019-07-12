import {CHANGE_UNITS} from '../actions/types';

const initialState={
    distUnits: "mi"
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_UNITS:
            return {
                
            }
        default: 
        return state;
    }
}

export default settingsReducer;
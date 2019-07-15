import {REGISTER_SETTINGS, UPDATE_SETTINGS, GET_SETTINGS} from '../actions/types';

const initialState={
    distUnits: "mi"
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_SETTINGS:
        case GET_SETTINGS:
        case UPDATE_SETTINGS:
            console.log(action.payload)
            return action.payload;
        default: 
        return state;
    }
}

export default settingsReducer;
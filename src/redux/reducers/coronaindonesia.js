import * as types from '../../constants/initialType';
import initialState from '../../constants/initialState';

let data = {
    loading: false,
    coronaindonesialist: initialState.coronaindonesialist
};

const coronaindonesiaReducer = (state = data, action) => {
    switch (action.type) {
        case types.CLEAR_CORONAINDONESIALIST:
            state = {
                ...state,
                loading: true,
                coronaindonesialist: []
            }
            break;
        case types.LOAD_CORONAINDONESIALIST:
            state = {
                ...state,
                loading: false,
                coronaindonesialist: action.payload
            }            
            break;

        default:
    }

    return state;
}

export default coronaindonesiaReducer;

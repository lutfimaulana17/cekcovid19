import * as types from '../../constants/initialType';
import initialState from '../../constants/initialState';

let data = {
    loading: false,
    coronaprovinsilist: initialState.coronaprovinsilist
};

const coronaprovinsiReducer = (state = data, action) => {
    switch (action.type) {
        case types.CLEAR_CORONAPROVINSILIST:
            state = {
                ...state,
                loading: true,
                coronaprovinsilist: []
            }
            break;
        case types.LOAD_CORONAPROVINSILIST:
            state = {
                ...state,
                loading: false,
                coronaprovinsilist: action.payload
            }            
            break;

        default:
    }

    return state;
}

export default coronaprovinsiReducer;

import {combineReducers}from "redux";
import {routerReducer} from 'react-router-redux';
import {reducer as awaitReducer} from 'redux-await';

import coronaindonesia from './coronaindonesia';
import coronaprovinsi from './coronaprovinsi';

const rootReducer = combineReducers({
    await: awaitReducer, routing: routerReducer, 
    coronaindonesia, coronaprovinsi
})

export default rootReducer;
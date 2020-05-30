import {AWAIT_MARKER} from 'redux-await';

import * as types from '../../constants/initialType';
import * as ihttp from '../../constants/initialHttp';
import HttpApi from '../../api';

export const clearCoronaIndonesiaList = (dt) => async (dispatch) => {
    dispatch({type: types.CLEAR_CORONAINDONESIALIST, AWAIT_MARKER, payload: dt});
}

export function loadCoronaIndonesiaListHttp(dt, wait, timer) {
    let idx = (dt.id) ? '/'+dt.id : ''; delete dt.id;
    return HttpApi.callGet(ihttp.URI_CORONAINDONESIALIST+idx, dt).then(dt => {
        if (wait) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(dt);
                }, timer);
            });
        } else {
            return dt;
        }
    }).catch(err => {
        throw(err);
    });
}

export const loadCoronaIndonesiaList = (dt, wait, timer = 1000, state) => async (dispatch) => {
    let data = await loadCoronaIndonesiaListHttp(dt, wait, timer);
    dispatch({type: types.LOAD_CORONAINDONESIALIST, AWAIT_MARKER, payload: data});

    return data;
}
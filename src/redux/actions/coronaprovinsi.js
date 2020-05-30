import {AWAIT_MARKER} from 'redux-await';

import * as types from '../../constants/initialType';
import * as ihttp from '../../constants/initialHttp';
import HttpApi from '../../api';

export const clearCoronaProvinsiList = (dt) => async (dispatch) => {
    dispatch({type: types.CLEAR_CORONAPROVINSILIST, AWAIT_MARKER, payload: dt});
}

export function loadCoronaProvinsiListHttp(dt, wait, timer) {
    let idx = (dt.id) ? '/'+dt.id : ''; delete dt.id;
    return HttpApi.callGet(ihttp.URI_CORONAPROVINSILIST+idx, dt).then(dt => {
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

export const loadCoronaProvinsiList = (dt, wait, timer = 1000, state) => async (dispatch) => {
    let data = await loadCoronaProvinsiListHttp(dt, wait, timer);
    dispatch({type: types.LOAD_CORONAPROVINSILIST, AWAIT_MARKER, payload: data});

    return data;
}
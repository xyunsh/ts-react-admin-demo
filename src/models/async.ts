import { callApi } from '@services/api';
import { keyObject } from '@utils';

export default {
    namespace: 'async',

    state: {

    },

    effects: {
        *load({ payload }, { call, put }) {
            const { code, data } = yield call(callApi, payload);

            yield put({ type: 'save', payload: { data, api: payload } });
        }
    },

    reducers: {
        save( state, { payload : { data, api } }) {
            const { dataApi, params } = api;

            const key = params ? `${dataApi}.${keyObject(params)}` : dataApi;

            return {
                ...state,
                [key]: data
            };
        }
    },
};

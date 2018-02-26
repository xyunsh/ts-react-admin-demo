import { routerRedux } from 'dva/router';
import { accountLogin, mobileLogin } from '../services/auth';
import { isResultOK } from './result';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true, });
      const resp = yield call(accountLogin, payload);

      if(isResultOK(resp)){
        yield put({ type: 'changeLoginStatus', payload: resp, });
        yield put(routerRedux.push('/'));
      }
      yield put({ type: 'changeSubmitting', payload: false, });
    },

    *mobileSubmit(_, { call, put }) {
      yield put({ type: 'changeSubmitting', payload: true, });
      const response = yield call(mobileLogin);
      yield put({ type: 'changeLoginStatus', payload: response, });
      yield put({ type: 'changeSubmitting', payload: false, });
    },

    *logout(_, { put }) {
      yield put({ type: 'changeLoginStatus', payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },

    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};

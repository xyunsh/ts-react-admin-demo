import { menuApi } from '@services/admin';
import { ADMIN_MENU } from './index';
import { isResultOK } from '@utils/result';

export default {
    namespace :  ADMIN_MENU,
    state: {
        data: []
    },
    effects: {
        *load( _, { call, put, } ) {
            const result = yield call(menuApi.loadAll);
          
            if( isResultOK(result) ){
                const { data } = result;

                yield put({ type: 'loadSuccess', payload: { data }, });
            }        
        }

        *saveLevels({ payload }, { call, put } ){

            console.log('call saveLevels');
            
            const result = yield call(menuApi.saveLevels, payload.data);

            yield put({ type: 'loadSuccess', payload });
        }
    
        *submit({ payload }, { call, put }) {
            const { values, callback } = payload;
                
            const { code, data } = yield call(menuApi.modify, values);
            
            yield put({ type: 'saveEntity', payload: { ...values, ...data} });
            
            if(callback){
                callback();
            }
        }
    },
    reducers: {
        loadSuccess( state,  { payload: { data, ...payload } } ) { 
            return { ...state, data, };
        }
    
        saveEntity({ byId, allIds, ...state}, { payload: { id, ...values } }){
            return {
                ...state,
                byId:{
                    ...byId,
                    [id]:{
                        ...byId[id],
                        ...values
                        id,
                    }
                },
                allIds: allIds.indexOf(id) >= 0 ? allIds: [ id, ...allIds ]
            }
        }
    }
};

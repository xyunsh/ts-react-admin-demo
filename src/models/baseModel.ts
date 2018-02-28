import { isResultOK } from './result';

export const effects = ({query, modify}) =>  ({
    *queryPages( { payload }, { call, put, } ) {

        const { pagination: { current = 1, pageSize }, filters, sorter } = payload;

        const params = {
            offset : (current - 1) *pageSize,
            limit: pageSize, 
            ...filters
        };

        if (sorter.field) {
            params.order = `${sorter.field} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`;
        }
      
        const {__code, __data:{ data = [], total}} = yield call(query, params);
        
        yield put({ type: 'savePages', payload: { data, pagination: { total, pageSize }, filters }, });
        
    }

    *submit({ payload }, { call, put }) {
        const { values, callback } = payload;
            
        const {__code, } = yield call(modify, values);
        
        yield put({ type: 'saveEntity', payload: values });
        
        if(callback){
            callback();
        }
    }
});

export const reducers = {
    savePages( state,  { payload: { data, ...payload } } ) { 
        
        const byId = {};

        const allIds = [];

        data.map(o => {
            byId[o.id] = o;
            allIds.push(o.id);
        });

        return { ...state, ...payload, byId, allIds, };
    }

    saveEntity(state, { payload: { id, ...values } }){
        return {
            ...state,
            byId:{
                ...state.byId,
                [id]:{
                    ...state.byId[id],
                    ...values
                }
            }
        }
    }
};

export const initialState = {
    byId: {},
    allIds: [],
    pagination: {
        pageSize: 20
    },
    filters: {

    },
    sorter: {

    }
};

export default ( namespace: string, dataApi, state = {...initialState}, defaultReducers = reducers ) => ({
    namespace,
    state,
    effects: effects(dataApi),
    reducers: defaultReducers
});

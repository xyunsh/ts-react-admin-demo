import { callApi } from './api';

export const brandApi = {
    query : async function ( params: object ) {
        return callApi('biz/brand/query', params);
    },

    modify: async function( params: object ) {
        return callApi('biz/brand/modify', params);
    }
};

export const enterpriseApi = {
    query: async function( params: object ) {
        return callApi('biz/enterprise/query', params);
    }
};

export const storeApi = {
    query: async function( params: object ) {
        return callApi('biz/storeV2/query', params);
    }
};
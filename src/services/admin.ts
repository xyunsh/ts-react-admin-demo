import { callApi } from './api';

export const resourceApi = {
    query : async function ( params: object ) {
        return callApi('admin/resource/query', params);
    },

    modify: async function( params: object ) {
        return callApi('admin/resource/modify', params);
    }
};
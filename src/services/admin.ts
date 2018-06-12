import { callApi, baseApi } from './api';

export const resourceApi = {
    ...baseApi('resource')
};

export const menuApi = {
    ...baseApi('menu'),

    loadAll: async function ( params: object ) {
		return callApi(`admin/menu/loadTreeSource`, params);
    },
    
    saveLevels: async function( params: object ){
        return callApi(`admin/menu/saveLevels`, params);
    }
};

export const privilegeApi = {
    ...baseApi('privilege')
};

export const roleApi = {
    ...baseApi('role')
};

export const userApi = {
    ...baseApi('user')
}

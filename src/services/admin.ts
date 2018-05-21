import { callApi, baseApi } from './api';

export const resourceApi = {
    ...baseApi('resource')
};

export const menuApi = {
    ...baseApi('menu')
};

export const privilegeApi = {
    ...baseApi('privilege')
};

export const roleApi = {
    ...baseApi('role')
};


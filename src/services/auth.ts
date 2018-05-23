import { callApi } from './api';

export async function accountLogin(params) {
    return callApi('auth/login', params);
}
   
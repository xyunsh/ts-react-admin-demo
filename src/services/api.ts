import request from '../utils/request';

export async function callApi(path: string, params: object){
	const url = `http://localhost:3000/${path}`;
	return request(url, { 
			body: params,
			method: 'POST',
		} 
	);
}

export const baseApi = (resource: string) => ({
	query : async function ( params: object ) {
		return callApi(`admin/${resource}/query`, params);
	},

	modify: async function( params: object ) {
		return callApi(`admin/${resource}/modify`, params);
	}
});



export async function queryProjectNotice() {
	return request('/api/project/notice');
}

export async function queryActivities() {
	return request('/api/activities');
}

export async function queryRule(params) {
	return request(`/api/rule?${JSON.stringify(params)}`);
}

export async function removeRule(params) {
	return request('/api/rule', {
		method: 'POST',
		body: {
			...params,
			method: 'delete',
		},
	});
}

export async function addRule(params) {
	return request('/api/rule', {
		method: 'POST',
		body: {
			...params,
			method: 'post',
		},
	});
}

export async function fakeSubmitForm(params) {
	return request('/api/forms', {
		method: 'POST',
		body: params,
	});
}

export async function fakeChartData() {
	return request('/api/fake_chart_data');
}

export async function queryTags() {
	return request('/api/tags');
}

export async function queryBasicProfile() {
	return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
	return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
	return request(`/api/fake_list?${JSON.stringify(params)}`);
}

export async function fakeAccountLogin(params) {
	return request('/api/login/account', {
		method: 'POST',
		body: params,
	});
}

export async function fakeRegister(params) {
	return request('/api/register', {
		method: 'POST',
		body: params,
	});
}

export async function queryNotices() {
	return request('/api/notices');
}

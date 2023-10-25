import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:99'
});
export const useApi = () => ({
	validateToken: async (vtoken) => {
		api.defaults.headers.common['Authorization'] = vtoken
			? `Bearer ${vtoken}`
			: '';
		const response = await api.post('/validate');
		api.defaults.headers.common['Authorization'] = response.data.token
			? `Bearer ${response.data.token}`
			: '';
		api.defaults.headers.common['id'] = response.data.id
			? response.data.id
			: -1;
		return response.data;
	},
	renewToken: async (vtoken, vid) => {
		api.defaults.headers.common['Authorization'] = vtoken
			? `Bearer ${vtoken}`
			: '';
		const response = await api.post('/renew', { id: vid });
		return response.data;
	},
	signin: async (vuser_, vpassword) => {
		const response = await api.post('/signin', {
			user: vuser_,
			password: vpassword
		});
		/*api.interceptors.request.use(function (config) {
			config.headers.Authorization = response.data.token
				? `Bearer ${response.data.token}`
				: '';
			return config;
		});*/
		api.defaults.headers.common['Authorization'] = response.data.token
			? `Bearer ${response.data.token}`
			: '';
		api.defaults.headers.common['id'] = response.data.id
			? response.data.id
			: -1;
		return response.data;
	},
	signout: async () => {
		const response = await api.post('/signout', {
			id: api.defaults.headers.common['id']
		});
		/*api.interceptors.request.use(function (config) {
			config.headers.Authorization = '';
			return config;
		});*/
		api.defaults.headers.common['Authorization'] = '';
		return response.data;
	},
	userAdd: async (vuser_, vpassword, vpublisher_id) => {
		const response = await api.post('/user', {
			user: vuser_,
			password: vpassword,
			publisher_id: vpublisher_id
		});
		return response.data;
	},
	userEdi: async (vid, vuser_, vpassword, vpublisher_id) => {
		const response = await api.put('/user', {
			id: vid,
			user: vuser_,
			password: vpassword,
			publisher_id: vpublisher_id
		});
		return response.data;
	},
	userDel: async (vid) => {
		const response = await api.delete(`/user/${vid}`);
		return response.data;
	},
	userGet: async (fields, search, dt_ini, dt_fin, order, meaning, limit) => {
		const response = await api.post('/user/get', {
			fields: fields,
			search: search,
			dt_ini: dt_ini,
			dt_fin: dt_fin,
			order: order,
			meaning: meaning,
			limit: limit
		});
		return response.data;
	}
});

import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { useApi } from '../../hooks/useApi';
import { strNumber } from '../../globals/global';

export const AuthProvider = ({ children }) => {
	const [user_, setUser_] = useState(null);
	const api = useApi();
	const signin = async (vuser_, vpassword) => {
		const data = await api.signin(vuser_, vpassword);
		if (data && data.status_id && data.status_id == 1) {
			if (data.user && data.token) {
				setUser_({
					id: strNumber(data.id),
					user_: vuser_,
					password: vpassword
				});
				if (isNaN(Number(data.id))) {
					data.id = strNumber(data.id);
				}
				saveLocalStorage(data.token, data.id, data.user);
			}
		}
		return data;
	};
	const userAdd = async (vuser_, vpassword) => {
		let id = localStorage.getItem('id');
		id = strNumber(id);
		const data = await api.userAdd(vuser_, vpassword, id);
		return data;
	};
	const userEdi = async (vid, vuser_, vpassword) => {
		let id = localStorage.getItem('id');
		id = strNumber(id);
		const data = await api.userEdi(vid, vuser_, vpassword, id);
		return data;
	};
	const userDel = async (vid) => {
		vid = strNumber(vid);
		const data = await api.userDel(vid);
		return data;
	};
	const userGet = async (
		fields,
		search,
		dt_ini,
		dt_fin,
		order,
		meaning,
		limit
	) => {
		const data = await api.userGet(
			fields,
			search,
			dt_ini,
			dt_fin,
			order,
			meaning,
			limit
		);
		return data;
	};
	const signout = async () => {
		await api.signout();
		clearToken();
		setUser_(null);
	};
	const saveLocalStorage = (token, id, user) => {
		localStorage.setItem('authToken', token);
		localStorage.setItem('id', String(id));
		localStorage.setItem('user', user);
	};
	const clearToken = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('id');
	};
	const startToken = async () => {
		const validadeToken = async () => {
			try {
				const tk = localStorage.getItem('authToken');
				if (tk) {
					const data = await api.validateToken(tk);
					if (
						data &&
						data.status_id &&
						data.status_id == 1 &&
						data.user
					) {
						setUser_({
							id: data.id,
							user_: data.user
						});
						return true;
					}
				}
				return false;
			} catch (er) {
				return false;
			}
		};
		const renewToken = async () => {
			try {
				const tk = localStorage.getItem('authToken');
				let id = localStorage.getItem('id');
				if (tk) {
					id = strNumber(id);
					const data = await api.renewToken(tk, id);
					if (
						data &&
						data.status_id &&
						data.status_id == 1 &&
						data.user
					) {
						setTimeout(renewToken, 15000);
						return true;
					}
				}
				return false;
			} catch (er) {
				return false;
			}
		};
		let t = await validadeToken();
		t = await renewToken();
		return true;
	};
	return (
		<AuthContext.Provider
			value={{
				user_,
				signin,
				userAdd,
				userEdi,
				userDel,
				userGet,
				signout,
				startToken
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

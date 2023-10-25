import { useContext } from 'react';
import { Login } from '../../pages/Login';
import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }) => {
	const auth = useContext(AuthContext);
	if (!auth.user_) {
		return <Login />;
	} else {
		return children;
	}
};

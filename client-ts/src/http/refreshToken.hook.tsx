import { updateToken } from './httpHook';
import * as actions from '../actions';

export const refreshToken = async (dispatch) => {

	// alert('try to update token');
	const refToken = JSON.parse(localStorage.getItem('user_data')).refreshToken;
	// const dispatch = useDispatch();
	// console.log('refresh '+refreshToken);
	// console.log('auth '+JSON.parse(localStorage.getItem('user_data')).token);
	return updateToken(refToken).then(async _res => {
		// console.log(_res);
		const newUserData = (JSON.parse(localStorage.getItem('user_data')));
		newUserData.token = _res.token;
		dispatch(actions.setJWT(_res.token));
		// console.log('test '+token);
		localStorage.setItem('user_data', JSON.stringify(newUserData));
		window.M.toast({html: 'Token updated'});
		// console.log('recursia');
	});
};

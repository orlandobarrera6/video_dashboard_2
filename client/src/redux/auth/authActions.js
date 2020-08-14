// Using axios to make requests to the back end
import axios from 'axios';
import AuthActionTypes from './authTypes';

// Synchronous action creators
export const fetchUserRequest = () => ({
	type: AuthActionTypes.FETCH_USER_REQUEST,
});

export const fetchUserSucces = (userData) => ({
	type: AuthActionTypes.FETCH_USER_SUCCES,
	payload: userData,
});

export const fetchUserFailure = (error) => ({
	type: AuthActionTypes.FETCH_USER_FAILURE,
	payload: error,
});

export const logOutUser = () => ({
	type: AuthActionTypes.LOG_OUT_USER,
});

// Asynchronous action creators
export const fetchUser = () => async (dispatch) => {
	try {
		dispatch(fetchUserRequest());
		const res = await axios.get('/api/current_user');
		dispatch(fetchUserSucces(res.data));
	} catch (error) {
		dispatch(fetchUserFailure(error));
	}
};

export const logOut = () => async (dispatch) => {
	try {
		await axios.get('/api/logout');
		dispatch(logOutUser());
	} catch (error) {
		console.log(error);
	}
};

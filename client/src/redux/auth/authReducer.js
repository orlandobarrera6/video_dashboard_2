import AuthActionTypes from './authTypes';

const INITIAL_STATE = {
	loading: false,
	user: null,
	error: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AuthActionTypes.FETCH_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case AuthActionTypes.FETCH_USER_SUCCES:
			return {
				...state,
				loading: false,
				user: action.payload || false,
			};
		case AuthActionTypes.FETCH_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case AuthActionTypes.LOG_OUT_USER:
			return {
				...state,
				user: false,
			};
		default:
			return state;
	}
};

export default authReducer;

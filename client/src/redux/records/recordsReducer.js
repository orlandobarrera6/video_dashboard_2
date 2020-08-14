import RecordsActionTypes from './recordsTypes';

const INITIAL_STATE = {
	records: [],
	currentRecord: {},
};

const recordsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RecordsActionTypes.SET_RECORDS:
			return {
				...state,
				records: action.payload,
			};
		case RecordsActionTypes.CLEAR_RECORD:
			return {
				records: [],
			};
		default:
			return state;
	}
};

export default recordsReducer;

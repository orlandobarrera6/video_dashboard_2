import axios from 'axios';
import RecordsActionTypes from './recordsTypes';

// Synchronous action creator
export const setRecords = (records) => ({
	type: RecordsActionTypes.SET_RECORDS,
	payload: records,
});

export const clearRecords = () => ({
	type: RecordsActionTypes.CLEAR_RECORDS,
});

// Asynchronous action creators
export const fetchRecords = () => async (dispatch) => {
	try {
		const records = await axios.get('/api/records');

		dispatch(setRecords(records.data));
	} catch (error) {
		console.log(error);
	}
};

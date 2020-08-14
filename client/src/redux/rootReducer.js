import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/authReducer';
import recordsReducer from './records/recordsReducer';

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['auth', 'records'],
};

const rootReducer = combineReducers({
	auth: authReducer,
	records: recordsReducer,
});

export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;

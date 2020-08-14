import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './rootReducer';

// Middleware are just functions that that receive the actions, do something
// with them and pass them into the root-reducer.

const middlewares = [reduxThunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistStore };

// export default { store };

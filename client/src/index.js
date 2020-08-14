import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import axios from 'axios';

import App from './App';

import {
	createMuiTheme,
	MuiThemeProvider,
	StylesProvider,
} from '@material-ui/core/styles';

// To test API calls from the browser's console.
window.axios = axios;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#003087',
		},
		secondary: {
			main: '#FFFFFF',
		} /*
    error: {
      main: ''
    },
    warning: {
      main: ''
    },
    info: {
      main: ''
    },
    success: {
      main: ''
    }*/,
	},
});

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<MuiThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					<PersistGate persistor={persistor}>
						<App />
					</PersistGate>
				</StylesProvider>
			</MuiThemeProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

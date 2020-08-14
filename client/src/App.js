import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './redux/auth/authActions';
import { fetchRecords } from './redux/records/recordsActions';

import { CssBaseline } from '@material-ui/core';

import Navbar from '../src/components/Navbar/Navbar';
import Landing from './views/Landing';
import Routes from './routes/Routes';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchRecords();
	}
	render() {
		const { user } = this.props;
		return (
			<React.Fragment>
				<CssBaseline />
				<Navbar />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) =>
							user ? <Redirect to='/user' {...props} /> : <Landing {...props} />
						}
					/>
					<Route
						path='/user'
						render={(props) =>
							user ? <Routes {...props} /> : <Redirect to='/' />
						}
					/>
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	fetchUser: () => dispatch(fetchUser()),
	fetchRecords: () => dispatch(fetchRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
	CssBaseline,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import TableChartIcon from '@material-ui/icons/TableChart';

import Gallery from '../views/Gallery';
import ManageContent from '../views/ManageContent';
import Welcome from '../views/Welcome';
import AddVideo from '../views/AddVideo';
import EditVideo from '../views/EditVideo';
import DeleteVideo from '../views/DeleteVideo';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		// overflow: 'hidden',
		// position: 'fixed',
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		position: 'relative',
	},
	drawerPaper: {
		width: drawerWidth,
		zIndex: 100,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		marginTop: '50px',
		marginLeft: '50px',
		marginBotton: '50px',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
		minWidth: 0, // So the Typography noWrap works
	},
	main: {
		flexGrow: 1,
	},
	toolbar: theme.mixins.toolbar,
});

const history = require('history').createBrowserHistory();

const sidebarItems = [
	{
		name: 'Home',
		icon: <HomeIcon />,
		url: '',
	},
	{
		name: 'Gallery',
		icon: <AppsIcon />,
		url: '/gallery',
	},
	{
		name: 'Manage Recordings',
		icon: <TableChartIcon />,
		url: '/manage_content',
	},
];

const Routes = (props) => {
	const { classes } = props;
	const { match } = props;
	const { user } = props;

	return (
		<div>
			<CssBaseline />
			<Router history={history}>
				<div className={classes.root}>
					<Drawer
						variant='permanent'
						className={classes.drawer}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.drawerContainer}>
							<div className={classes.toolbar} />
							<List>
								{sidebarItems.map((item, index) => (
									<ListItem
										button
										key={index}
										component={Link}
										to={`${match.path}${item.url}`}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.name} />
									</ListItem>
								))}
							</List>
						</div>
					</Drawer>

					<div className={classes.main}>
						<div className={classes.content}>
							<Route
								exact
								// path={`${match.path}`}
								path='/user'
								render={(props) =>
									user ? <Welcome {...props} /> : <Redirect to='/' />
								}
							/>
							<Route
								path={`${match.path}/gallery`}
								render={(props) =>
									user ? <Gallery {...props} /> : <Redirect to='/' />
								}
							/>
							<Route
								exact
								path={`${match.path}/manage_content`}
								render={(props) =>
									user ? <ManageContent {...props} /> : <Redirect to='/' />
								}
							/>
							<Route
								path={`${match.path}/manage_content/add_video`}
								render={(props) =>
									user ? <AddVideo {...props} /> : <Redirect to='/' />
								}
							/>
							<Route
								path={`${match.path}/manage_content/:id/edit_video`}
								render={(props) =>
									user ? <EditVideo {...props} /> : <Redirect to='/' />
								}
							/>
							<Route
								path={`${match.path}/manage_content/:id/delete_video`}
								render={(props) =>
									user ? <DeleteVideo {...props} /> : <Redirect to='/' />
								}
							/>
						</div>
					</div>
				</div>
			</Router>
		</div>
	);
};

Routes.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	user: state.auth.user,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Routes);

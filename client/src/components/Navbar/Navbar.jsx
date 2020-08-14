import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { logOut } from '../../redux/auth/authActions';

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 14,
	},
}))(Tooltip);

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1s infinite ease-in-out',
			border: '1.2px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(4)',
			opacity: 0,
		},
	},
}))(Badge);

const styles = (theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		appBarr: {
			zIndex: theme.zIndex.drawer + 1,
		},
		flex: {
			flex: 1,
		},
		menuButton: {
			marginLeft: -12,
			marginRight: 20,
		},
		toolbar: theme.mixins.toolbar,
	});

class Navbar extends React.Component {
	render() {
		const { classes } = this.props;
		const { user } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position='fixed'>
					<Toolbar>
						<Typography
							variant={user ? 'h6' : 'h4'}
							color='inherit'
							className={classes.flex}
						>
							{user ? 'Dejero Dashboard' : 'Dejero'}
						</Typography>

						{user ? (
							<Grid
								container
								direction='row'
								justify='flex-end'
								alignItems='center'
								spacing={3}
							>
								<Grid item>
									<LightTooltip title={`${user.firstName} ${user.lastName}`}>
										<StyledBadge
											overlap='circle'
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											variant='dot'
										>
											<Avatar alt={user.firstName} src={user.picture} />
										</StyledBadge>
									</LightTooltip>
								</Grid>
								<Grid item>
									<Button color='inherit' onClick={() => this.props.logOut()}>
										Log out
									</Button>
								</Grid>
							</Grid>
						) : null}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => dispatch(logOut()),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(Navbar);

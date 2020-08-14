import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Welcome = ({ history, user }) => {
	return (
		<div>
			<h1>Welcome back {user.firstName}!</h1>
			<h2>- Go to Gallery to view your 9 most recent recordings.</h2>

			<h2>
				- Go to "Manage Recordings" to upload, download, edit or delete your
				video files in the file system.
			</h2>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default compose(connect(mapStateToProps))(Welcome);

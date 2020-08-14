import React from 'react';
import Button from '@material-ui/core/Button';

const Landing = ({ history }) => {
	return (
		<div style={{ marginTop: '100px', marginLeft: '100px' }}>
			<h1>Sing in to your Dejero video manager dashboard!</h1>

			<Button variant='contained' href='/auth/google'>
				Sign in with Google
			</Button>
		</div>
	);
};

export default Landing;

const passport = require('passport');

module.exports = (app) => {
	// When the "/auth/google" route of my API server gets hit then
	// passport will handle the authentication process using the
	// authenticate function using the strategy called google.
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);
	// Once the user has selected his/her google account it will send him back
	// to "/auth/google/callback" as especified in the passport.js file
	// inside the services folder with the passport google strategy. And thereafter
	// I am redirecting the user to the '/user' relative url.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/user');
		}
	);

	// This is to test that our passport.js functions serialize and deserialize
	// give us the user model instance inside req, and also useful to identify
	// logged in users in our app.
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	// This route handler will allow us to logout the current user, the passport
	// library when deserializing the user session's cookie adds the ability
	// to log out the current user via req.logout()
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
};

module.exports = (req, res, next) => {
	// This is custom made middleware that I am using to check if the
	// user is longged in. If the user is not logged in this middleware
	// function breaks the course of loggic and returns a 401 error
	// message.
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}
	// if the request does have an authenticated user associated then
	// go to the next middleware in the chain or back to the route handler
	// itself.
	next();
};

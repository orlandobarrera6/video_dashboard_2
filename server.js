// I will use an Express/Node.js server for my API.
const express = require('express');
// I will use the mongoose library to communicate
// with a MongoDB database hosted on the cloud.
const mongoose = require('mongoose');
// Out of the box express does not manage cookies,
// so I will use the library below to enable cookies
// in Express and pass them on to passport.
const cookieSession = require('cookie-session');
const passport = require('passport');
// Bring in the necessary mongoose model classes
// that allow me to have access the collections
// with records in my MongoDB database hosted on
// the cloud.
require('./models/User');
require('./models/Record');
// The authentification route handlers of my  API
// make use of the passport library and the google
// strategy to authenticate users with google.
require('./services/passport');
// Authentification route handlers of my API live
// here.
const authRoutes = require('./routes/authRoutes');
// The video record route handlers of my API live
// here.
const recordRoutes = require('./routes/recordRoutes');
// Useful library for parsing JSON and other things
const bodyParser = require('body-parser');
// Secret keys that will not be pushed to the public
// repo.
const keys = require('./config/keys');
// Connect with my cloud hosted MongoDB database.
mongoose.connect(keys.mongoURI);
// Initialize the Express API server.
const app = express();
// The line below is added so that everytime an HTTP request
// with a body this bodyParser middleware will parse the
// body and assign it to the req.body of the incoming
// request's object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Enabling express to use cookies with a max amount
// of time it can be valid for and a security key.
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
		keys: [keys.cookieKey],
	})
);

// app.use(async (req, res, next) => {
// 	try {
// 		await next();
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

// Now I tell passport to use cookies to handle
// authentication
app.use(passport.initialize());
app.use(passport.session());
// The authentification route handlers are written
// in Express, and so I pass the server to the file
// were the route handlers live.
authRoutes(app);
recordRoutes(app);
// Declaring my default API's port to be 5000.
const port = process.env.PORT || 5000;

// Dummy API route handlers to test front-end/backend
// connection.

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// The deprecation errors are issues with mongoose

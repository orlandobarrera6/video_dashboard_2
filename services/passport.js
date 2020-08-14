// I will use passport to do user authentification with
// Google
const passport = require('passport');
// In order to use passport to do google user oauth I will
// use the bellow "strategy".
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

// We pull the model class out of mongoose by only giving it
// the model class name
const User = mongoose.model('users');

// secret keys that will not be pushed to the repo
const keys = require('../config/keys');

// Here I am creating a new instance of the google passport
// strategy and inside the constructor

// I need to get a ClientID and a ClientSecret with google
// to allow for oauth to go through. Google needs to know from
// where are the oauth requests coming from and so we need to register
// our project with google. You need to create a project for this:
// http://console.developer.google.com/
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({ googleID: profile.id });

				if (existingUser) {
					return done(null, existingUser);
				}

				const user = await new User({
					googleID: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					email: profile.emails[0].value,
					picture: profile.photos[0].value,
				}).save();

				done(null, user);
			} catch (error) {
				console.log(error);
			}
		}
	)
);

// Declaring some functions that will allow us to tell
// passport to keep track of our user session via cookies

// Getting cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Getting user from cookie
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	firstName: String,
	lastName: String,
	email: String,
	picture: String,
});

// Here I am telling MongoDB via mongoose that I want to
// create a Collection called users with the passed in
// Schema. Remember that mongoose model classes point us
// to collections in our MongoDB database
mongoose.model('users', userSchema);

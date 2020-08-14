// A model class created with mongoose represents an
// entire MongoDB Collection. That is a model class
// is used to acess a single Collection inside of
// MongoDB.

const mongoose = require('mongoose');
const { Schema } = mongoose;
// const fileSchema = require('./File');

const recordSchema = new Schema({
	title: String,
	description: String,
	tags: [String],
	videoKey: String,
	dateUploaded: Date,
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('records', recordSchema);

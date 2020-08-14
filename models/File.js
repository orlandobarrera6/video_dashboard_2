const moongoose = require('mongoose');
const { Schema } = moongoose;

const fileSchema = new Schema({
	thumbnail: String,
	video: String,
});

module.exports = fileSchema;

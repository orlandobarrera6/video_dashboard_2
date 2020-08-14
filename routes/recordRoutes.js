const mongoose = require('mongoose');
// This middlerware checks that the is an authenticated user
// associated with the request.
const requireLogin = require('../middlewares/requireLogin');
const Record = mongoose.model('records');
const AWS = require('aws-sdk');
const keys = require('../config/keys');

const { v4: uuid } = require('uuid');

// s3 stuff setup
const s3 = new AWS.S3({
	accessKeyId: keys.awsAccessKeyID,
	secretAccessKey: keys.awsSecretAccessKey,
	region: keys.awsRegion,
	params: { Bucket: 'dejero-video-dashboard' },
});

module.exports = (app) => {
	// Recall you can pass any number of functions to a request
	// and they will be executed inline one after the other.
	app.post('/api/records', requireLogin, async (req, res) => {
		try {
			const { title, tags, description, videoKey } = req.body;

			const record = await new Record({
				title,
				description,
				tags,
				videoKey,
				dateUploaded: Date.now(),
				_user: req.user.id,
			}).save();

			res.send(record);
		} catch (error) {
			// 400 status sent back to the user maybe something was filled out wrong
			res.status(400).send(error);
		}
	});

	app.post('/api/records/upload', requireLogin, async (req, res) => {
		const { fileType } = req.body;

		const request = {
			Key: uuid(),
			ContentType: fileType,
		};

		const url = await s3.getSignedUrlPromise('putObject', request);

		const response = { url, key: request.Key };

		res.json(response);
	});

	app.get('/api/records/:id/download', requireLogin, async (req, res) => {
		const record = await Record.findOne({
			_user: req.user.id,
			_id: req.params.id,
		});

		res.setHeader(
			'Content-Disposition',
			`attachment; filename=${record.videoKey}.mp4`
		);

		res.setHeader('Content-Type', 'video/mp4');

		s3.getObject({ Key: record.videoKey }).createReadStream().pipe(res);
	});

	//
	app.get('/api/records/:id', requireLogin, async (req, res) => {
		const record = await Record.findOne({
			_user: req.user.id,
			_id: req.params.id,
		});

		res.send(record);
	});

	//
	app.get('/api/records', requireLogin, async (req, res) => {
		const records = await Record.find({ _user: req.user.id });

		res.send(records);
	});

	//
	app.delete('/api/records/:id', requireLogin, async (req, res) => {
		await Record.deleteOne({
			_user: req.user.id,
			_id: req.params.id,
		});

		res.sendStatus(200);
	});

	//
	app.patch('/api/records/:id', requireLogin, async (req, res) => {
		const { title, description, tags } = req.body;

		const update = { title, description, tags };
		const options = { new: true, omitUndefined: true };

		const response = await Record.findOneAndUpdate(
			{
				_user: req.user.id,
				_id: req.params.id,
			},
			update,
			options
		);

		res.json(response);
	});
};

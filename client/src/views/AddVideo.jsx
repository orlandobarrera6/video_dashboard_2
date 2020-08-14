import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import { fetchRecords } from '../redux/records/recordsActions';

const styles = (theme) =>
	createStyles({
		root: {
			width: '70vw',
		},
		paper: {
			margin: '30px',
			padding: '20px 20px 20px 20px',
		},
		formEntry: {
			margin: theme.spacing(3),
		},
	});

const tags = [
	'Weather',
	'Entertainment',
	'Sports',
	'Bussiness and Finance',
	'Health',
	'Home',
	'Global Events',
];

class AddVideo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			tags: [],
			file: '',
		};
	}

	handleTitleChange = (event) => {
		const { value } = event.target;
		this.setState({ title: value });
	};

	handleDescriptionChange = (event) => {
		const { value } = event.target;
		this.setState({ description: value });
	};

	handleFileChange = (event) => {
		this.setState({ file: event.target.files[0] });
	};

	handleSubmit = async (event) => {
		try {
			const { title, description, file, tags } = this.state;
			alert(`Uploading file named:${this.state.title}, might take sometime.`);

			const { data } = await axios.post('/api/records/upload', {
				fileType: this.state.file.type,
			});

			const options = { headers: { 'Content-Type': file.type } };

			await axios.put(data.url, file, options);

			const body = { title, description, tags, videoKey: data.key };

			await axios.post('/api/records', body);

			await this.props.fetchRecords();

			this.setState({ title: '', description: '', tags: [] });
		} catch (error) {
			console.log(error);
		}
	};

	onTagsChange = (event, value) => {
		this.setState({ tags: value }, () => {
			console.log(this.state.tags);
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={3}>
					<div className={classes.formEntry}>
						<h1>Add new video</h1>
					</div>
					<div className={classes.formEntry}>
						<TextField
							value={this.state.title}
							onChange={this.handleTitleChange}
							id='title'
							label='Title'
							variant='outlined'
							fullWidth
						/>
					</div>
					<div className={classes.formEntry}>
						<TextField
							value={this.state.description}
							onChange={this.handleDescriptionChange}
							id='description'
							label='Description'
							variant='outlined'
							fullWidth
							multiline
							rows={4}
						/>
					</div>
					<div className={classes.formEntry}>
						<Autocomplete
							options={tags}
							multiple
							id='tags'
							getOptionLabel={(option) => option}
							value={this.state.tags}
							onChange={this.onTagsChange}
							renderInput={(params) => (
								<TextField {...params} label='Tags/Labels' variant='outlined' />
							)}
						/>
					</div>
					<div className={classes.formEntry}>
						<input
							type='file'
							onChange={this.handleFileChange}
							accept='video/*'
						/>
					</div>
					<div className={classes.formEntry}>
						<Grid container spacing={3}>
							<Grid item>
								<Button
									variant='contained'
									color='default'
									onClick={() => {
										this.props.history.push(`/user/manage_content`);
									}}
								>
									Cancel
								</Button>
							</Grid>

							<Grid item>
								<Button
									variant='contained'
									color='primary'
									onClick={async () => {
										await this.handleSubmit();
										this.props.history.push(`/user/manage_content`);
									}}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</div>
		);
	}
}

const mapDistpatchToProps = (dispatch) => ({
	fetchRecords: () => dispatch(fetchRecords()),
});

export default compose(
	withStyles(styles),
	connect(null, mapDistpatchToProps)
)(AddVideo);

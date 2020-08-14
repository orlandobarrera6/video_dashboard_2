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

class EditVideo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			tags: [],
			...props.record,
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

	handleSubmit = async (event) => {
		try {
			const { title, description, tags, _id } = this.state;
			alert(`Updating file named:${this.state.title}, might take sometime.`);

			const body = { title, description, tags };

			await axios.patch(`/api/records/${_id}`, body);

			await this.props.fetchRecords();

			this.setState({ title: '', description: '', tags: [] });
		} catch (error) {
			console.log(error);
		}
	};

	onTagsChange = (event, value) => {
		this.setState({ tags: value });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={3}>
					<div className={classes.formEntry}>
						<h1>Edit video</h1>
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

const mapStateToProps = (state, ownProps) => ({
	record: state.records.records.find((item) => {
		return item._id === ownProps.match.params.id;
	}),
	currentRecord: state.records.currentRecord,
});

const mapDistpatchToProps = (dispatch) => ({
	fetchRecords: () => dispatch(fetchRecords()),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDistpatchToProps)
)(EditVideo);

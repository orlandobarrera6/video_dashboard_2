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

const tags2 = [
	'Weather',
	'Entertainment',
	'Sports',
	'Bussiness and Finance',
	'Health',
	'Home',
	'Global Events',
];

class DeleteVideo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			tags: [],
			...props.record,
		};
	}

	handleDelete = async (event) => {
		try {
			const { _id } = this.state;

			await axios.delete(`/api/records/${_id}`);

			await this.props.fetchRecords();
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={3}>
					<div className={classes.formEntry}>
						<h1>Are you sure you want to delete this file?</h1>
					</div>
					<div className={classes.formEntry}>
						<TextField
							disabled
							value={this.state.title}
							id='title'
							label='Title'
							variant='outlined'
							fullWidth
						/>
					</div>

					<div className={classes.formEntry}>
						<TextField
							disabled
							value={this.state.description}
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
							disabled
							options={tags2}
							multiple
							id='tags'
							getOptionLabel={(option) => option}
							value={this.state.tags}
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
										await this.handleDelete();
										this.props.history.push(`/user/manage_content`);
									}}
								>
									Delete
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
});

const mapDistpatchToProps = (dispatch) => ({
	fetchRecords: () => dispatch(fetchRecords()),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDistpatchToProps)
)(DeleteVideo);

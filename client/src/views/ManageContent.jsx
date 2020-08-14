import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';

import MUIDataTable from 'mui-datatables';

import { fetchRecords } from '../redux/records/recordsActions';

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))(Tooltip);

const styles = (theme) =>
	createStyles({
		root: {
			// backgroundColor: theme.palette.background.paper,
			width: '70vw',
			position: 'relative',
			minHeight: 200,
		},
		paper: {
			margin: '30px',
			padding: '20px 20px 80px 20px',
		},
		title: {
			margin: theme.spacing(3),
		},
		table: {
			margin: '50px 20px 0 20px',
		},
		fab: {
			position: 'absolute',
			top: theme.spacing(5),
			right: theme.spacing(10),
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	});

class ManageContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deleting: false,
			denseTable: true,
			data: [],
			columns: [
				{
					name: 'title',
					label: 'Title',
					options: {
						setCellHeaderProps: (value) => {
							return { style: { fontWeight: 'bold', color: '#4A4A4A' } };
						},
					},
				},
				{
					name: 'description',
					label: 'Description',
					options: {
						setCellHeaderProps: (value) => {
							return { style: { fontWeight: 'bold', color: '#4A4A4A' } };
						},
					},
				},
				{
					name: 'dateUploaded',
					label: 'Upload date',
					options: {
						setCellHeaderProps: (value) => {
							return { style: { fontWeight: 'bold', color: '#4A4A4A' } };
						},
					},
				},
				{
					name: 'tags',
					label: 'Tags/Labels',
					options: {
						filter: true,
						filterType: 'multiselect',
						customBodyRenderLite: (dataIndex) => {
							let value = this.state.data[dataIndex].tags;
							return value.map((val, key) => {
								return <Chip label={val} key={key} />;
							});
						},
						setCellHeaderProps: (value) => {
							return { style: { fontWeight: 'bold', color: '#4A4A4A' } };
						},
					},
				},
				{
					name: 'actions',
					label: 'Actions',
					options: {
						filter: false,
						viewColumns: false,
						setCellHeaderProps: (value) => {
							return {
								style: { fontWeight: 'bold', color: '#4A4A4A' },
							};
						},
						customBodyRender: (value, { tableData, rowIndex }, updateValue) => {
							const currentRowData = tableData[rowIndex];

							return (
								<FormGroup row>
									<LightTooltip title='Delete' placement='left'>
										<IconButton
											aria-label='delete'
											href={`/user/manage_content/${currentRowData._id}/delete_video`}
										>
											<DeleteIcon />
										</IconButton>
									</LightTooltip>

									<LightTooltip title='Edit' placement='left'>
										<IconButton
											aria-label='edit'
											href={`/user/manage_content/${currentRowData._id}/edit_video`}
										>
											<EditIcon />
										</IconButton>
									</LightTooltip>

									<LightTooltip title='Download' placement='left'>
										<IconButton
											aria-label='download'
											component='a'
											href={`/api/records/${currentRowData._id}/download`}
										>
											<GetAppIcon />
										</IconButton>
									</LightTooltip>
								</FormGroup>
							);
						},
					},
				},
			],
		};
	}

	componentDidMount() {
		this.props.fetchRecords();

		this.setState({ data: this.props.records });
	}

	render() {
		const { denseTable, data, columns } = this.state;
		const { classes } = this.props;

		const options = {
			download: false,
			filter: true,
			print: false,
			responsive: 'simple',
			selectableRows: 'single',
			selectableRowsHideCheckboxes: true,
			rowsPerPageOptions: [5, 10, 25, 50, 100],
			setTableProps: () => {
				return {
					padding: denseTable ? 'none' : 'default',
					size: denseTable ? 'small' : 'medium',
				};
			},
		};
		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={3}>
					<div className={classes.title}>
						<h1>Manage Content</h1>
					</div>
					<LightTooltip title='Add New Video' placement='left'>
						<Fab
							className={classes.fab}
							color='primary'
							href='manage_content/add_video'
						>
							<AddIcon />
						</Fab>
					</LightTooltip>
					<div className={classes.table}>
						<MUIDataTable options={options} data={data} columns={columns} />
					</div>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	records: state.records.records,
});

const mapDispatchToProps = (dispatch) => ({
	fetchRecords: () => dispatch(fetchRecords()),
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(ManageContent);

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

// import UsersList from './../../components/Users/UsersList';
// import UserSpec from './../../components/Users/UserSpec';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchUsersRequest, actDeleteUserRequest } from './../../actions/index';
import { Redirect } from 'react-router-dom';
import * as config from './../../constants/config';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class UsersPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			loggedOut: false,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
		this.onDelete = this.onDelete.bind(this);
	}

	shouldComponentUpdate(nextprops){
		return true;
	}

	componentWillUpdate(nextprops){
		if(nextprops.authentication.loggedOut){
			this.setState({
				isLogin: nextprops.authentication.loggedIn,
				loggedOut: nextprops.authentication.loggedOut
			});	
		}
	}
	
	componentWillMount(){
		this.props.getUsers();
	}

	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteUser(id)
		}
	}

	renderAddButton(){
		// if( this.state.isLogin === true){
			return <Link to="/users/add" className="btn btn-primary"><i className="fa fa-plus"></i></Link>;
		// }
		// return null;
	 }

	render() {
		
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.users !== null) {
			var {users} = this.props.users;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

				<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
				
					{this.renderAddButton()}
					<br/> <br/>
					{ this.showUser(users) }

				</div>
			</CSSTransitionGroup>
		);
	} // end render

	showUser (users) {
		var result = null;
		if( users ){
			if ( users && typeof users !== 'undefined' && users.length > 0) {
				return <ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										console.log('action')
										return (<Link to={`users/1/edit`}>	</Link>);
									}
								}

				  			})}
							data={users}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: 'Infomation',
									columns: [
										{
											Header: "#",
											id: "row",
											maxWidth: 50,
											filterable: false,
											Cell: (row) => {
												return <div>{row.index+1}</div>;
											}
										},
										{
											Header: "Username",
											id: "username",
											accessor: d => d.username,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["username"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`users/${row.original.id}/edit`}>
													  	{row.original.username}
													</Link>
												</div>;
											}
										},
										{
											Header: "Firstname",
											id: "firstname",
											accessor: d => d.firstname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["firstname"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`users/${row.original.id}/edit`}>
													  	{row.original.firstname}
													</Link>
												</div>;
											}
										},
										{
											Header: "Lastname",
											id: "lastname",
											accessor: d => d.lastname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["lastname"] }),
											filterAll: true
										},
										{
											Header: "Email",
											id: "email",
											accessor: d => d.email,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["email"] }),
											filterAll: true
										},
										{
											Header: "Address",
											id: "address",
											accessor: d => d.address,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["address"] }),
											filterAll: true
										},
										{
											Header: "Phone",
											id: "phone",
											accessor: d => d.phone,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true
										},
										{
											Header: "Gender",
											id: "gender",
											accessor: d => d.gender,
											Cell: ({ value }) => (value === config.GENDER_MALE	 ? "Male" : "Female"),
											filterMethod: (filter, row) => {
												if (filter.value === "all") {
												  	return true;
												}
												if (filter.value === String(config.GENDER_MALE)) {
													return row[filter.id] === config.GENDER_MALE;
												}
												if (filter.value === String(config.GENDER_FEMALE)) {
													return row[filter.id] === config.GENDER_FEMALE;
												}

											  },
											  Filter: ({ filter, onChange }) =>
												<select
												  className="sel-role"
												  onChange={event => onChange(event.target.value)}
												  style={{ width: "100%" }}
												  value={filter ? filter.value : "all"}
												>
												  <option value="all">Show All</option>
												  <option value="0">Male</option>
												  <option value="1">Female</option>
												</select>
										},
										{
											Header: "Role",
											id: "role_id",
											accessor: d => d.role_id,
											Cell: ({ value }) => {
												if(value === 14){
													return 'Administrator'
												} else if(value === 15) {
													return 'Manager'
												} else {
													return 'Member'
												}
											},
											filterMethod: (filter, row) => {
												console.log(row[filter.id]);
												if (filter.value === "all") {
												  	return true;
												}
												if (filter.value === String(config.ADMINISTRATOR)) {
													return row[filter.id] === config.ADMINISTRATOR;
												}
												if (filter.value === String(config.MANAGER)) {
													return row[filter.id] === config.MANAGER;
												}
												if (filter.value === String(config.MEMBER)) {
													return row[filter.id] === config.MEMBER;
												}
												
												return row[filter.id] < 21;
											  },
											  Filter: ({ filter, onChange }) =>
												<select
												  className="sel-role"
												  onChange={event => onChange(event.target.value)}
												  style={{ width: "100%" }}
												  value={filter ? filter.value : "all"}
												>
												  <option value="all">Show All</option>
												  <option value="14">Administrator</option>
												  <option value="15">Manager</option>
												  <option value="16">Member</option>

												</select>
										},
										{
											Header: "Active",
											id: "is_active",
											accessor: d => d.is_active,
											Cell: ({ value }) => (value === config.ACTIVED ? "Active" : ""),
											filterMethod: (filter, row) => {
												if (filter.value === "all") {
												  	return true;
												}
												if (filter.value === String(config.ACTIVED)) {
													return row[filter.id] === config.ACTIVED;
												}
												if (filter.value === String(config.DEACTIVED)) {
													return row[filter.id] === config.DEACTIVED;
												}

											  },
											  Filter: ({ filter, onChange }) =>
												<select
												  className="sel-role"
												  onChange={event => onChange(event.target.value)}
												  style={{ width: "100%" }}
												  value={filter ? filter.value : "all"}
												>
												  <option value="all">Show All</option>
												  <option value="1">ACTIVE</option>
												  <option value="0">NO ACTIVE</option>
												

												</select>
										},
										{
											Header: "Action",
											filterable: false,
											Cell: row => (
												<div>
												  	{/* <Link to={`users/${row.original.id}/edit`} className="btn btn-success margin-right-10">
													  	Edit
													</Link> */}
													<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(row.original.id)}><i className="fa fa-trash"></i></button>
												</div>
											)
										}
									]
								}
						]}
						defaultSorted={[
							{
							  id: "row",
							  desc: true
							}
						  ]}
						defaultPageSize={10}  
						className="-striped -highlight"
					/>
			}
		}
		return result;
	}
	
}

const mapStateToProps = state => {
	return {
		authentication: state.authentication,
		users: state.users
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getUsers : () => {
			dispatch(actFetchUsersRequest());
		},
		onDeleteUser : (id) => {
			dispatch(actDeleteUserRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchUsersRequest, actDeleteUserRequest } from './../../actions/index';
import { Redirect } from 'react-router-dom';
import * as config from './../../constants/config';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
// import callApi from './../../utils/apiCaller';

class UsersPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			product_categories: [],
			loggedOut: false,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
		this.onDelete = this.onDelete.bind(this);
	}

	// componentDidMount(){
	// 	callApi('GET', config.CATEGORY_URL, null).then(res => {
	// 		this.setState({
	// 			product_categories: res.data.data
	// 		});
	// 	});
	// 	// var {match} = this.props;
	// 	// if(match) {
	// 	// 	var id = match.params.id;
			
	// 	// 	// callApi('GET', config.SERVICE_URL + "/" + id, null).then(res => {
	// 	// 	// 	var data = res.data.data;
	// 	// 	// 	this.setState({
	// 	// 	// 		id: data.id,
	// 	// 	// 		product_category_id: data.product_category_id ? data.product_category_id : '',
	// 	// 	// 		title: data.title ? data.title : '',
	// 	// 	// 		desc: data.desc ? data.desc : ''
	// 	// 	// 	});
	// 	// 	// });
			
	// 	// }
		
	// }

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
		
		Swal({
            title: 'Are you sure?',
            text: "Are you sure you wish to delete this item?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.value) {
                this.props.onDeleteUser(id)
            }
        })
	}

	showRole = ( key ) => {
		var jobs = null;
		switch (key) {
			case 14:
				jobs = 'Administrator';
				break;
			case 15:
				jobs = 'Quản lý';
				break;
			case 16:
				jobs = 'Bác sỹ';
				break;
			case 33:
				jobs = 'Trợ lý';
				break;
			default:
				jobs = 'Lễ tân';
				break;
		}
		return jobs;
	}

	renderAddButton(){
		// if( this.state.isLogin === true){
			return <Link to="/users/add"><Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary"> Add </Button>	</Link>;
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
				<div className="grid simple">
					<div className="grid-body no-border">
						<Link to="/" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<Link to="/role" className="margin-bottom20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Phân quyền
							</Button>
						</Link>
					
						<Link to="/users/add" className="float-right margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới nhân viên
							</Button>					
						</Link>
						<div className="clearfix"></div><br/>
								
						{ this.showUser(users) }

					</div>
				</div>
				
				
			</CSSTransitionGroup>
		);
	} // end render

	showUser (users) {
		var result = null;
		if( users ){
			if ( users && typeof users !== 'undefined' && users.length > 0) {
				return <ReactTable
							// getTdProps={( column ) => ({
							// 	onClick: e => {
							// 		if(column.Header !== 'Action'){
							// 			console.log('action')
							// 			return (edit/<Link to={`users/1`}>	</Link>);
							// 		}
							// 	}

				  			// })}
							data={users}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: 'Thông tin nhân viên',
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
											Header: "Họ",
											id: "firstname",
											accessor: d => d.firstname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["firstname"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`users/edit/${row.original.id}`}>
													  	{row.original.firstname}
													</Link>
												</div>;
											}
										},
										{
											Header: "Tên",
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
											Header: "Địa chỉ",
											id: "address",
											accessor: d => d.address,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["address"] }),
											filterAll: true
										},
										{
											Header: "Số điện thoại",
											id: "phone",
											accessor: d => d.phone,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true
										},
										{
											Header: "Giới tính",
											id: "gender",
											accessor: d => d.gender,
											Cell: ({ value }) => (value === config.GENDER_MALE	 ? "Nữ" : "Nam"),
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
												  <option value="all">Tất cả</option>
												  <option value="0">Nữ</option>
												  <option value="1">Nam</option>
												</select>
										},
										{
											Header: "Vai trò",
											id: "role_id",
											accessor: d => d.role_id,
											Cell: ({ value }) => {
												return this.showRole(value)
											},
											filterMethod: (filter, row) => {
												var data = true;
												// console.log(row[filter.id]);
												switch (filter.value) {
													case "all":
														data = true;
														break;
													case String(config.ADMINISTRATOR):
														data = row[filter.id] === config.ADMINISTRATOR;
														break;
													case String(config.MANAGER):
														data = row[filter.id] === config.MANAGER;
														break;
													case String(config.MEMBER):
														data = row[filter.id] === config.MEMBER;
														break;
													case String(config.ASSISTANT):
														data = row[filter.id] === config.ASSISTANT;
														break;
													default:
														data = row[filter.id] === config.RECRPTIONIST;
														break;
												}
												return data;
											},
											Filter: ({ filter, onChange }) =>
												<select
												  className="sel-role"
												  onChange={event => onChange(event.target.value)}
												  style={{ width: "100%" }}
												  value={filter ? filter.value : "all"}
												>
												  <option value="all">Tất cả</option>
												  <option value="14">Administrator</option>
												  <option value="15">Quản lý</option>
												  <option value="16">Bác sỹ</option>
												  <option value="33">Trợ lý</option>
												  <option value="34">Lễ tân</option>
												</select>
										},
										{
											Header: "Kích hoạt",
											id: "is_active",
											accessor: d => d.is_active,
											Cell: ({ value }) => (value === config.ACTIVED ? "Có" : ""),
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
												  <option value="all">Tất cả</option>
												  <option value="1">Có</option>
												  <option value="0">Không</option>
												

												</select>
										},
										{
											Header: "",
											filterable: false,
											Cell: row => (
												<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(row.original.id)}>
												<i className="material-icons">delete</i>
												</Button>
						
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

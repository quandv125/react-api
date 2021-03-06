import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCustomersRequest, actDeleteCustomerRequest } from '../../actions/index';
import * as config from '../../constants/config';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import ModalCalling from './../../components/Customers/ModalCalling';
import moment from 'moment';

class CustomersPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			note: '',
			loggedOut: false,
			open: false,
			isLogin: config.TOKEN.length > 10 ? true : false,
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
		}
		this.onDelete = this.onDelete.bind(this);
		
	}

	componentWillMount(){
		
		if(this.props.customers && this.props.customers.customers && this.props.customers.customers.length > 0){
			this.setState({
				customers: this.props.customers.customers
			});
		} else {
			console.log('initD');
			this.props.getCustomers();
		}
		
	}

	componentWillReceiveProps(nextprops){
		if(nextprops.authentication.loggedOut){
			this.setState({
				isLogin: nextprops.authentication.loggedIn,
				loggedOut: nextprops.authentication.loggedOut
			});	
		}
	}

	phone_format = (n) => {
		if(n && n !== ''){
			return  n.replace(/./g, function(c, i, a) {
				return i > 0 && c !== " " && (a.length - i) % 3 === 0 ? "" + c : c;
			});
		}
	};

	onDelete (id) {
		Swal({
            title: 'Bạn có chắn chắn muốn xóa',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
			confirmButtonText: 'Có',
			cancelButtonText: 'Không'
          }).then((result) => {
            if (result.value) {
                this.props.onDeleteCustomer(id)
            }
        })
	}

	render() {
		
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.customers !== null) {
			var {customers} = this.props.customers;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple">
					<div className="grid-body no-border">
						<Link to="/" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" size="small" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<Link to="/customers/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới khách hàng
							</Button>					
						</Link>
						<div className="clearfix"></div><br/>
							{this.showCustomerData(customers) }
					</div>
				</div>
				<ModalCalling />
				
			</CSSTransitionGroup>
		);
	} // end render

	showCustomerData = (customers) => {
		if(this.state.role_id === config.MANAGER  || this.state.role_id === config.ADMINISTRATOR) {
			return this.showUserforManager(customers) 
		} else {
			return this.showUser(customers)
		}
	}

	showUser (customers) {
		var result = null;
		if( customers ){
			if ( customers && typeof customers !== 'undefined' && customers.length > 0) {
				return <ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										// console.log('action')
										return (<Link to={`customers/1/edit`}>	</Link>);
									}
								}

				  			})}
							data={customers}
							noDataText="Không tìm thấy kết quả!"
							previousText= 'Trang trước'
							nextText= 'Trang tiếp'
							loadingText= 'Loading...'
							pageText= 'Trang'
							ofText= 'trong	'
							rowsText= 'Khách'
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: 'Thông tin khách hàng',
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
											Header: "Mã KH",
											id: "customer_id",
											width: 100,
											accessor: d => d.customer_id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_id"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{row.original.customerID}
													</Link>
												</div>;
											}
										},
										{
											Header: "Số điện thoại",
											id: "phone",
											accessor: d => d.phone,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{this.phone_format( row.original.phone )}
													</Link>
												</div>;
											}
										},
										
										{
											Header: "Tên khách hàng",
											id: "firstname",
											width: 250,
											accessor: d => d.firstname + d.lastname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["firstname"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{row.original.firstname + ' ' + row.original.lastname}
													</Link>
												</div>;
											}
										},
										
										{
											Header: "Email",
											id: "email",
											width: 100,
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
											Header: "Loại Dịch vụ",
											id: "service_name",
											accessor: d => d.service_name,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["service_name"] }),
											filterAll: true
										},
										{
											Header: "Ngày",
											id: "created_at",
											accessor: d =>  moment(d.created_at).format('DD/MM/YYYY HH:mm:ss'),
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
											filterAll: true
										},
										// {
										// 	Header: "Giới tính",
										// 	id: "gender",
										// 	width: 100,
										// 	accessor: d => d.gender,
										// 	Cell: ({ value }) => (value === config.GENDER_MALE	 ? (<span className="label label-warning">Nữ</span>) : (<span className="label label-primary">Nam</span>)),
										// 	filterMethod: (filter, row) => {
										// 		if (filter.value === "all") {
										// 		  	return true;
										// 		}
										// 		if (filter.value === String(config.GENDER_MALE)) {
										// 			return row[filter.id] === config.GENDER_MALE;
										// 		}
										// 		if (filter.value === String(config.GENDER_FEMALE)) {
										// 			return row[filter.id] === config.GENDER_FEMALE;
										// 		}

										// 	  },
										// 	  Filter: ({ filter, onChange }) =>
										// 		<select
										// 		  className="sel-role"
										// 		  onChange={event => onChange(event.target.value)}
										// 		  style={{ width: "100%" }}
										// 		  value={filter ? filter.value : "all"}
										// 		>
										// 		  <option value="all">Tất cả</option>
										// 		  <option value="0">Nữ</option>
										// 		  <option value="1">Nam</option>
										// 		</select>
										// },
										
									]
								}
						]}
						defaultSorted={[
							{
							  id: "row",
							//   desc: true
							}
						  ]}
						defaultPageSize={20}  
						className="-striped -highlight"
					/>
			}
		}
		return result;
	}

	showUserforManager (customers) {
		var result = null;
		if( customers ){
			if ( customers && typeof customers !== 'undefined' && customers.length > 0) {
				return <ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										// console.log('action')
										return (<Link to={`customers/1/edit`}>	</Link>);
									}
								}

				  			})}
							data={customers}
							noDataText="Không tìm thấy kết quả!"
							previousText= 'Trang trước'
							nextText= 'Trang tiếp'
							loadingText= 'Loading...'
							pageText= 'Trang'
							ofText= 'trong	'
							rowsText= 'Khách'
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: 'Thông tin khách hàng',
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
											Header: "Mã KH",
											id: "customerID",
											width: 100,
											accessor: d => d.customerID,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customerID"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{row.original.customerID}
													</Link>
												</div>;
											}
										},
										{
											Header: "Số điện thoại",
											id: "phone",
											accessor: d => d.phone,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{this.phone_format( row.original.phone )}
													</Link>
												</div>;
											}
										},
										
										{
											Header: "Tên khách hàng",
											id: "firstname",
											width: 250,
											accessor: d => d.firstname + d.lastname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["firstname"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/edit/${row.original.id}`}>
													  	{row.original.firstname + ' ' + row.original.lastname}
													</Link>
												</div>;
											}
										},
										
										{
											Header: "Email",
											id: "email",
											width: 100,
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
											Header: "Loại Dịch vụ",
											id: "service_name",
											accessor: d => d.service_name,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["service_name"] }),
											filterAll: true
										},
										{
											Header: "Ngày",
											id: "created_at",
											accessor: d => moment(d.created_at).format('DD/MM/YYYY HH:mm:ss'),
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
											filterAll: true
										},
										// {
										// 	Header: "Giới tính",
										// 	id: "gender",
										// 	width: 100,
										// 	accessor: d => d.gender,
										// 	Cell: ({ value }) => (value === config.GENDER_MALE	 ? (<span className="label label-warning">Nữ</span>) : (<span className="label label-primary">Nam</span>)),
										// 	filterMethod: (filter, row) => {
										// 		if (filter.value === "all") {
										// 		  	return true;
										// 		}
										// 		if (filter.value === String(config.GENDER_MALE)) {
										// 			return row[filter.id] === config.GENDER_MALE;
										// 		}
										// 		if (filter.value === String(config.GENDER_FEMALE)) {
										// 			return row[filter.id] === config.GENDER_FEMALE;
										// 		}

										// 	  },
										// 	  Filter: ({ filter, onChange }) =>
										// 		<select
										// 		  className="sel-role"
										// 		  onChange={event => onChange(event.target.value)}
										// 		  style={{ width: "100%" }}
										// 		  value={filter ? filter.value : "all"}
										// 		>
										// 		  <option value="all">Tất cả</option>
										// 		  <option value="0">Nữ</option>
										// 		  <option value="1">Nam</option>
										// 		</select>
										// },
										{
											Header: "",
											width: 80,
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
							//   desc: true
							}
						  ]}
						defaultPageSize={20}  
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
		customers: state.customers
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getCustomers : () => {
			dispatch(actFetchCustomersRequest());
		},
		onDeleteCustomer : (id) => {
			dispatch(actDeleteCustomerRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCustomersRequest, actDeleteCustomerRequest } from '../../actions/index';
import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class CustomersPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			loggedOut: false,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillMount(){
		this.props.getCustomers();
	}

	componentWillReceiveProps(nextprops){
		if(nextprops.authentication.loggedOut){
			this.setState({
				isLogin: nextprops.authentication.loggedIn,
				loggedOut: nextprops.authentication.loggedOut
			});	
		}
	}
	
	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteCustomer(id)
		}
	}

	renderAddButton(){
		// if( this.state.isLogin === true){
			return <Link to="/customers/add" className="btn btn-primary"><i className="fa fa-plus"></i></Link>;
		// }
		// return null;
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

				<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
				
					{this.renderAddButton()}
					<br/> <br/>
					{ this.showUser(customers) }

				</div>
			</CSSTransitionGroup>
		);
	} // end render

	showUser (customers) {
		var result = null;
		if( customers ){
			if ( customers && typeof customers !== 'undefined' && customers.length > 0) {
				return <ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										console.log('action')
										return (<Link to={`customers/1/edit`}>	</Link>);
									}
								}

				  			})}
							data={customers}
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
											Header: "Phone",
											id: "phone",
											accessor: d => d.phone,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/${row.original.id}/edit`}>
													  	{row.original.phone}
													</Link>
												</div>;
											}
										},
										
										{
											Header: "Name",
											id: "firstname",
											accessor: d => d.firstname + d.lastname,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["firstname"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`customers/${row.original.id}/edit`}>
													  	{row.original.firstname + ' ' + row.original.lastname}
													</Link>
												</div>;
											}
										},
										// {
										// 	Header: "Lastname",
										// 	id: "lastname",
										// 	accessor: d => d.lastname,
										// 	filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["lastname"] }),
										// 	filterAll: true
										// },
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
											Header: "Action",
											filterable: false,
											Cell: row => (
												<div>
												  	{/* <Link to={`customers/${row.original.id}/edit`} className="btn btn-success margin-right-10">
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

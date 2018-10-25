import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchSmsRequest, actDeleteSmsRequest } from '../../actions/index';
import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class SmsPage extends Component {
	
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
		this.props.getSms();
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
			this.props.onDeleteSms(id)
		}
	}

	renderAddButton(){
		// if( this.state.isLogin === true){
			return <Link to="/sms/add" className="btn btn-primary"><i className="fa fa-plus"></i></Link>;
		// }
		// return null;
	 }

	render() {
		
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.sms !== null) {
			var {sms} = this.props.sms;
		}
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

				<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
				
					{this.renderAddButton()}
					<br/> <br/>
					{ this.showUser(sms) }

				</div>
			</CSSTransitionGroup>
		);
	} // end render

	showUser (sms) {
		var result = null;
		if( sms ){
			if ( sms && typeof sms !== 'undefined' && sms.length > 0) {
				return <ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										console.log('action')
										return (<Link to={`sms/1/edit`}>	</Link>);
									}
								}

				  			})}
							data={sms}
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
											Header: "transaction_id",
											id: "transaction_id",
											accessor: d => d.transaction_id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["transaction_id"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`sms/${row.original.id}/edit`}>
													  	{row.original.transaction_id}
													</Link>
												</div>;
											}
										},
										{
											Header: "title",
											id: "title",
											accessor: d => d.title,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`sms/${row.original.id}/edit`}>
													  	{row.original.title}
													</Link>
												</div>;
											}
										},
										{
											Header: "type",
											id: "type",
											accessor: d => d.type,
											Cell: ({ value }) => (value === String(config.TYPE_YES)	 ? "Yes" : "No"),
											filterMethod: (filter, row) => {
												if (filter.value === "all") {
												  	return true;
												}
												if (filter.value === String(config.TYPE_YES)) {
													
													return row[filter.id] === String(config.TYPE_YES);
												}
												if (filter.value === String(config.TYPE_NO)) {
													return row[filter.id] === String(config.TYPE_NO);
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
												  <option value="1">Yes</option>
												  <option value="0">No</option>
												</select>
										},	
										{
											Header: "Customer",
											id: "customer_id",
											accessor: d => d.customer_id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_id"] }),
											filterAll: true
										},
										{
											Header: "User",
											id: "user_id",
											accessor: d => d.user_id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["user_id"] }),
											filterAll: true
										},
										{
											Header: "total",
											id: "total",
											accessor: d => d.total,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["total"] }),
											filterAll: true
										},
										{
											Header: "created_at",
											id: "created_at",
											accessor: d => d.created_at,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
											filterAll: true
										},						
										{
											Header: "Action",
											filterable: false,
											Cell: row => (
												<div>
												  	{/* <Link to={`sms/${row.original.id}/edit`} className="btn btn-success margin-right-10">
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
		sms: state.sms
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getSms : () => {
			dispatch(actFetchSmsRequest());
		},
		onDeleteSms : (id) => {
			dispatch(actDeleteSmsRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsPage);

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCallingRequest, actDeleteCallingRequest } from '../../actions/index';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class CallingPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loggedOut: false,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillMount(){
		this.props.getCalling();
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
			this.props.onDeleteCalling(id)
		}
	}

	phone_format = (n) => {
		if(n && n !== ''){
			return "(+84) " + n.replace(/./g, function(c, i, a) {
				return i > 0 && c !== " " && (a.length - i) % 3 === 0 ? " " + c : c;
			});
		}
	};

	render() {
		var {loggedOut} = this.state;
		if(loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.calling !== null) {
			var {calling} = this.props;
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
						
						<div className="clearfix"></div><br/>
								
						{ this.showCalling(calling) }
					</div>
				</div>
				
				
			</CSSTransitionGroup>
		);
	} // end render

	success = () => {
		return (<span className="label label-success">SUCCESS</span>);
	}
	error = () => {
		return (<span className="label label-danger">ERROR</span>);
	}

	showCalling (calling) {
		var result = null;
		if( calling ){
			if ( calling && typeof calling !== 'undefined' && calling.length > 0) {
				return <ReactTable
							data={calling}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: "Thống kê số lượng cuộc gọi",
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
											Header: "STT",
											id: "id",
											width: 100,
											accessor: d => d.id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["id"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													<Link to={`calling/${row.original.id}/edit`}>
													  	{row.original.id}
													</Link>
												</div>;
											}
										},
										{
											Header: "Khách hàng",
											id: "customer",
											width: 150,
											accessor: d => d.customer,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer"] }),
											filterAll: true,
											Cell: (row) => {
												return <div className="text-left">
													{/* <Link to={`calling/${row.original.id}/edit`}> */}
													  	{row.original.customer}
													{/* </Link> */}
												</div>;
											}
										},
										// {
										// 	Header: "status",
										// 	id: "status",
										// 	width: 150,
										// 	accessor: d => d.status,
										// 	Cell: ({ value }) => (value === String(config.calling_STATUS_SUCCESS) ? this.success() : this.error() ),
										// 	filterMethod: (filter, row) => {
										// 		if (filter.value === "all") {
										// 		  	return true;
										// 		}
										// 		if (filter.value === String(config.calling_STATUS_SUCCESS)) {
													
										// 			return row[filter.id] === String(config.calling_STATUS_SUCCESS);
										// 		}
										// 		if (filter.value === String(config.calling_STATUS_ERROR)) {
										// 			return row[filter.id] === String(config.calling_STATUS_ERROR);
										// 		}

										// 	  },
										// 	  Filter: ({ filter, onChange }) =>
										// 		<select
										// 		  className="sel-role"
										// 		  onChange={event => onChange(event.target.value)}
										// 		  style={{ width: "100%" }}
										// 		  value={filter ? filter.value : "all"}
										// 		>
										// 		  <option value="all">Show All</option>
										// 		  <option value={config.calling_STATUS_SUCCESS}>SUCCESS</option>
										// 		  <option value={config.calling_STATUS_ERROR}>ERROR</option>
										// 		</select>
										// },	
										{
											Header: "Nhân viên",
											id: "customernumber",
											width: 150,
											accessor: d => d.customernumber,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customernumber"] }),
											filterAll: true
										},
										{
											Header: "Số điện thoại",
											id: "customernumber",
											width: 150,
											accessor: d => d.customernumber,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customernumber"] }),
											filterAll: true
										},
										{
											Header: "Chú thích",
											id: "note",
											width: 400,
											accessor: d => d.note,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["note"] }),
											filterAll: true
										},
										{
											Header: "Ngày/ giờ",
											id: "created_at",
											// width: 200,
											accessor: d => d.created_at,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
											filterAll: true
										},						
										// {
										// 	Header: "Action",
										// 	filterable: false,
										// 	Cell: row => (
										// 		<div>
										// 		  	{/* <Link to={`calling/${row.original.id}/edit`} className="btn btn-success margin-right-10">
										// 			  	Edit
										// 			</Link> */}
										// 			<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(row.original.id)}><i className="fa fa-trash"></i></button>
										// 		</div>
										// 	)
										// }
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
		calling: state.calling.Calling
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getCalling : () => {
			dispatch(actFetchCallingRequest());
		},
		onDeleteCalling : (id) => {
			dispatch(actDeleteCallingRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CallingPage);

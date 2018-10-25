import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchOrdersRequest, actDeleteOrderRequest } from '../../actions/index';

import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class OrderList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders : [],
			loggedOut: false
		}
	
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}
	
	componentWillMount(){
		this.props.getOrders();				
	}

	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteOrder(id)
		}
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.orders !== null) {
			var {orders} = this.props.orders;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

			<div className="OrderList col-lg-12 col-sm-12 col-xs-12 col-md-12">
			  	<Link to="/orders/add" className="btn btn-primary">
				  <i className="fa fa-plus"></i>
			 	</Link>
			 	<br/><br/>
			 		{this.showOrder(orders)}
				
			</div>
			</CSSTransitionGroup>
		);
	} // end render

	showOrder (orders) {
		var result = null;
		if ( orders && typeof orders !== 'undefined' && orders.length > 0) {
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`orders/1/edit`}>	</Link>);
								}
							}
						  })}
						data={orders}
						noDataText="Oh Not found!"
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
										filterable: false,
										maxWidth: 100,
										Cell: (row) => {
											return <div>{row.index+1}</div>;
										}
									},
									{
										Header: "sku",
										id: "sku",
										accessor: d => d.sku,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["sku"] }),
										filterAll: true,
										maxWidth: 100,
										Cell: (row) => {
											return <div>
												<Link to={`orders/${row.original.id}/edit`}>
													  {row.original.sku}
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
										maxWidth: 600,
										Cell: (row) => {
											return <div>
												<Link to={`orders/${row.original.id}/edit`}>
													  {row.original.title}
												</Link>
											</div>;
										}
									},
									{
										Header: "price",
										id: "price",
										accessor: d => d.price,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["price"] }),
										maxWidth: 250,
										filterAll: true
									},
									{
										Header: "unit",
										id: "unit",
										accessor: d => d.unit,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["unit"] }),
										maxWidth: 250,
										filterAll: true
									},
									{
										Header: "quantity",
										id: "quantity",
										accessor: d => d.quantity,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["quantity"] }),
										filterAll: true,
										maxWidth: 250,
									},
									{
										Header: "is_publish",
										id: "is_publish",
										accessor: d => d.is_publish,
										maxWidth: 200,
										Cell: ({ value }) => (value === config.IS_PUBLISH_YES ? "Yes" : "No"),
										filterMethod: (filter, row) => {
											if (filter.value === "all") {
												  return true;
											}
											if (filter.value === String(config.IS_PUBLISH_YES)) {
												return row[filter.id] === config.IS_PUBLISH_YES;
											}
											if (filter.value === String(config.IS_PUBLISH_NO)) {
												return row[filter.id] === config.IS_PUBLISH_NO;
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
										Header: "Action",
										filterable: false,
										maxWidth: 100,
										Cell: row => (
										
												<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(row.original.id)}><i className="fa fa-trash"></i></button>
										
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
					style={{
						height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
					  }}
					className="-striped -highlight"
				/>
		}
		
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getOrders : () => {
			dispatch(actFetchOrdersRequest());
		},
		onDeleteOrder : (id) => {
			dispatch(actDeleteOrderRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

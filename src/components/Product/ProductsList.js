import React, { Component } from 'react';
import * as config from './../../constants/config';
import { Link } from 'react-router-dom';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import callApi from './../../utils/apiCaller';
import Button from '@material-ui/core/Button';

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}

	componentWillMount(){
		callApi('GET', config.CATEGORY_URL, null).then(res => {
			if(res && res.data.status){
				this.setState({
					categories: res.data.data
				});
			}
		});
	}

	currency = (n, currency) => {
		if(n && n !== ''){
			return currency + n.replace(/./g, function(c, i, a) {
				return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
			});
		}
	};

	handleDelete (id) {
		this.props.onDelete(id);
	}

	showCategory = () => {
		const options = [];
		const {categories} = this.state;
		categories.map(data => options.push(
			<option key={data.id} value={data.title}>{data.title}</option>
		));
		return options;
	}

	render() {
		var products = this.props.children;
		return (
			<div>
				{products && typeof products !== 'undefined' && products.length > 0  ? (

					<ReactTable
							getTdProps={( column ) => ({
								onClick: e => {
									if(column.Header !== 'Action'){
										return (<Link to={`products/1/edit`}>	</Link>);
									}
								}
							})}
							data={products}
							noDataText="Oh Not found!"
							filterable
							defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: '',
									columns: [
										{
											Header: "#",
											id: "row",
											filterable: false,
											maxWidth: 50,
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
											maxWidth: 70,
											Cell: (row) => {
												return <div>
													<Link to={`products/edit/${row.original.id}`}>
														{row.original.sku}
													</Link>
												</div>;
											}
										},
										{
											Header: "Category",
											id: "category_title",
											accessor: d => d.category_title,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
											filterAll: true,
											maxWidth: 100,
											Cell: (row) => {
												return (<div className="text-left">
														{row.original.category_title}
												</div>)
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
												return <div className="text-left">
													<Link to={`products/edit/${row.original.id}`}>
														{row.original.title}
													</Link>
												</div>;
											}
										},
										{
											Header: "price",
											id: "price",
											accessor: d => this.currency(d.price, ''),
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["price"] }),
											maxWidth: 100,
											filterAll: true
										},
										{
											Header: "currency",
											id: "currency",
											accessor: d => d.currency,
											maxWidth: 100,
											Cell: ({ value }) => (value === 'VND' ? "VND" : "USD"),
											filterMethod: (filter, row) => {
												if (filter.value === "all") {
													return true;
												}
												if (filter.value === String('VND')) {
													return row[filter.id] === 'VND';
												}
												if (filter.value === 'USD') {
													return row[filter.id] === 'USD';
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
												<option value="VND">VND</option>
												<option value="USD">USD</option>
												</select>
										},
										{
											Header: "unit",
											id: "unit",
											accessor: d => d.unit,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["unit"] }),
											maxWidth: 100,
											filterAll: true
										},
										{
											Header: "quantity",
											id: "quantity",
											accessor: d => d.quantity,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["quantity"] }),
											filterAll: true,
											maxWidth: 100,
										},
										{
											Header: "is_publish",
											id: "is_publish",
											accessor: d => d.is_publish,
											maxWidth: 70,
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
											maxWidth: 70,
											Cell: row => (
											
												<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.handleDelete(row.original.id)}>
													<i className="material-icons">delete</i>
												</Button>
															
											)
										}
									]
								}
						]}
						defaultSorted={[{
							id: "row",
							desc: true
						}]}
						defaultPageSize={10}  
						style={{
							height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
						}}
						className="-striped -highlight"
					/> 
				) : ( // else 
					<div></div>
				)}
			</div>
			
		);
	}
}

export default ProductList;

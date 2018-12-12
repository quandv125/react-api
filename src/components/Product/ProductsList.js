import React, { Component } from 'react';
import * as config from './../../constants/config';
import { Link } from 'react-router-dom';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import callApi from './../../utils/apiCaller';
import Button from '@material-ui/core/Button';
import {findIndex} from 'lodash';
class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
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

	showCategory = (categories) => {
		const options = [];
		if(categories && categories.length > 0){
			categories.map(data => options.push(
				<option key={data.id} value={data.id}>{data.title}</option>
			));
		}
		return options;
	}

	render() {
		var products = this.props.children;
		
		return (
			<div>
				{products && typeof products !== 'undefined' && products.length > 0  ? (

					this.showProducts(products)				

				) : ( // else 
					<div></div>
				)}
			</div>
			
		);
	}

	showProducts = (products) => {
		
		if(this.state.role_id === config.MANAGER  || this.state.role_id === config.ADMINISTRATOR) {
			return this.showProductForManager(products)
		} else {
			return this.showProductsRep(products);
		}
	}

	showProductForManager = (products) => {
		return (<ReactTable
			getTdProps={( column ) => ({
				onClick: e => {
					if(column.Header !== 'Action'){
						return (<Link to={`products/1/edit`}>	</Link>);
					}
				}
			})}
			data={products}
			noDataText="Không tìm thấy kết quả!"
			previousText= 'Trang trước'
			nextText= 'Trang tiếp'
			loadingText= 'Loading...'
			pageText= 'Trang'
			ofText= 'trong	'
			rowsText= 'Dịch vụ'
			filterable
			defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
			columns={[
				{
					Header: 'Thông tin sản phẩm',
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
							Header: "Loại Dịch vụ",
							id: "category_id",
							accessor: d => d.category_id,
							maxWidth: 100,
							Cell: ({ value }) => {
								return this.showCategoryTitle(value)
							},
							filterMethod: (filter, row) => {
								if (filter.value === "all") {
									return true;
								}
								if (filter.value === '25') {
									return row[filter.id] === 25;
								}
								if (filter.value === '26') {
									return row[filter.id] === 26;
								}
								if (filter.value === '27') {
									return row[filter.id] === 27;
								}
								if (filter.value === '28') {
									return row[filter.id] === 28;
								}
								if (filter.value === '29') {
									return row[filter.id] === 29;
								}
								if (filter.value === '30') {
									return row[filter.id] === 30;
								}
								if (filter.value === '31') {
									return row[filter.id] === 31;
								}
								if (filter.value === '32') {
									return row[filter.id] === 32;
								}
								if (filter.value === '33') {
									return row[filter.id] === 33;
								}
								if (filter.value === '34') {
									return row[filter.id] === 34;
								}
								if (filter.value === '35') {
									return row[filter.id] === 35;
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
								{this.showCategory(this.state.categories)}
								</select>
						},
						{
							Header: "Danh mục dịch vụ",
							id: "service_title",
							accessor: d => d.service_title,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["service_title"] }),
							filterAll: true,
							maxWidth: 200,
							Cell: (row) => {
								return (<div className="text-left">
										{row.original.service_title}
								</div>)
							}
						},
						{
							Header: "Tên dịch vụ",
							id: "title",
							accessor: d => d.title,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
							filterAll: true,
							maxWidth: 400,
							Cell: (row) => {
								return <div className="text-left">
									<Link to={`products/edit/${row.original.id}`}>
										{row.original.title}
									</Link>
								</div>;
							}
						},
						{
							Header: "Giá",
							id: "price",
							accessor: d => this.currency(d.price, ''),
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["price"] }),
							maxWidth: 100,
							filterAll: true
						},
						{
							Header: "Loại tiền",
							id: "currency",
							accessor: d => d.currency,
							maxWidth: 80,
							Cell: ({ value }) => (value === 'USD' ? "USD" : "VND"),
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
								<option value="all">Tất cả</option>
								<option value="VND">VND</option>
								<option value="USD">USD</option>
								</select>
						},
						{
							Header: "Đơn vị",
							id: "unit",
							accessor: d => d.unit,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["unit"] }),
							maxWidth: 80,
							filterAll: true
						},
						{
							Header: "Số lượng",
							id: "quantity",
							accessor: d => d.quantity,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["quantity"] }),
							filterAll: true,
							maxWidth: 80,
						},
						{
							Header: "Thời gian",
							id: "time",
							accessor: d => d.time,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["time"] }),
							filterAll: true,
							maxWidth: 80,
						},
						{
							Header: "Kích hoạt",
							id: "is_publish",
							accessor: d => d.is_publish,
							maxWidth: 80,
							Cell: ({ value }) => (value === config.IS_PUBLISH_YES ? "Có" : "Không"),
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
									<option value="all">Tất cả</option>
									<option value="1">Có</option>
									<option value="0">Không</option>
								</select>
						},
						{
							Header: "",
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
			// desc: true
		}]}
		defaultPageSize={10}  
		style={{
			height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
		}}
		className="-striped -highlight"
	/> );
	}

	showProductsRep = (products) => {
		return (<ReactTable
			getTdProps={( column ) => ({
				onClick: e => {
					if(column.Header !== 'Action'){
						return (<Link to={`products/1/edit`}>	</Link>);
					}
				}
			})}
			data={products}
			noDataText="Không tìm thấy kết quả!"
			previousText= 'Trang trước'
			nextText= 'Trang tiếp'
			loadingText= 'Loading...'
			pageText= 'Trang'
			ofText= 'trong	'
			rowsText= 'Dịch vụ'
			filterable
			defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
			columns={[
				{
					Header: 'Thông tin sản phẩm',
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
							Header: "Loại Dịch vụ",
							id: "category_id",
							accessor: d => d.category_id,
							maxWidth: 100,
							Cell: ({ value }) => {
								return this.showCategoryTitle(value)
							},
							filterMethod: (filter, row) => {
								if (filter.value === "all") {
									return true;
								}
								if (filter.value === '25') {
									return row[filter.id] === 25;
								}
								if (filter.value === '26') {
									return row[filter.id] === 26;
								}
								if (filter.value === '27') {
									return row[filter.id] === 27;
								}
								if (filter.value === '28') {
									return row[filter.id] === 28;
								}
								if (filter.value === '29') {
									return row[filter.id] === 29;
								}
								if (filter.value === '30') {
									return row[filter.id] === 30;
								}
								if (filter.value === '31') {
									return row[filter.id] === 31;
								}
								if (filter.value === '32') {
									return row[filter.id] === 32;
								}
								if (filter.value === '33') {
									return row[filter.id] === 33;
								}
								if (filter.value === '34') {
									return row[filter.id] === 34;
								}
								if (filter.value === '35') {
									return row[filter.id] === 35;
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
								<option value="25">Nha Khoa</option>
								<option value="26">Laser</option>
								<option value="27">Spa</option>
								</select>
						},
						{
							Header: "Danh mục dịch vụ",
							id: "service_title",
							accessor: d => d.service_title,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["service_title"] }),
							filterAll: true,
							maxWidth: 200,
							Cell: (row) => {
								return (<div className="text-left">
										{row.original.service_title}
								</div>)
							}
						},
						{
							Header: "Tên dịch vụ",
							id: "title",
							accessor: d => d.title,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
							filterAll: true,
							maxWidth: 400,
							Cell: (row) => {
								return <div className="text-left">
									<Link to={`products/edit/${row.original.id}`}>
										{row.original.title}
									</Link>
								</div>;
							}
						},
						{
							Header: "Giá",
							id: "price",
							accessor: d => this.currency(d.price, ''),
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["price"] }),
							maxWidth: 100,
							filterAll: true
						},
						{
							Header: "Loại tiền",
							id: "currency",
							accessor: d => d.currency,
							maxWidth: 80,
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
								<option value="all">Tất cả</option>
								<option value="VND">VND</option>
								<option value="USD">USD</option>
								</select>
						},
						{
							Header: "Đơn vị",
							id: "unit",
							accessor: d => d.unit,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["unit"] }),
							maxWidth: 80,
							filterAll: true
						},
						{
							Header: "Số lượng",
							id: "quantity",
							accessor: d => d.quantity,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["quantity"] }),
							filterAll: true,
							maxWidth: 80,
						},
						{
							Header: "Thời gian",
							id: "time",
							accessor: d => d.time,
							filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["time"] }),
							filterAll: true,
							maxWidth: 80,
						},
						{
							Header: "Kích hoạt",
							id: "is_publish",
							accessor: d => d.is_publish,
							maxWidth: 80,
							Cell: ({ value }) => (value === config.IS_PUBLISH_YES ? "Có" : "Không"),
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
									<option value="all">Tất cả</option>
									<option value="1">Có</option>
									<option value="0">Không</option>
								</select>
						},
						
					]
				}
		]}
		defaultSorted={[{
			id: "row",
			// desc: true
		}]}
		defaultPageSize={10}  
		style={{
			height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
		}}
		className="-striped -highlight"
	/> );
	}

	showCategoryTitle = ( key ) => {
		var d = null;
		var {categories} = this.state;
		if(categories && categories.length > 0){
			var index = findIndex(categories, function(o) { return o.id === key; });
			d = categories[index].title;
		}
		return d;
	}
	
	
}

export default ProductList;

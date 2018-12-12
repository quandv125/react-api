import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCategoryRequest, actDeleteCategoryRequest } from '../../actions/index';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import { connectIO } from '../../socketIO/client';
import { ToastContainer, toast } from 'react-toastify';
class CategoryList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category : [],
			loggedOut: false,
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
			service_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).service_id : '',
		}
	
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}

	
	
	componentWillMount(){
		if(this.state.role_id && this.state.role_id === config.ASSISTANT){
			connectIO(message => {
				if(String(this.state.service_id) === String(message)) {
					toast.success("Bạn có bệnh nhân khám mới !", { position: "top-right", autoClose: false, hideProgressBar: true,	closeOnClick: true });
				}
			});
		}
		this.props.getcategory();
	}

	onDelete (id) {
		
		Swal({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
			confirmButtonText: 'Có',
			cancelButtonText: 'Không'
          }).then((result) => {
            if (result.value) {
				this.props.onDeleteCategory(id)
				Swal('Good job!','You clicked the button!','success')
            }
        })
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.category !== null) {
			var {category} = this.props.category;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				
				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/products" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<Link to="/category/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới
							</Button>					
						</Link>
						<div className="clearfix"></div><br/>
								
						{this.showCategoryData(category)}

					</div>
				</div>
				<ToastContainer />
			</CSSTransitionGroup>
		);
	} // end render

	showCategoryData = (category) => {
		if(this.state.role_id === config.MANAGER  || this.state.role_id === config.ADMINISTRATOR) {
			return this.showcategoryforManager(category)
		} else {
			return this.showcategory(category)
		}
		 
	}

	showcategory (category) {
		var result = null;
		if ( category && typeof category !== 'undefined' && category.length > 0) {
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`category/1/edit`}>	</Link>);
								}
							}
						})}
						data={category}
						noDataText="Không tìm thấy kết quả!"
						previousText= 'Trang trước'
						nextText= 'Trang tiếp'
						loadingText= 'Loading...'
						pageText= 'Trang'
						ofText= 'trong	'
						rowsText= ''
						filterable
						defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
						columns={[
							{
								Header: 'Loại Dịch vụ',
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
										Header: "Tên loại dịch vụ",
										id: "title",
										accessor: d => d.title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
										filterAll: true,
										maxWidth: 600,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`category/edit/${row.original.id}`}>
													  {row.original.title}
												</Link>
											</div>;
										}
									},
									{
										Header: "Mô tả",
										id: "desc",
										accessor: d => d.desc,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["desc"] }),
										maxWidth: 600,
										filterAll: true
									},
									
								]
							}
					]}
					defaultSorted={[{
						id: "row",
					}]}
					defaultPageSize={10}  
					className="-striped -highlight"
				/>
		}
		
		return result;
	}

	showcategoryforManager (category) {
		var result = null;
		if ( category && typeof category !== 'undefined' && category.length > 0) {
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`category/1/edit`}>	</Link>);
								}
							}
						})}
						data={category}
						noDataText="Không tìm thấy kết quả!"
						previousText= 'Trang trước'
						nextText= 'Trang tiếp'
						loadingText= 'Loading...'
						pageText= 'Trang'
						ofText= 'trong	'
						rowsText= ''
						filterable
						defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
						columns={[
							{
								Header: 'Loại Dịch vụ',
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
										Header: "Tên loại dịch vụ",
										id: "title",
										accessor: d => d.title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
										filterAll: true,
										maxWidth: 600,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`category/edit/${row.original.id}`}>
													  {row.original.title}
												</Link>
											</div>;
										}
									},
									{
										Header: "Mô tả",
										id: "desc",
										accessor: d => d.desc,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["desc"] }),
										maxWidth: 600,
										filterAll: true
									},
									{
										Header: "",
										filterable: false,
										maxWidth: 250,
										Cell: row => (
											<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(row.original.id)}>
											<i className="material-icons">delete</i>
											</Button>
										)
									}
								]
							}
					]}
					defaultSorted={[{
						id: "row",
					}]}
					defaultPageSize={10}  
					className="-striped -highlight"
				/>
		}
		
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		category: state.category,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getcategory : () => {
			dispatch(actFetchCategoryRequest());
		},
		onDeleteCategory : (id) => {
			dispatch(actDeleteCategoryRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

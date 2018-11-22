import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchRoleRequest, actDeleteRoleRequest } from '../../actions/index';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class RoleList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			role : [],
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
		this.props.getrole();
	}

	onDelete (id) {
		
		Swal({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.value) {
				this.props.onDeleteRole(id)
				Swal('Xóa thành công!','','success')
            }
        })
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.role !== null) {
			var {role} = this.props.role;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				
				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/users" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						{/* <Link to="/role/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Add
							</Button>					
						</Link> */}
						<div className="clearfix"></div><br/>
								
						{this.showRole(role)}

					</div>
				</div>
					
			</CSSTransitionGroup>
		);
	} // end render

	showRole (role) {
		var result = null;
		if ( role && typeof role !== 'undefined' && role.length > 0) {
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`role/1/edit`}>	</Link>);
								}
							}
						})}
						data={role}
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
								Header: '',
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
										Header: "Chức danh",
										id: "name",
										accessor: d => d.name,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["name"] }),
										filterAll: true,
										maxWidth: 600,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`role/edit/${row.original.id}`}>
													  {row.original.name}
												</Link>
											</div>;
										}
									},
									{
										Header: "Tên hiển thị",
										id: "display_name",
										accessor: d => d.display_name,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["display_name"] }),
										maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Mô tả",
										id: "description",
										accessor: d => d.description,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["description"] }),
										maxWidth: 600,
										filterAll: true
									},
									
									{
										Header: "",
										filterable: false,
										maxWidth: 250,
										Cell: row => (
											<div>
												<Link to={`permission/edit/${row.original.id}`} className="margin-right20">
													<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small">
														<i className="material-icons">fingerprint</i>
													</Button>
												</Link>
												{/* <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(row.original.id)}>
												<i className="material-icons">delete</i>
												</Button> */}
											</div>
										)
									}
								]
							}
					]}
					defaultSorted={[{
						id: "row",
						// desc: true
					}]}
					defaultPageSize={5}  
					// style={{
					// 	height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
					// }}
					className="-striped -highlight"
				/>
		}
	
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		role: state.role,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getrole : () => {
			dispatch(actFetchRoleRequest());
		},
		onDeleteRole : (id) => {
			dispatch(actDeleteRoleRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleList);

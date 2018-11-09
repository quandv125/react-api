import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchServiceRequest, actDeleteServiceRequest } from '../../actions/index';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class ServiceList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			service : [],
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
		this.props.getService();
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
				this.props.onDeleteService(id)
				Swal('Good job!','You clicked the button!','success')
            }
        })
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.service !== null) {
			var {service} = this.props.service;
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
						<Link to="/service/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới
							</Button>					
						</Link>
						<div className="clearfix"></div><br/>
								
						{this.showservice(service)}

					</div>
				</div>
					
			</CSSTransitionGroup>
		);
	} // end render

	showservice (service) {
		var result = null;
		if ( service && typeof service !== 'undefined' && service.length > 0) {
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`service/1/edit`}>	</Link>);
								}
							}
						})}
						data={service}
						noDataText="Oh Not found!"
						filterable
						defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
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
										Header: "title",
										id: "title",
										accessor: d => d.title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
										filterAll: true,
										maxWidth: 600,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`service/edit/${row.original.id}`}>
													  {row.original.title}
												</Link>
											</div>;
										}
									},
									{
										Header: "Dịch vụ",
										id: "product_categorie",
										accessor: d => d.product_categorie,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["product_categorie"] }),
										filterAll: true,
										maxWidth: 600,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`service/edit/${row.original.id}`}>
													  {row.original.product_categorie}
												</Link>
											</div>;
										}
									},
									{
										Header: "desc",
										id: "desc",
										accessor: d => d.desc,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["desc"] }),
										maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Action",
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
						desc: true
					}]}
					defaultPageSize={10}  
					// style={{
					// 	height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
					// }}
					className="-striped -highlight"
				/>
		}
		// if (service) {
			// result = service.map((service, index) => {
			// 	console.log(service);
			// 	return (<serviceItem key={index} service={service} index={index} onDelete={this.onDelete}/>);
			// });
		// }
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getService : () => {
			dispatch(actFetchServiceRequest());
		},
		onDeleteService : (id) => {
			dispatch(actDeleteServiceRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);

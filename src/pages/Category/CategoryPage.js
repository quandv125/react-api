import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCategoryRequest, actDeleteCategoryRequest } from '../../actions/index';

import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class CategoryList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			category : [],
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
		this.props.getcategory();
	}

	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteCategory(id)
		}
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

				<div className="CategoryList col-lg-12 col-sm-12 col-xs-12 col-md-12">
					<Link to="/category/add" className="btn btn-primary">
						<i className="fa fa-plus"></i>
					</Link>
					<br/><br/>
					{this.showcategory(category)}
				</div>

			</CSSTransitionGroup>
		);
	} // end render

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
												<Link to={`category/${row.original.id}/edit`}>
													  {row.original.title}
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
										
											<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(row.original.id)}><i className="fa fa-trash"></i></button>
										
										)
									}
								]
							}
					]}
					defaultSorted={[{
						id: "row",
						// desc: true
					}]}
					defaultPageSize={20}  
					style={{
						height: "800px" // This will force the table body to overflow and scroll, since there is not enough room
					}}
					className="-striped -highlight"
				/>
		}
		// if (category) {
			// result = category.map((category, index) => {
			// 	console.log(category);
			// 	return (<categoryItem key={index} category={category} index={index} onDelete={this.onDelete}/>);
			// });
		// }
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

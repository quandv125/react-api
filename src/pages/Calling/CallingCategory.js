import React, { Component } from 'react';
import * as config from '../../constants/config';
import Button from '@material-ui/core/Button';
import { CSSTransitionGroup } from 'react-transition-group'
import { Link, Redirect } from 'react-router-dom';

import callApi from '../../utils/apiCaller';
// import Remainder from '../../components/Sms/Remainder';
// Import React Table
import ReactTable from "react-table";
// import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class CallingCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedOut: false,
			categories: null,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
	}

	componentWillMount(){
		callApi('GET', config.SMS_CATEGORY_URL , null).then(res => {
			if(res && res.data.status){
				this.setState({
					categories: res.data.data
				});	
			}
		});
	}

	onRedirect = (id) => {
		return <Redirect to={{ pathname: "/"}}/>;
	}

    render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.customers !== null) {
			var {categories} = this.state;
		}
        return (
            <React.Fragment>
                <CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple">
					<div className="grid-body no-border">
						<Link to="/sms" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" size="small" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<div className="clearfix"></div><br/>

                        { this.showSmsCategory(categories) }
						
					</div>
				</div>
				
				
			</CSSTransitionGroup>
            </React.Fragment>
        );
    }

	showSmsCategory (category) {
		var result = null;
		if( category ){
			if ( category && typeof category !== 'undefined' && category.length > 0) {
				return <ReactTable
							data={category} filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: 'SMS Categories',
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
											Header: "title",
											id: "title",
											accessor: d => d.title,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["title"] }),
											filterAll: true
										},
										{
											Header: "Description",
											id: "desc",
											accessor: d => d.desc,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["desc"] }),
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
													<Link to={`sms-category/edit/${row.original.id}`}>
														<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="primary" size="small" >
															<i className="material-icons">mode_edit</i>
														</Button>
													</Link>
													{/* <span>&nbsp;</span>
													<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(row.original.id)}>
														<i className="material-icons">delete</i>
													</Button> */}
												</div>
											)
										}
									]
								}
						]}
						defaultSorted={[{ id: "row" }]}
						defaultPageSize={10}  
						className="-striped -highlight"
					/>
			}
		}
		return result;
	}
}
export default CallingCategory;
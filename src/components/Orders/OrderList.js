import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
class OrderList extends Component {

    // constructor(props) {
	// 	super(props);
	// 	// this.state = {
	// 	// 	orders : []
	// 	// }
	// 	this.onDelete = this.onDelete.bind(this);
    // }
    
    handleDelete (id) {
		this.props.onDelete(id);
	}

    onOpenModal = (id) => {
		this.props.onOpenModal({ order_id: id, open: true });
	};
	
	onCloseModal = () => {
		this.props.onCloseModal({ open: false });
    };
    
    render() {
        var orders = this.props.children;

        return (
            <div>
                {orders && typeof orders !== 'undefined' && orders.length > 0  ? (
                    <ReactTable
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
										maxWidth: 50,
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
										maxWidth: 200,
										Cell: (row) => {
											return <div>
												<Link to={`orders/edit/${row.original.id}/${row.original.customer_id}`}>
													  {row.original.transaction_id}
												</Link>
											</div>;
										}
									},						
									{
										Header: "customer_title",
										id: "customer_title",
										accessor: d => d.customer_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_title"] }),
										maxWidth: 250,
										filterAll: true
									},
									{
										Header: "user_title",
										id: "user_title",
										accessor: d => d.user_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["user_title"] }),
										maxWidth: 300,
										filterAll: true
									},
									{
										Header: "Category",
										id: "category_title",
										accessor: d => d.category_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
										filterAll: true,
										maxWidth: 300,
									},
									{
										Header: "status",
										id: "status",
										accessor: d => d.status,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["status"] }),
										filterAll: true,
										maxWidth: 100,
									},
									{
										Header: "Action",
										filterable: false,
										maxWidth: 100,
										Cell: row => (
											<div>
												<Button type="submit" className=" btn btn-primary btn-cons-small" variant="fab" color="primary" size="small" onClick={ () => this.onOpenModal(row.original.id) }>
													<i className="material-icons">border_color</i>
												</Button>
											</div>
										
										)
                                    },
                                    {
										Header: "Action",
										filterable: false,
										maxWidth: 100,
										Cell: row => (
											<div>
												<Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.handleDelete(row.original.id)}>
													<i className="material-icons">delete</i>
												</Button>
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
					defaultPageSize={10}  
					className="-striped -highlight"
				    />
                ) : ( // else 
					<div></div>
				)}
            </div>
            
        );
    }
}

export default OrderList;
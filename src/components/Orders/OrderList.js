import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import moment from 'moment' // convert date => dd/mm/yyyy
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
						noDataText="Không tìm thấy kết quả!"
						previousText= 'Trang trước'
						nextText= 'Trang tiếp'
						loadingText= 'Loading...'
						pageText= 'Trang'
						ofText= 'trong	'
						rowsText= 'Khách'
						filterable
						defaultFilterMethod={(filter, row) =>
							String(row[filter.id]) === filter.value}
						columns={[
							{
								Header: 'Thông tin',
								columns: [
									// {
									// 	Header: "#",
									// 	id: "row",
									// 	filterable: false,
									// 	maxWidth: 50,
									// 	Cell: (row) => {
									// 		return <div>{row.index+1}</div>;
									// 	}
									// },
									{
										Header: "",
										filterable: false,
										width: 50,
										Cell: row => (
											<div>
												<Button type="submit" className=" btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small" onClick={ () => this.onOpenModal(row.original.id) }>
													<i className="material-icons">check</i>
												</Button>
											</div>
										
										)
                                    },
									{
										Header: "Mã giao dịch",
										id: "transaction_id",
										accessor: d => d.transaction_id,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["transaction_id"] }),
										filterAll: true,
										width: 150,
										Cell: (row) => {
											return <div>
												<Link to={`orders/edit/${row.original.id}/${row.original.customer_id}`}>
													  {row.original.transaction_id}
												</Link>
											</div>;
										}
									},						
									{
										Header: "Khách hàng",
										id: "customer_title",
										accessor: d => d.customer_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_title"] }),
										width: 180,
										filterAll: true,
										Cell: (row) => {
											return <div>
												<Link to={`customers/info/${row.original.customer_id}`}>
													  {row.original.customer_title}
												</Link>
											</div>;
										}
									},
									{
										Header: "Bác sỹ",
										id: "user_title",
										accessor: d => d.user_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["user_title"] }),
										// maxWidth: 300,
										filterAll: true
									},
									{
										Header: "Danh mục",
										id: "category_title",
										accessor: d => d.category_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
										filterAll: true,
										// maxWidth: 300,
									},
									{
										Header: "Thời gian khám lại",
										id: "time",
										accessor: d => d.time ? moment(d.time).format('DD/MM/YYYY') : "",
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["time"] }),
										filterAll: true,
										// maxWidth: 200,
									},
									
                                    // {
									// 	Header: "",
									// 	filterable: false,
									// 	maxWidth: 80,
									// 	Cell: row => (
									// 		<div>
									// 			{/* <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.handleDelete(row.original.id)}> */}
									// 				<span className="cursor-pointer" onClick={ () => this.handleDelete(row.original.id)}>
									// 				<i className="material-icons">delete</i>
									// 				</span>
									// 			{/* </Button> */}
									// 		</div>
									// 	)
									// }
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
					style={{
						height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
					}}
				    />
                ) : ( // else 
					<div></div>
				)}
            </div>
            
        );
    }
}

export default OrderList;
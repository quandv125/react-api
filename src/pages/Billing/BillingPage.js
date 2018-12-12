import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchBillingRequest, actDeleteBillingRequest } from '../../actions/index';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import moment from 'moment'
import { Redirect } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import { connectIO } from '../../socketIO/client';
import { ToastContainer, toast } from 'react-toastify';
class Billing extends Component {

	constructor(props) {
		super(props);
		this.state = {
			billing : [],
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
		this.props.getbilling();
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
				this.props.onDeletebilling(id)
				Swal('Good job!','You clicked the button!','success')
            }
        })
	}
	currency = (n, currency) => {
		if(n && n !== ''){
			var num = String(n);
			return currency + num.replace(/./g, function(c, i, a) {
				return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
			});
		}
	};

	showStatus = (status) => {
		var d = null;
		switch (status) {
			case '0':
				d = <span className="label label-info">Đang khám</span>;
				break;
			case '1':
				d = <span className="label label-info">Đang khám</span>;
				break;
			case '2':
				d =  <span className="label label-danger">Vẫn còn nợ</span>
				break;
			default:
				d = <span className="label label-success">Đã thanh toán</span>
				break;
		}
		return d;
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.billing !== null) {
			var {billing} = this.props.billing;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				
				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/billing" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						{/* <Link to="/billing/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới
							</Button>					
						</Link> */}
						<div className="clearfix"></div><br/>
								
						{this.showbillingData(billing)}

					</div>
				</div>
				<ToastContainer />
			</CSSTransitionGroup>
		);
	} // end render

	showbillingData = (billing) => {
		// if(this.state.role_id === config.MANAGER  || this.state.role_id === config.ADMINISTRATOR) {
			return this.showbillingforManager(billing)
		// } else {
		// 	return this.showbilling(billing)
		// }
		 
	}

	// showbilling (billing) {
	// 	var result = null;
	// 	if ( billing && typeof billing !== 'undefined' && billing.length > 0) {
	// 		return <ReactTable
	// 					getTdProps={( column ) => ({
	// 						onClick: e => {
	// 							if(column.Header !== 'Action'){
	// 								return (<Link to={`billing/1/edit`}>	</Link>);
	// 							}
	// 						}
	// 					})}
	// 					data={billing}
	// 					noDataText="Không tìm thấy kết quả!"
	// 					previousText= 'Trang trước'
	// 					nextText= 'Trang tiếp'
	// 					loadingText= 'Loading...'
	// 					pageText= 'Trang'
	// 					ofText= 'trong	'
	// 					rowsText= ''
	// 					filterable
	// 					defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
	// 					columns={[
	// 						{
	// 							Header: 'Thông tin',
	// 							columns: [
	// 								{
	// 									Header: "#",
	// 									id: "row",
	// 									filterable: false,
	// 									maxWidth: 100,
	// 									Cell: (row) => {
	// 										return <div>
	// 											<Link to={`billing/edit/${row.original.id}`}>
	// 												Thanh toán
	// 											</Link>
	// 										</div>;
	// 										}
	// 								},
	// 								{
	// 									Header: "Mã giao dịch",
	// 									id: "transaction_id",
	// 									accessor: d => d.transaction_id,
	// 									filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["transaction_id"] }),
	// 									filterAll: true,
	// 									// maxWidth: 600,
	// 									Cell: (row) => {
	// 										return <div className="text-center">
	// 											<Link to={`billing/edit/${row.original.id}`}>
	// 												  {row.original.transaction_id}
	// 											</Link>
	// 										</div>;
	// 									}
	// 								},
	// 								{
	// 									Header: "Khách hàng",
	// 									id: "customer_title",
	// 									accessor: d => d.customer_title,
	// 									filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_title"] }),
	// 									// maxWidth: 600,
	// 									filterAll: true
	// 								},
	// 								{
	// 									Header: "Bác sỹ",
	// 									id: "user_title",
	// 									accessor: d => d.user_title,
	// 									filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["user_title"] }),
	// 									// maxWidth: 600,
	// 									filterAll: true
	// 								},
	// 								{
	// 									Header: "Danh mục",
	// 									id: "category_title",
	// 									accessor: d => d.category_title,
	// 									filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
	// 									// maxWidth: 600,
	// 									filterAll: true
	// 								},
	// 								{
	// 									Header: "Thời gian khám lại",
	// 									id: "time",
	// 									accessor: d => d.time,
	// 									filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["time"] }),
	// 									// maxWidth: 600,
	// 									filterAll: true
	// 								},
	// 							]
	// 						}
	// 				]}
	// 				defaultSorted={[{
	// 					id: "row",
	// 				}]}
	// 				defaultPageSize={20}  
	// 				className="-striped -highlight"
	// 			/>
	// 	}
		
	// 	return result;
	// }

	showbillingforManager (billing) {
		var result = null;
		if ( billing && typeof billing !== 'undefined' && billing.length > 0) {
			// console.log(billing);
			return <ReactTable
						getTdProps={( column ) => ({
							onClick: e => {
								if(column.Header !== 'Action'){
									return (<Link to={`billing/1/edit`}>	</Link>);
								}
							}
						})}
						data={billing}
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
								Header: 'Thông tin',
								columns: [
									{
										Header: "#",
										id: "row",
										filterable: false,
										width: 150,
										Cell: (row) => {
											return <div>
												<Link to={`billing/edit/${row.original.id}`}>
												<Button type="submit" className=" btn btn-primary " variant="contained" color="secondary">
													Thanh toán
												</Button>
												</Link>
											</div>;
										}
									},
								
									{
										Header: "Mã giao dịch",
										id: "transaction_id",
										accessor: d => d.transaction_id,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["transaction_id"] }),
										filterAll: true,
										width: 150,
										Cell: (row) => {
											return <div className="text-center">
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
										width: 200,
										filterAll: true,
										Cell: (row) => {
											return <div className="text-center">
												<Link to={`customers/edit/${row.original.customer_id}`}>
													  {row.original.customer_title}
												</Link>
											</div>;
										}
									},
									{
										Header: "Trạng thái",
										id: "status",
										accessor: d => d.status,
										Cell: ({ value }) => this.showStatus(value),
										filterMethod: (filter, row) => {
											if (filter.value === "all") {
												  return true;
											}
											if (filter.value === '0') {
												return row[filter.id] === '0';
											}
											if (filter.value === '2') {
												return row[filter.id] === '2';
											}
											if (filter.value === '3') {
												return row[filter.id] === '3';
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
											  <option value="0">Đang khám</option>
											  <option value="2">Vẫn còn nợ</option>
											  <option value="3">Đã thanh toán</option>
											</select>
									},
								
									
									{
										Header: "Tổng",
										id: "totalPriceQuantity",
										accessor: d => d.totalPriceQuantity ? this.currency(d.totalPriceQuantity, '') : 0,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["totalPriceQuantity"] }),
										// maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Tiền đã thanh toán",
										id: "money_payment",
										accessor: d => d.money_payment ? this.currency(d.money_payment, '') : 0,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["money_payment"] }),
										// maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Tiền nợ",
										id: "indebtedness",
										accessor: d => d.indebtedness ? this.currency(d.indebtedness, '') : 0,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["indebtedness"] }),
										// maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Danh mục",
										id: "category_title",
										accessor: d => d.category_title,
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
										// maxWidth: 600,
										filterAll: true
									},
									{
										Header: "Thời gian khám ",
										id: "created_at",
										accessor: d => moment(d.created_at).format('DD/MM/YYYY HH:mm:ss'),
										filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
										width: 100,
										filterAll: true
									},
								]
							}
					]}
					defaultSorted={[{
						id: "row",
					}]}
					defaultPageSize={50}  
					className="-striped -highlight"
				/>
		}
		
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		billing: state.billing,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getbilling : () => {
			dispatch(actFetchBillingRequest());
		},
		onDeletebilling : (id) => {
			dispatch(actDeleteBillingRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Billing);

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchSmsRequest, actDeleteSmsRequest } from '../../actions/index';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment from 'moment'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import ModalCalling from './../../components/Customers/ModalCalling';

class SmsPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			sms: [],
			loggedOut: false,
			isLogin: config.TOKEN.length > 10 ? true : false
		}
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillMount(){
		if(this.props.sms && this.props.sms.sms && this.props.sms.sms.length > 0){
			this.setState({
				sms: this.props.sms.sms
			});
		} else {
			this.props.getSms();
		}
	}

	componentWillReceiveProps(nextprops){
		if(nextprops.authentication.loggedOut){
			this.setState({
				isLogin: nextprops.authentication.loggedIn,
				loggedOut: nextprops.authentication.loggedOut
			});	
		}
	}
	
	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteSms(id)
		}
	}

	phone_format = (n) => {
		if(n && n !== ''){
			return "(+84) " + n.replace(/./g, function(c, i, a) {
				return i > 0 && c !== " " && (a.length - i) % 3 === 0 ? " " + c : c;
			});
		}
	};
	
	render() {
		var {loggedOut} = this.state;
		if(loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if (this.props.sms !== null) {
			var {sms} = this.props.sms;
		}
		var balance = null;
		if (this.props.info !== null) {
			balance = 'Tài khoản còn lại: ' + this.props.info.data.balance + ' đ';
		}
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple">
					<div className="grid-body no-border">
						<div className="col-lg-4 col-md-4 col-xs-2 col-sm-2">
							<Link to="/" className="margin-right20">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								<i className="material-icons">arrow_back</i>
								</Button>	
							</Link>
						</div>
						<div className="col-lg-4 col-md-4 col-xs-8 col-sm-8 text-center">
							
							<div className="balance-sms">
								{balance}
							</div>
							
						</div>
						<div className="col-lg-4 col-md-4 col-xs-2 col-sm-2">
							<Link to="/sms-category" className="float-right">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
									<i className="material-icons">settings</i>
								</Button>
							</Link>
						</div>
						
						<ModalCalling />
						
						<div className="clearfix"></div><br/>
								
						{ this.showSms(sms) }
					</div>
				</div>
				
				
			</CSSTransitionGroup>
		);
	} // end render

	success = () => {
		return (<span className="label label-success">Thành công</span>);
	}
	error = () => {
		return (<span className="label label-danger">Lỗi</span>);
	}

	showSms (sms) {
		var result = null;
		if( sms ){
			console.log(sms);
			if ( sms && typeof sms !== 'undefined' && sms.length > 0) {
				// console.log(sms);
				return <ReactTable
							// getTdProps={( column ) => ({
							// 	onClick: e => {
							// 		if(column.Header !== 'Action'){
							// 			console.log('action')
							// 			return (<Link to={`sms/1/edit`}>	</Link>);
							// 		}
							// 	}

				  			// })}
							data={sms}
							noDataText="Không tìm thấy kết quả!"
							previousText= 'Trang trước'
							nextText= 'Trang tiếp'
							loadingText= 'Loading...'
							pageText= 'Trang'
							ofText= 'trong	'
							rowsText= 'Tin nhắn'
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value}
							columns={[
								{
									Header: "Thống kê số lượng tin nhắn",
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
											Header: "Kiểu",
											id: "type",
											maxWidth: 80,
											filterable: false,
											Cell: (row) => {
												return <div>{row.original.type === 'Auto' ? 'Tự Động': ''}</div>;
											}
										},
										{
											Header: "Mã tin nhắn",
											id: "message_id",
											width: 100,
											accessor: d => d.message_id,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["message_id"] }),
											filterAll: true,
											Cell: (row) => {
												return <div>
													{/* <Link to={`sms/${row.original.id}/edit`}> */}
													  	{row.original.message_id}
													{/* </Link> */}
												</div>;
											}
										},
										{
											Header: "Nội dung",
											id: "content",
											accessor: d => d.content,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["content"] }),
											filterAll: true,
											Cell: (row) => {
												return <div className="text-left">
													{/* <Link to={`sms/${row.original.id}/edit`}> */}
													  	{row.original.content}
													{/* </Link> */}
												</div>;
											}
										},
										{
											Header: "Trạng thái",
											id: "status",
											width: 150,
											accessor: d => d.status,
											Cell: ({ value }) => (value === String(config.SMS_STATUS_SUCCESS) ? this.success() : this.error() ),
											filterMethod: (filter, row) => {
												if (filter.value === "all") {
												  	return true;
												}
												if (filter.value === String(config.SMS_STATUS_SUCCESS)) {
													
													return row[filter.id] === String(config.SMS_STATUS_SUCCESS);
												}
												if (filter.value === String(config.SMS_STATUS_ERROR)) {
													return row[filter.id] === String(config.SMS_STATUS_ERROR);
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
												  <option value={config.SMS_STATUS_SUCCESS}>Thành công</option>
												  <option value={config.SMS_STATUS_ERROR}>Lỗi</option>
												</select>
										},	
										{
											Header: "Số điện thoại",
											id: "phone",
											width: 150,
											accessor: d => this.phone_format( d.phone ),
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["phone"] }),
											filterAll: true
										},
										{
											Header: "Khách hàng",
											id: "customer_name",
											width: 150,
											accessor: d => d.customer_name,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["customer_name"] }),
											filterAll: true
										},
										{
											Header: "Loại tin nhắn",
											id: "category_title",
											width: 150,
											accessor: d => d.category_title,
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["category_title"] }),
											filterAll: true
										},
										{
											Header: "giá",
											id: "price",
											width: 80,
											accessor: d => d.price + ' đ',
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["price"] }),
											filterAll: true
										},
										{
											Header: "Thời gian",
											id: "created_at",
											width: 200,
											accessor: d => moment(d.created_at).format('DD/MM/YYYY HH:mm:ss'),
											filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["created_at"] }),
											filterAll: true
										},						
										// {
										// 	Header: "Action",
										// 	filterable: false,
										// 	Cell: row => (
										// 		<div>
										// 		  	{/* <Link to={`sms/${row.original.id}/edit`} className="btn btn-success margin-right-10">
										// 			  	Edit
										// 			</Link> */}
										// 			<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(row.original.id)}><i className="fa fa-trash"></i></button>
										// 		</div>
										// 	)
										// }
									]
								}
						]}
						defaultSorted={[
							{
							  id: "row",
							//   desc: true
							}
						  ]}
						defaultPageSize={20}  
						className="-striped -highlight"
					/>
			}
		}
		return result;
	}
	
}

const mapStateToProps = state => {
		return {
		authentication: state.authentication,
		sms: state.sms,
		info: state.sms.info
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		getSms : () => {
			dispatch(actFetchSmsRequest());
		},
		onDeleteSms : (id) => {
			dispatch(actDeleteSmsRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsPage);

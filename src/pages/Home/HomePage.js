import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from './../../constants/config';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import {HorizontalBar} from 'react-chartjs-2';
import ModalCalling from './../../components/Customers/ModalCalling';
// import { connectIO } from '../../socketIO/client';
// import { ToastContainer } from 'react-toastify';
// import {notification} from './../../socketIO/getNotification';


class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			AuthLogin: JSON.parse(sessionStorage.getItem('authentication')),
			orders: [],
			products: [],
			customers: [],
			product_order: [],
			order_month: [],
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
		};
		this.onTest = this.onTest.bind(this);
	}
	
	
	componentWillMount(){
		// notification();
		callApi('GET', config.HOME_URL , null).then(res => {
			if(res.data.status){
				this.setState({
					orders: res.data.orders,
					products: res.data.products,
					customers: res.data.customers,
					product_order: res.data.product_order,
					order_month: res.data.order_month
				});
			}
		});
		
	// 	// console.log('componentWillMount'); // 2
	// 	// console.log(this.props);
	// 	this.setState({
	// 		AuthLogin: this.props.AuthLogin
	// 	});
	}

	componentDidMount(){
		// console.log('componentDidMount'); // 4
	}
	// ****** //

	shouldComponentUpdate(nextProps, nextState){
		// 1.2
		// console.log('shouldComponentUpdate');
		// console.log(nextProps);
		// console.log(nextState);
		return true;
	}

	componentWillUpdate(nextProps, nextState){
		// 1.3
		// console.log('componentWillUpdate');
		// console.log(nextProps);
		// console.log(nextState);
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		// 1.5
		// console.log('componentDidUpdate');
		// console.log(prevProps);
		// console.log('====================================');
		// console.log(prevState);
		// console.log('====================================');
		// console.log(this.state);
	}

	// ****** //

	componentWillUnmount(){
		// console.log('componentWillUnmount');
	}
	componentWillReceiveProps(nextprops){
		// console.log('componentWillReceiveProps')
		if ( nextprops && nextprops.AuthLogin){
			this.setState({
				AuthLogin: nextprops.AuthLogin
			});
		}
	}
	onTest() {
		// 1.1 
		// console.log('test');
		this.setState({
			test: 'new'
		});
		
	}
	getToday = () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		return dd+'/'+mm+'/'+yyyy;
	}	
	month_year = () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		return mm+'/'+yyyy;
	}

	year = () => {
		var today = new Date();
		return today.getFullYear();
	}

	currency = (n, currency) => {
		if(n && n !== ''){
			var num = String(n);
			return currency + num.replace(/./g, function(c, i, a) {
				return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
			});
		}
	};
	
	//Case 1:  1. contrucstor 2. componentWillMount 3. render 4. componentDidMount
	//Case 2:  1. func: test 2. shouldComponentUpdate 3. ComponentWillUpdate 4. render 5. componentDidUpdate
	render() {
		
		  
		// console.log('render'); // 3 | 1.4
		var { orders, products, customers, product_order } = this.state;
		console.log(customers);
		const data = {
			labels: product_order.key,
			datasets: [
			  {
				label: '10 dịch vụ bán chạy năm ' + this.year(),
				backgroundColor: '#c39b50bf',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: product_order.value
			  }
			]
		};
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
					
						{ this.state.AuthLogin && this.state.AuthLogin.status ? 
							(
								<div className="grid simple">
									<div className="grid-body no-border">
									<ModalCalling />
									<div className="row">
											<div className="col-md-4 col-vlg-4 col-sm-6">
												<div className="tiles green m-b-12">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title ">Lịch sử sử dụng dịch vụ </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tất cả</span> <span className="item-count animate-number semi-bold" data-value={orders.all} data-animation-duration="700">
																	{orders.all}
																</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tuần nay</span> <span className="item-count animate-number semi-bold" data-value={orders.week} data-animation-duration="700">
																	{orders.week}
																</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Tháng {this.month_year()}</span> <span className="item-count animate-number semi-bold" data-value={orders.month} data-animation-duration="700">
																	{orders.month}
																</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="100%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description "> <span className="blend"></span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 col-vlg-4 col-sm-6">
												<div className="tiles blue m-b-12">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title ">Khách hàng </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tất cả</span> <span className="item-count animate-number semi-bold" data-value={customers.all} data- animation-duration="700">
																	{customers.all}
																</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tuần này</span> <span className="item-count animate-number semi-bold" data-value={customers.week} data-animation-duration="700">
																	{customers.week}
																</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Tháng {this.month_year()}</span> <span className="item-count animate-number semi-bold" data-value={customers.month} data-animation-duration="700">
																	{customers.month}
																</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="100%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description "> <span className="blend"></span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 col-vlg-4 col-sm-6">
												<div className="tiles purple m-b-12">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title ">Tổng số dịch vụ </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Dịch vụ</span> <span className="item-count animate-number semi-bold" data-value={products.all} data-animation-duration="700">
																	{products.all}
																</span>
															</div>
														</div>
														{/* <div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Today's</span> <span className="item-count animate-number semi-bold" data-value="568" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Monthly</span> <span className="item-count animate-number semi-bold" data-value="12459" data-animation-duration="700">0</span>
															</div>
														</div> */}
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="100%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description "> <span className="blend"></span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="clearfix"> </div>
											<br/>
											{/* <div className="col-md-6 col-vlg-6 col-sm-6">
												<div className="tiles purple m-b-12">
													<div className="tiles-body">
														
														<div className="tiles-title ">Doanh thu tháng {this.month_year()}</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tổng số tiền thu được</span> <span className="item-count animate-number semi-bold" data-value={order_month.money_payment} data-animation-duration="700">
																	{this.currency(order_month.money_payment, '')}
																</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tổng số tiền phải thu</span> 
																<span className="item-count animate-number semi-bold" data-value={order_month.totalPriceQuantity} data-animation-duration="700">
																{this.currency(order_month.totalPriceQuantity, '')}
																</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Tiền nợ</span> <span className="item-count animate-number semi-bold" data-value={order_month.indebtedness} data-animation-duration="700">
																{this.currency(order_month.indebtedness, '')}
																</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="100%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description "> <span className="blend"></span></span>
														</div>
													</div>
												</div>
											</div> */}

											{/* <div className="col-md-6 col-vlg-6 col-sm-6">
												<div className="tiles purple m-b-12">
													<div className="tiles-body">
														
														<div className="tiles-title ">Doanh thu tháng {this.month_year()}</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tổng số tiền thu được</span> <span className="item-count animate-number semi-bold" data-value={order_month.money_payment} data-animation-duration="700">
																	{this.currency(order_month.money_payment, '')}
																</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Tổng số tiền phải thu</span> 
																<span className="item-count animate-number semi-bold" data-value={order_month.totalPriceQuantity} data-animation-duration="700">
																{this.currency(order_month.totalPriceQuantity, '')}
																</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Tiền nợ</span> <span className="item-count animate-number semi-bold" data-value={order_month.indebtedness} data-animation-duration="700">
																{this.currency(order_month.indebtedness, '')}
																</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="100%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description "> <span className="blend"></span></span>
														</div>
													</div>
												</div>
											</div> */}

											<div className="col-md-10 col-vlg-10 col-sm-10">
												<HorizontalBar data={data} />
											</div>
											
										</div>
										<div className="clearfix"></div>
										
										</div></div>
							
							)
							: 
							(
								<Link to="/login" className="my-link">
									Login
								</Link>
							)
						}
				
				
			</CSSTransitionGroup>
		);
		
	}
	
}

const mapStateToProps = (state) => {
	return {
		AuthLogin: state.authentication
	}
}

export default connect(mapStateToProps, null) (Home);

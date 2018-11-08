import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as config from '../../constants/config';
import callApi from '../../utils/apiCaller';
import OrderInfo from './../../components/Orders/OrderInfo';
import CustomerInfo from './../../components/Orders/CustomerInfo';
import AddDoctor from './../../components/Orders/AddDoctor';
import AddServices from './../../components/Orders/AddServices';
import AddRemainder from './../../components/Orders/AddRemainder';

import Swal from 'sweetalert2'

class OrderActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			service: '',
			customer: '',
			product: '',
			product_quantity: 1,
			customerData: '',
			product_service_id: '',
			categories: '',
			username: '',
			order: '',
			order_detail: '',
			category_title: '',
			date_remain: '',
			// startDate: moment()
			startDate: null,
			doctor: '',

		};
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
	}
	
	componentWillMount(){
		var {match} = this.props;
		if(match) {
			var {id, customer_id} = match.params;
		
			callApi('GET', config.ORDER_URL  + "/" + id, null).then(res => {
				if (res && res.data.data){
					this.setState({
						order: res.data.data,
						date_remain: res.data.data.time === null ? '' : res.data.data.time,
						category_title: res.data.category.title
					});
					var category_id = res.data.data.product_category_id;
					callApi('GET', config.PRODUCT_URL+'/category/'+category_id, null).then(res => {
						this.setState({
							categories: res.data.data
						});
					});
					callApi('GET', config.USERS_URL+'/list-doctor', null).then(res => {
						this.setState({
							username: res.data.data
						});
					});
				}
			});	
			callApi('GET', config.CUSTOMER_URL  + "/" + customer_id, null).then(response => {
				if (response ){
					this.setState({
						customer: response.data.data
					});
				}
			});
			if(id){
				this.getOrderDetail(id);
				callApi('GET', config.ORDER_URL + '/user/' + id, null).then(res => {
					if ( res.data.status ) {
						this.setState({
							doctor: res.data.data.user
						});
					}
				});
			}
		}
	}

	today = () => {
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
		return yyyy+'-'+mm+'-'+dd;
	}

	getOrderDetail(id){
		callApi('GET', config.ORDER_DETAIL_URL+ "/order/" + id, null).then(res => {
			if(res && res.data.status){
				this.setState({
					order_detail: res.data.data,
					time: res.data.data.time
				});
			}
		});
	}

	onChangeForm (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

	onSave (event) {
		event.preventDefault();

		var {history} = this.props;
		var {id, sku, title, price, quantity, unit, is_publish} = this.state;
		var data = {sku: sku, title: title, price: price, quantity: quantity, unit: unit, is_publish: is_publish ? true : false };
		if(id) { //update
			callApi('PUT', config.ORDER_URL  + "/" + id, data).then( res => {
				console.log(res);
				history.push("/orders");
			});
		} else { //create
			callApi('POST', config.ORDER_URL, data ).then( res => {
				//C1 // history.push("/orders-list");
				// console.log(res);
				// history.push("/orders");
				//C2: redirect 
				history.goBack();
			});
		}
	}

	handleDeleteService = (id) => {
		callApi('DELETE', config.ORDER_DETAIL_URL + "/" +id, null).then(response => {
			if(response && response.data.status){
				this.getOrderDetail(this.state.order.id);
			}
		});
	}

	handleAddService = (data_props) => {
		var {product_service_id, product_quantity}  = data_props;
		var {order}  = this.state;
		var data = {order_id: order.id, product_id : product_service_id, quantity: product_quantity}
		if (product_service_id && product_service_id !== ""){
			callApi('POST', config.ORDER_DETAIL_URL, data).then(res => {
				this.getOrderDetail(order.id)
			});
		} else {
			Swal('Oops...', 'Something went wrong!', 'error')
		}
	}

	handleAddRemain = (data_props) => {

		var time = data_props.date_remain;
		var data = {time: time, is_send_sms: 0}
		if( time !== ''){
			callApi('PUT', config.ORDER_URL  + "/" + this.state.order.id, data).then(res => {
				if(res && res.data.status){
					this.setState({
						date_remain: time
					});
					Swal('Good job!','You clicked the button!','success')
				}
			});
		} else {
			Swal('Oops...', 'Something went wrong!', 'error')
		}
	}

	handleAddDoctor = (user_id) => {
		var { order } = this.state;
		if( user_id !== null && user_id !== "0") {
            var data = {user_id: user_id};
            callApi('PUT', config.ORDER_URL + '/user/' + order.id, data).then(res => {
                if ( res.data.status ) {
                    this.setState({
                        doctor: res.data.data.user
                    });
                    Swal('Good job!','You clicked the button!','success')
                }
            });
        } else {
            Swal('Oops...', 'Something went wrong!', 'error')
        }
	}

	handleSendSmsRemain = () => {
		var { id } = this.state.order;
		var data = { is_send_sms: 1, time: null};
		callApi('GET', config.ORDERS_URL + "/send-sms-order/" + id, data).then(res => {
			console.log(res);
			if(res) {
				if( res.data.status ){
					Swal('Good job!', res.data.msg ? res.data.msg : 'Send message successfully!','success')
				} else {
					Swal('Oops...', res.data.msg ? res.data.msg : 'Error, Can not send message', 'error')
				}
			} else {
				Swal('Oops...', 'Something went wrong!', 'error')
			}
		});
	}

	handleDeleteRemain = () => {
		var { id } = this.state.order;
		var data = { is_send_sms: true, time: '0000-00-00 00:00:00'};
		callApi('PUT', config.ORDER_URL  + "/" + id, data).then(res => {
			if(res && res.data.status){
				console.log(res);
				this.setState({
					date_remain: '2018'
				});
				Swal('Good job!','You clicked the button!','success')
			}
		});
	}

	render() {
		var { order, customer, order_detail, category_title, date_remain, doctor, categories, username } = this.state;

		return (

			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<React.Fragment>
					<div className="col-lg-12 col-md-12">
					
						<Link to="/orders" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="fab" color="primary" >
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<p></p>
					</div>
					
					<OrderInfo order={order} category_title={category_title}/>
					
					<CustomerInfo customer={customer} />
					
					<AddDoctor doctor={doctor} username={username} handleAddDoctor={this.handleAddDoctor}/>

					<div className="clearfix"></div>

					<AddServices 
						categories={categories} 
						order_detail={order_detail} 
						handleDeleteService={this.handleDeleteService} 
						handleAddService={this.handleAddService}
					/>

					{/* add date remain */}
					<div className="clearfix"></div>
					<AddRemainder 
						date_remain={date_remain} 
						handleAddRemain={this.handleAddRemain} 
						handleSendSmsRemain={this.handleSendSmsRemain}
						handleDeleteRemain={this.handleDeleteRemain}
					/>
											
				</React.Fragment>
				</CSSTransitionGroup>
		);
	} // end render

	

	
	
	
}

export default OrderActionPage;

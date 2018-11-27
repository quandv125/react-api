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
import Modal from 'react-responsive-modal';
import Cleave from 'cleave.js/react';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { actAddOrderRequest  } from '../../actions/index';

class OrderActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			service: '',
			customer: '',
			product: '',
			product_quantity: 1,
			order_detail_id: '',
			product_title: '',
			product_price: 0,
			note: 'test',
			customerData: '',
			product_service_id: '',
			categories: '',
			products: '',
			username: '',
			order: '',
			order_detail: '',
			category_title: '',
			date_remain: '',
			// startDate: moment()
			startDate: null,
			doctor: '', note_user: '',
			open: false, openNote: false,
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
			service_id: '',
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
	}
	
	componentWillMount(){
		var {match} = this.props;
		if(match) {
			var {id, customer_id} = match.params;
			if(id){
				// CustomerInfo 
				callApi('GET', config.CUSTOMER_URL  + "/" + customer_id, null).then(response => {
					if (response ){
						this.setState({
							customer: response.data.data
						});
					}
				});
				//UserInfo
				callApi('GET', config.ORDER_URL + '/user/' + id, null).then(res => {
					if ( res.data.status ) {
						this.setState({
							doctor: res.data.data.user,
							note_user: res.data.data.note_user ? res.data.data.note_user : ' '
						});
					}
				});
				// OrderInfo
				callApi('GET', config.ORDER_URL  + "/" + id, null).then(res => {
					if (res && res.data.data){
						this.setState({
							order: res.data.data,
							date_remain: res.data.data.time === null ? '' : res.data.data.time,
							category_title: res.data.category.title,
							service_id: res.data.data.product_category_id
						});
						
						var category_id = res.data.data.product_category_id;
					
						callApi('GET', config.PRODUCT_URL+'/product-services/'+category_id, null).then(res => {
							this.setState({
								categories: res.data.services,
								products: res.data.products
							});
						});
						callApi('GET', config.USERS_URL+'/list-doctor', null).then(res => {
							this.setState({
								username: res.data.data
							});
						});
					}
				});	
			
				this.getOrderDetail(id);
				
			}
		}
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

	onOpenModal = (data) => {
		this.setState({ order_id: data.order_id , open: true });
	};
	
	onCloseModal = () => {
		this.setState({ open: false });
	};

	onCloseModalNote = () => {
		this.setState({ openNote: false });
	};
	

	

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
			Swal('Vui lòng chọn dịch vụ...', '', 'error')
		}
	}

	handleAddServiceBySelt = (data_props) => {
		var {product_title, product_quantity}  = data_props;
		var {order}  = this.state;
		var data = {order_id: order.id, product_title : product_title, quantity: product_quantity}
		
		if (product_title && product_title !== ""){
			callApi('POST', config.ORDER_DETAIL_URL+'/add-order-detail', data).then(res => {
				this.getOrderDetail(order.id)
			});
		} else {
			Swal('Vui lòng chọn dịch vụ...', '', 'error')
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
					Swal('Thành công!','Đặt lịch khám lại thành công','success')
				}
			});
		} else {
			Swal('Vui lòng chọn ngày gửi tin nhắn...', '', 'error')
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
                    Swal('','Thêm bác sỹ khám thành công!','success')
                }
            });
        } else {
            Swal('Vui lòng chọn bác sỹ...', '', 'error')
        }
	}

	handleSetNoteDoctor = (note) => {
		if(note && note !== ''){
			var { order } = this.state;
			var data = {note_user: note}
				callApi('PUT', config.ORDER_URL + "/" + order.id, data).then(res => {
					if ( res.data.status ) {
						Swal('Thêm ghi chú thành công!','','success')
					}
				});
		} else {
			Swal('Vui lòng chọn bác sỹ...', '', 'error')
		}
		
	}

	handleSendSmsRemain = () => {
		var { id } = this.state.order;
		var data = { is_send_sms: 1, time: null};
		callApi('GET', config.ORDERS_URL + "/send-sms-order/" + id, data).then(res => {
			if(res) {
				if( res.data.status ){
					Swal('Thành công!', res.data.msg ? res.data.msg : 'Gửi tin nhắn thành công!','success')
				} else {
					Swal('Lỗi...', res.data.msg ? res.data.msg : 'Không thể gửi được tin nhắn', 'error')
				}
			} else {
				Swal('Lỗi...', '', 'error')
			}
		});
	}

	handleDeleteRemain = () => {
		var { id } = this.state.order;
		var data = { is_send_sms: true, time: '0000-00-00 00:00:00'};
		callApi('PUT', config.ORDER_URL  + "/" + id, data).then(res => {
			if(res && res.data.status){
				this.setState({
					date_remain: '2018'
				});
				Swal('Xóa thành công!','','success')
			}
		});
	}

	handleChangePrice = (id, title, price) => {
		this.setState({
			open: true,
			order_detail_id: id,
			product_title: title,
			product_price: price
		});
	}

	onhandleNode = (id, note, title) => {
		this.setState({
			openNote: true,
			order_detail_id: id,
			note: note ? note : '  ',
			product_title: title,
		});
	
		
	}

	onhandleSetPrice = () => {
		var {order_detail_id, product_price} = this.state;
		var data = {product_price: product_price.split(",").join("")};
		callApi('PUT', config.ORDER_DETAIL_URL  + "/" + order_detail_id, data).then(res => {
			if(res && res.data.status){
				this.setState({
					open: false
				});
				this.getOrderDetail(this.state.order.id)
				Swal('Cập nhật giá thành công!','','success')
			}
		});
	} 

	handlesetnote = () => {
		var {order_detail_id, note} = this.state;
		var data = {note: note};
		callApi('PUT', config.ORDER_DETAIL_URL  + "/" + order_detail_id, data).then(res => {
			if(res && res.data.status){
				this.setState({
					openNote: false
				});
				this.getOrderDetail(this.state.order.id)
				Swal('Cập nhật ghi chú thành công!','','success')
			}
		});
	}

	DeleteOrder (id) {
		var {history} = this.props;
		callApi('DELETE', config.ORDER_URL + "/" +id, null).then(res => {
			if(res && res.data.status){
				this.props.onAddOrder();
				history.push("/orders");
			}
		});
	}
	

	showBackLink = (order_id) => {
		if(this.state.role_id === config.ADMINISTRATOR || this.state.role_id === config.MANAGER ){
			return (
				<div>
					<Link to="/orders" className="margin-right20">
						<Button type="submit" className="btn btn-primary btn-cons" variant="fab" color="primary" >
						<i className="material-icons">arrow_back</i>
						</Button>	
					</Link>
					<Link to={"/orders/invoice/"+ this.props.match.params.id}>
						<Button type="submit" className="btn btn-primary btn-cons " variant="contained" color="primary" >
							Hóa đơn
						</Button>	
					</Link>
					<Button type="submit" className="btn btn-primary btn-cons" style={{marginLeft: 20}} onClick={() => this.DeleteOrder(order_id)} variant="contained" color="secondary" >
						Xóa đơn
					</Button>	
				</div>
			);
		} 
		// else {
		// 	return (
		// 		<Link to="/customers" className="margin-right20">
		// 			<Button type="submit" className="btn btn-primary btn-cons" variant="fab" color="primary" >
		// 			<i className="material-icons">arrow_back</i>
		// 			</Button>	
		// 		</Link>
		// 	);
		// }
	}

	render() {
		var { order, customer, order_detail, category_title, date_remain, doctor, note_user, categories, products,username, service_id } = this.state;
	
		return (

			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<React.Fragment>
					<div className="col-lg-12 col-md-12">
					
						{this.showBackLink(order.id)}

						
						<p></p>
					</div>
					
					<OrderInfo order={order} category_title={category_title}/>
					
					<CustomerInfo customer={customer} />
					<div className="clearfix"></div>
					<AddDoctor doctor={doctor} username={username} note_user={note_user} handleAddDoctor={this.handleAddDoctor} handleSetNoteDoctor={this.handleSetNoteDoctor}/>

					<div className="clearfix"></div>

					<AddServices 
						service_id={service_id}
						categories={categories} 
						products={products}
						order_detail={order_detail} 
						handleDeleteService={this.handleDeleteService} 
						handleAddService={this.handleAddService}
						handleAddServiceBySelt={this.handleAddServiceBySelt}
						handleChangePrice={this.handleChangePrice}
						onhandleNode={this.onhandleNode}
					/>

					{/* add date remain */}
					<div className="clearfix"></div>
					<AddRemainder 
						date_remain={date_remain} 
						handleAddRemain={this.handleAddRemain} 
						handleSendSmsRemain={this.handleSendSmsRemain}
						handleDeleteRemain={this.handleDeleteRemain}
					/>
					<Modal open={this.state.open} onClose={this.onCloseModal} center>
						<div style={{width:400}}>
							<div className="form-group">
								<label>Dịch vụ: <strong><span>{this.state.product_title} </span></strong></label>
								
							</div>
							<div className="form-group">
								<label>Giá</label>
								<Cleave className="input-numeral form-control" 
									name="product_price"
									value={this.state.product_price} 
									options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
									onChange={this.onChangeForm}
								/>
								
							</div>
							<Button onClick={this.onhandleSetPrice} type="submit" className="btn btn-primary btn-cons" variant="contained" color="secondary" >
								Lưu
							</Button>	
						</div>
					</Modal>	
					<Modal open={this.state.openNote} onClose={this.onCloseModalNote} center>
						<div style={{width:400}}>
							
							<div className="form-group">
								<label>Ghi chú: <strong><span>{this.state.product_title} </span></strong></label>
								<input 
									className="form-control"
									name="note"
									onChange={this.onChangeForm}
									value={this.state.note}
								/>
								
							</div>
							<Button onClick={ this.handlesetnote} type="submit" className="btn btn-primary btn-cons" variant="contained" color="secondary" >
								Lưu
							</Button>	
						</div>
					</Modal>			
				</React.Fragment>
				</CSSTransitionGroup>
		);
	} // end render
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		
		onAddOrder : () => {
			dispatch(actAddOrderRequest());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderActionPage);
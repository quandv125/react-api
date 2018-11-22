import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { connect } from 'react-redux';
import { actFetchOrdersRequest, actDeleteOrderRequest } from '../../actions/index';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import OrderList from './../../components/Orders/OrderList'
import Modal from 'react-responsive-modal';
import ModalOrder from './../../components/Orders/ModalOrder';
import ModalFilterOrder from './../../components/Orders/ModalFilterOrder';
import callApi from '../../utils/apiCaller';
import { connectIO } from '../../socketIO/client';
import { ToastContainer, toast } from 'react-toastify';
// Note: include <ToastContainer/>
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
class OrderPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders : [],
			order_by_date: [],
			start: '',
			end: '',
			loggedOut: false,
			open: false,
			order_id: '',
			openFilter: false,
			user_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).id : '',
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
			service_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).service_id : '',
			filter: false
		}
		
		if(this.state.role_id && this.state.role_id === config.ASSISTANT){
			connectIO(message => {
				console.log(message, this.state.service_id);
				if(String(this.state.service_id) === String(message)) {
					this.props.getOrders(this.state.user_id);
					toast.success("Bạn có bệnh nhân khám mới !", { position: "top-right", autoClose: false, hideProgressBar: true,	closeOnClick: true });
				}
			});
		}
		
		
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}
	
	componentWillMount(){
		this.props.getOrders(this.state.user_id);
	}

	onDelete = (id) => {
		Swal({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Đồng ý!'
        }).then((result) => {
            if (result.value) {
				this.props.onDeleteOrder(id)
				Swal('Xóa thành công!','','success')
            }
        })
	}

	onOpenModal = (data) => {
		this.setState({ order_id: data.order_id , open: true });
	};
	
	onCloseModal = () => {
		this.setState({ open: false });
	};
	
	onOpenFilterModal = () => {
		this.setState({ openFilter: true });
	};

	onCloseFilter = () => {
		this.setState({ openFilter: false });
    };

	onActionModal = (id, data) => {
		if(data && data.time && data.time !== ''){
			callApi('PUT', config.ORDER_URL  + "/" + id, data).then( res => {
				if(res && res.data.status){
					this.props.getOrders(this.state.user_id);
					this.setState({ open: false });
					Swal('Đặt lịch khám lại thành công','','success')
				}
			});
		} else {
			Swal('Vui lòng chọn ngày khám lại	!','','error')
		}
	}

	onActionFilterModal = (data) => {
		var {start, end} = data;
		if(!end) {
			end = start
		}
		callApi('GET', config.ORDERS_URL  + "/by-date/"+ this.state.user_id + "/" + start + "/" + end, null).then(response => {
			if (response ){
				this.setState({
					orders: response.data.data,
					start: response.data.start,
					end: response.data.end
				});
			}
		});
		this.setState({filter: true, openFilter: false});
	}

	onhandleFinish = (id) => {
		var data = {status: 1};
		callApi('PUT', config.ORDER_URL  + "/" + id, data).then( res => {
			if(res && res.data.status){
				this.props.getOrders(this.state.user_id);
				this.setState({ open: false });
				Swal('Kết thúc khám bệnh thành công','','success')
			}
		});
	}
	
	getToday = () => {
		var tempDate = new Date();
		// var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
		let day = tempDate.getDate() < 10 ? "0"+tempDate.getDate() : tempDate.getDate();
		let month = (tempDate.getMonth()+1);
		let year = tempDate.getFullYear();
		var date = day + "/" + month + "/" + year ;
		return date;
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if(!this.state.filter){
			if (this.props.orders !== null) {
				var {orders} = this.props.orders;
				var {order_by_date} = this.props.orders;
			}
			return (
				<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
					<div className="grid simple">
						<div className="grid-body no-border">
						<ToastContainer />
							<div className="col-md-6">
								<div className="page-title"> 
									<i className="material-icons">card_giftcard</i>
									<h3> <span className="semi-bold">Bệnh nhân khám lại: {this.getToday()} <Button  className="margin-left20" variant="contained"  color="secondary"  onClick={ this.onOpenFilterModal } >Chọn ngày</Button></span></h3>
								</div>
								<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
									{order_by_date}
								</OrderList>
							</div>
							<div className="col-md-6">
								<div className="page-title margin-bottom15"> 
									<i className="material-icons">card_giftcard</i>
									<h3> <span className="semi-bold">Bệnh nhân khám mới</span></h3>
								</div>
								<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
									{orders}
								</OrderList>
							</div>
							<Modal open={this.state.openFilter} onClose={this.onCloseFilter} center>
								<ModalFilterOrder action={this.onActionFilterModal}/>
							</Modal>					
							<Modal open={this.state.open} onClose={this.onCloseModal} center>
								<ModalOrder order_id={this.state.order_id} action={this.onActionModal} onhandleFinish={this.onhandleFinish}/>
							</Modal>
						</div>
					</div>
				</CSSTransitionGroup>
			);
		} else {
			var {start, end} = this.state;
			return (
				<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
					<div className="grid simple">
						<div className="grid-body no-border">
						<ToastContainer />
							<div className="col-md-12">
								<div className="page-title margin-bottom15"> 
									<i className="material-icons">card_giftcard</i>
									<h3> <span className="semi-bold margin-right20">Bệnh nhân khám ngày: {start} - {end}</span><Button  className="margin-left20" variant="contained"  color="secondary"  onClick={ this.onOpenFilterModal } >Lọc</Button></h3>
								</div>
								<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
									{this.state.orders}
								</OrderList>
							</div>
							<Modal open={this.state.openFilter} onClose={this.onCloseFilter} center>
								<ModalFilterOrder action={this.onActionFilterModal}/>
							</Modal>					
							<Modal open={this.state.open} onClose={this.onCloseModal} center>
								<ModalOrder order_id={this.state.order_id} action={this.onActionModal}/>
							</Modal>
						</div>
					</div>
				</CSSTransitionGroup>
			);
		}
		
	} // end render
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		order_by_date: state.order_by_date,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getOrders : (user_id) => {
			dispatch(actFetchOrdersRequest(user_id));
		},
		onDeleteOrder : (id) => {
			dispatch(actDeleteOrderRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);

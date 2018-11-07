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
import callApi from '../../utils/apiCaller';
import { connectIO } from '../../socketIO/client';

class OrderPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders : [],
			order_by_date: [],
			loggedOut: false,
			open: false,
			order_id: '',
		}

		connectIO(message => {
			this.props.getOrders();
			Swal('Good job!','You clicked the button!','success')
		});

		
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}
	
	componentWillMount(){
		this.props.getOrders();
	}

	onDelete = (id) => {
		Swal({
            title: 'Are you sure?',
            text: "Are you sure you wish to delete this item?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.value) {
				this.props.onDeleteOrder(id)
				Swal('Good job!','You clicked the button!','success')
            }
        })
	}

	onOpenModal = (data) => {
		this.setState({ order_id: data.order_id , open: true });
	};
	
	onCloseModal = () => {
		this.setState({ open: false });
    };

	onActionModal = (id, data) => {
		callApi('PUT', config.ORDER_URL + id, data).then( res => {
			if(res && res.data.status){
				this.props.getOrders();
				this.setState({ open: false });
				Swal('Good job!','You clicked the button!','success')
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
		
		if (this.props.orders !== null) {
			var {orders} = this.props.orders;
			var {order_by_date} = this.props.orders;

		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				
				<div className="grid simple">
					<div className="grid-body no-border">
						
						
						<div className="col-md-6">
							<div className="page-title"> 
								<i className="material-icons">card_giftcard</i>
								<h3> <span className="semi-bold">Orders: {this.getToday()}</span></h3>
							</div>
							<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
								{order_by_date}
							</OrderList>
						</div>
						<div className="col-md-6">
							<div className="page-title"> 
								<i className="material-icons">card_giftcard</i>
								<h3> <span className="semi-bold">Orders New</span></h3>
							</div>
							
							<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
								{orders}
							</OrderList>
						</div>
												
						<Modal open={this.state.open} onClose={this.onCloseModal} center>
							<ModalOrder order_id={this.state.order_id} action={this.onActionModal}/>
						</Modal>

					</div>
				</div>
				
			</CSSTransitionGroup>
		);
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
		getOrders : () => {
			dispatch(actFetchOrdersRequest());
		},
		onDeleteOrder : (id) => {
			dispatch(actDeleteOrderRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);

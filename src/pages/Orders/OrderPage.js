import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from '../../constants/config';
import { connect } from 'react-redux';
import { actFetchOrdersRequest, actDeleteOrderRequest } from '../../actions/index';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import OrderList from './../../components/Orders/OrderList'
// import { connectIO } from '../../socketIO/client';
import Modal from 'react-responsive-modal';
import ModalOrder from './../../components/Orders/ModalOrder';
class OrderPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orders : [],
			loggedOut: false,
			open: false,
			order_id: ''
		}
		// connectIO(message => {
		// 	this.props.getOrders();
		// 	Swal('Good job!','You clicked the button!','success')
		// });
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

	onActionModal = (id) => {
		alert('test ' + id)
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		if (this.props.orders !== null) {
			var {orders} = this.props.orders;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				
				<div className="grid simple">
					<div className="grid-body no-border">
						
						<div className="page-title"> 
							<i className="material-icons">card_giftcard</i>
							<h3> <span className="semi-bold">Orders</span></h3>
						</div>
						
						<OrderList onDelete={this.onDelete} onCloseModal={this.onCloseModal} onOpenModal={this.onOpenModal}>
							{orders}
						</OrderList>
						
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

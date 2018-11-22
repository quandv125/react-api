import React, { Component } from 'react';
import { CallingIO } from '../../socketIO/client';
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import callApi from './../../utils/apiCaller';
import * as config from '../../constants/config';
import CustomerData from './../../components/Customers/CustomerData';

import CustomerDataTr from './../../components/Customers/CustomerDataTr';

import Swal from 'sweetalert2'

class ModalCalling extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: '',
            open: false,
            customer_id: null,
            customer: '',
            customernumber: '',
            order: [],
            role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '',
            user: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).name : ''
		}
		CallingIO(message => {
            
            if(this.state.role_id && this.state.role_id === config.RECRPTIONIST){
                if(message.data && message.data.power){
                    this.setState({
                        order: message.data.order,
                        customer_id: message.data.power.id,
                        customer: message.data.power.firstname + ' ' + message.data.power.lastname,
                        customernumber: message.data.power.phone
                    });
                } 
                // else {
                //     this.setState({
                //         customer_id: null,
                //         customer: '',
                //         customernumber: ''
                //     });
                // }
                // console.log(message.data.order)
                // let user = message.data.power.username;
                this.onOpenModal();
            }
            
		});
    }
    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};
	
	onCloseModal = () => {
		this.setState({ open: false });
	};

	handleEventCustomerCalling = () => {
        var {customer, customer_id, user, customernumber, note} = this.state;
        var data = {customer_id: customer_id, user: user, customer: customer, customernumber: customernumber, note: note}
		callApi('POST', config.CRMWORLDFONE_URL, data).then(res => {
            if(res.data.status) {
                Swal( 'Good job!', 'You clicked the button!', 'success')
                this.onCloseModal()
            } else {
                Swal( 'Oops...', 'Your phone not incorrect format!', 'error')
            }
        })
	}
    render() {
        var {customer, customernumber, order} = this.state;
        return (
            <div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
					<h2>Khách hàng: <strong> {customer} {customernumber}</strong></h2>
						<div className="form-group">							
							<textarea name="note" onChange={this.onChangeForm}  className="form-control" cols="80" rows="5" required="required"></textarea>
						</div>
						<Button variant="contained"  color="secondary" onClick={this.handleEventCustomerCalling}>Save <i className="material-icons">done_all</i> </Button>
                        <br/> <br/>
                        {order && order.length > 0 &&
                            <div className="grid-body no-border">
                                <CustomerData>
                                    {this.showCustomerData(order, 123)}
                                </CustomerData>
                            </div>
					    }
                </Modal>
            </div>
        );
    }
    showCustomerData = (customers, order_id) => {
        var result = null;
        if(customers && typeof customers !== 'undefined' && customers.length > 0){
            result = customers.map((customer, index) => {
                return <CustomerDataTr key={index} customer={customer} order_id={order_id}/>;
            })
            
        }
        return result;
    }
}

export default ModalCalling;
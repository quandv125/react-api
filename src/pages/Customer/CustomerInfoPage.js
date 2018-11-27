import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import callApi from '../../utils/apiCaller';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
// import Validator from 'react-forms-validator';
import Button from '@material-ui/core/Button';
// import Modal from 'react-responsive-modal';
import CustomerData from '../../components/Customers/CustomerData';
import CustomerDataTr from '../../components/Customers/CustomerDataTr';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2'
// import Radio from '@material-ui/core/Radio';
import socketIOClient from 'socket.io-client'
// import Cleave from 'cleave.js/react';

class CustomerActionPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: '',
			username: 'customer',
			firstname: '',
			lastname: '',
			email: '',
			address: '',
			phone: '',
			birthday: '',
			startDate: null,
			gender: config.GENDER_FEMALE,
			isValidation: '',
			submitted: false,
			isFormValidationErrors : true,
			open: false,
			service: '25',
			customer_data: '',
			selectedValue: 'male'
		};
		this.onChangeForm = this.onChangeForm.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}
	
	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			callApi('GET', config.CUSTOMER_URL  + "/" + id, null).then(res => {
				var data = res.data.data;
				this.setState({
					id: data.id ? data.id  : '',
					username: data.username ? data.username : '',
					firstname: data.firstname ? data.firstname : '',
					lastname: data.lastname ? data.lastname : '',
					email: data.email ? data.email : '',
					address: data.address ? data.address : '',
					phone: data.phone ? data.phone : '',
					selectedValue: data.gender ? this.returnGender(data.gender) : 'male',
					startDate: data.birthday ? this.convertNumberToDate(data.birthday) : null,
				});
			});
			this.getCustomerData(id)
		}
	}

	returnGender = (gender) => {
		return gender === config.GENDER_MALE ? 'male' : 'female';
	}

	getCustomerData = (id) => {
		callApi('GET', config.ORDER_URL +'/customer/'+ id, null).then(res => {
			if(res && res.data.status){
				this.setState({
					customer_data: res.data.orders
				});	
			}
		});
	}
	
	onOpenModal = () => {
		this.setState({ open: true });
	};
	
	onCloseModal = () => {
		this.setState({ open: false });
	};

	convertNumberToDate = (date) => {
		// date => 2018-10-25 15:28:46
		var date_time = moment(date, "YYYY-MM-DD");
		return date_time;
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
   	}

	handleChangeDate = (date) => {
		const valueOfInput = date ? date.format('YYYY-MM-DD H:mm:ss') : null;
		this.setState({
			birthday: valueOfInput,
		  	startDate: date
		});
	}

	handleChange = name => event => {
		// Input, checkbox, Radio, Select
		var value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
		this.setState({
			gender: value === 'male' ? config.GENDER_MALE : config.GENDER_FEMALE,
			[name]: value
		});
	};

	onChangeForm (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		var {history} = this.props;
		var {id, username, firstname, lastname, email, phone, address, gender, birthday} = this.state;
		var data = { username: username, firstname: firstname, lastname: lastname, email: email, phone: phone, address: address, gender: gender, birthday: birthday };
		// console.log(data); return;
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			if(id) { //update
				callApi('PUT', config.CUSTOMER_URL + "/" + id, data).then(res => {
					Swal( 'Cập nhật thành công!', '', 'success')
					// history.goBack();
				});
			} else if(phone === '' && phone === '+84 ' && phone.length !== 15){
				Swal( 'Lỗi...', 'Số điẹn thoại không đúng định dạng!', 'error')
			} else { //create
				callApi('POST', config.CUSTOMER_URL, data).then(res => {
					if(res.data.id) {
						Swal( 'Thêm khách hàng thành công!', '', 'success')
						history.push("/customers/edit/"+res.data.id);
					} else {
						history.goBack();
					}
				});
			}
		} else {
			Swal( 'Lỗi...', '', 'error')
		}

		
	}

	handleAddService = (event) => {
		event.preventDefault();
		var {service, id, note}  = this.state;
		var data = {customer_id: id, product_category_id : service, note: note}
		if (id && typeof id === "number"){

			Swal({
				title: '',
				text: "Bạn có chắn chắn muốn thêm dịch vụ này",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Đồng ý'
			  }).then((result) => {
				if (result.value) {
					callApi('POST', config.ORDER_URL, data).then(res => {
						Swal('Thêm dịch vụ thành công','','success')
						this.onCloseModal();
						this.getCustomerData(id);
						const socket = socketIOClient(config.URL_SOCKET);
						socket.emit('change', 'quan test1') // change 'red' to this.state.color
					});
				}
			})
			  			
		}
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		if(this.state.customer_data) {
			var {customer_data, id} = this.state;
		}
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple ">
					<div className="grid-body no-border">
						<div className="col-lg-12 col-xs-12 col-md-12">

							<Link to="/orders" className="margin-right20">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								<i className="material-icons">arrow_back</i>
								</Button>	
							</Link>
							
							<div className="clearfix"></div> <br/>
							{customer_data && customer_data.length > 0 &&
							
								<CustomerData>
									{this.showCustomerData(customer_data, id)}
								</CustomerData>
							
							}
						</div>
					</div>
				</div>
			</CSSTransitionGroup>
		)
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

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps, null)(CustomerActionPage);
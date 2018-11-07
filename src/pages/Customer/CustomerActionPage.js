import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import callApi from './../../utils/apiCaller';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import Validator from 'react-forms-validator';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';
import CustomerData from './../../components/Customers/CustomerData';
import CustomerDataTr from './../../components/Customers/CustomerDataTr';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2'
import Radio from '@material-ui/core/Radio';
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
			callApi('GET', config.CUSTOMER_URL + id, null).then(res => {
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
		callApi('GET', config.ORDER_URL +'customer/'+ id, null).then(res => {
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
				callApi('PUT', config.CUSTOMER_URL + id, data).then(res => {
					Swal( 'Good job!', 'You clicked the button!', 'success')
					// history.goBack();
				});
			} else if(phone === '' && phone === '+84 ' && phone.length !== 15){
				Swal( 'Oops...', 'Your phone not incorrect format!', 'error')
			} else { //create
				callApi('POST', config.CUSTOMER_URL, data).then(res => {
					if(res.data.id) {
						Swal( 'Good job!', 'You clicked the button!', 'success')
						history.push("/customers/"+res.data.id+"/edit");
					} else {
						history.goBack();
					}
				});
			}
		} else {
			Swal( 'Oops...', 'Something went wrong!', 'error')
		}

		
	}

	handleAddService = (event) => {
		event.preventDefault();
		var {service, id, note}  = this.state;
		var data = {customer_id: id, product_category_id : service, note: note}
		if (id && typeof id === "number"){

			Swal({
				title: 'Are you sure?',
				text: "Are you sure you wish to add this item?",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Add it!'
			  }).then((result) => {
				if (result.value) {
					callApi('POST', config.ORDER_URL, data).then(res => {
						Swal('Good job!','You clicked the button!','success')
						this.onCloseModal();
						this.getCustomerData(id);
						const socket = socketIOClient("http://localhost:9999/");
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

						<Link to="/customers" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						{this.state.id  && this.state.id > 0 && 
							<Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={this.onOpenModal}>Add Service</Button>
						}
						<div className="clearfix"></div> <br/>
						<Modal open={this.state.open} onClose={this.onCloseModal} center>
							<h2>Add service for customer: <strong>{this.state.firstname + " " + this.state.lastname + "(" + this.state.phone + ")"}</strong></h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
								pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
								hendrerit risus, sed porttitor quam.
							</p>
								<div className="form-group">
									<div className="Service">
										<label>Service</label>
										<select
											className="form-control"
											name="service"
											value={this.state.service}
											onChange={this.onChangeForm}
										>
											<option value="25">Nha Khoa</option>
											<option value="26">Laser</option>
											<option value="27">Spa</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label>note</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.note} 
										onChange={this.onChangeForm} 
										name="note" 
										placeholder="note"/>
								</div>
							<p>
								<Button 
									className="btn btn-primary btn-cons" 
									variant="contained" 
									color="secondary" 
									onClick={this.handleAddService}>Add Service</Button>
							</p>
						</Modal>
						
					</div>
					<div className="col-lg-12 col-xs-12 col-md-12">
					<form noValidate onSubmit={this.handleFormSubmit}>
						<div className="col-md-6 col-lg-6">
							
							<div className="form-group">
								<label>FirstName</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.firstname} 
									onChange={this.onChangeForm} 
									name="firstname" 
									placeholder="firstname"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{firstname : this.state.firstname}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.email} 
									onChange={this.onChangeForm} 
									name="email" 
									placeholder="email"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{email : this.state.email}}
									validationRules={{required:true, email:true}} 
									validationMessages={{ required: "This field is required", email: "Not a valid email"}}/>
								
							</div>
							<div className="form-group">
									<label>Birthday</label>
									<DatePicker
										className="form-control"
										dateFormat="DD-MM-YYYY"
										placeholderText="Ex: 25-10-2018"
										name="birthday" 
										todayButton="Today"
										withPortal
										// peekNextMonth
										// showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										selected={this.state.startDate}
										onChange={this.handleChangeDate} 
									/>
									
							</div>
							<div className="form-group">
								<span>Male</span>
								<Radio
									checked={this.state.selectedValue === 'male'}
									onChange={this.handleChange('selectedValue')}
									value='male'
									name="gender"
									aria-label="male"
								/>
								<span>Female</span>
								<Radio
									checked={this.state.selectedValue === 'female'}
									onChange={this.handleChange('selectedValue')}
									value='female'
									name="gender"
									aria-label="female"
								/>
									
								
							</div>
						</div>
						<div className="col-md-6 col-lg-6">
							<div className="form-group">
								<label>LastName</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.lastname} 
									onChange={this.onChangeForm} 
									name="lastname" 
									placeholder="lastname"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{lastname : this.state.lastname}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
								
							</div>
							<div className="form-group">
								<label>Phone (Ex: +84 987654321)</label>
								{/* <Cleave className="input-numeral form-control" 
											placeholder="PHONE" 
											name="phone"
											value={this.state.phone} 
											options={{
												numericOnly: true,
												delimiter: '.',
												// prefix: '+84 ',
												// blocks: [7, 3, 3]
											}}
											onChange={this.onChangeForm}
										/> */}
								<div className="input-group transparent">
									<span className="input-group-addon">
										(+84)
									</span>
									<input 
										type="number" 
										className="form-control" 
										value={this.state.phone} 
										onChange={this.onChangeForm} 
										name="phone" 
										placeholder="phone"/>
								</div>
								
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{phone : this.state.phone}}
									validationRules={{required:true, minLength: 9, maxLength:9 }} 
									validationMessages={{ required: "This field is required", number: "Not a valid number", maxLength: "Not a valid Max length: 10 character", minLength: "Not a vaild min length is 9 character"}}/>
								
							</div>
							
							<div className="form-group">
								<label>Address</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.address} 
									onChange={this.onChangeForm} 
									name="address" 
									placeholder="address"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{address : this.state.address}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							</div>
							
						
						</div> 
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
							<Button type="submit" className="btn btn-primary btn-cons"  variant="contained" color="primary">
								Save <i className="material-icons">done_all</i>
							</Button>	
						</div>   
					</form>

				
				</div>
					</div>
				</div>
				<div className="grid simple ">
					{customer_data && customer_data.length > 0 &&
						<div className="grid-body no-border">
						<CustomerData>
							{this.showCustomerData(customer_data, id)}
						</CustomerData>
						</div>
					}
					
					
					
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
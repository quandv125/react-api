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
import { actUpdateCustomerRequest, actAddOrderRequest  } from '../../actions/index';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2'
import Radio from '@material-ui/core/Radio';
import socketIOClient from 'socket.io-client'
// import Cleave from 'cleave.js/react'; 123
import Select from 'react-select';
const options = [
	
	{
		value: '25', label: 'Nha Khoa'
	},
	{
		value: '26', label: 'Laser'
	},
	{
		value: '27', label: 'Spa'
	}
];


class CustomerActionPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: '',
			customerID: '',
			username: 'customer',
			firstname: '',
			lastname: '',
			email: '',
			address: '',
			phone: '',
			birthday: '',
			created_at: moment().format('YYYY-MM-DD H:mm:ss'),
			startDate: null,
			startCreated: null,
			gender: config.GENDER_MALE,
			isValidation: '',
			submitted: false,
			isFormValidationErrors : true,
			open: false,
			service: '25',
			customer_data: '',
			selectedValue: 'male',
			note: '',
			selectedServices: [options[0]],
			categories: []
		};
		// console.log(this.state.gender);
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
					customerID: data.customerID ? data.customerID  : '',
					username: data.username ? data.username : '',
					firstname: data.firstname ? data.firstname : '',
					lastname: data.lastname ? data.lastname : '',
					email: data.email ? data.email : '',
					address: data.address ? data.address : '',
					phone: data.phone ? data.phone : '',
					selectedServices: data.options ? data.options : [options[0]],
					selectedValue: data.gender ? this.returnGender(data.gender) : 'male',
					startDate: data.birthday ? this.convertNumberToDate(data.birthday) : null,
					startCreated: data.created_at ? this.convertNumberToDate(data.created_at) : null,
					created_at:  data.created_at ,
				});
			});
			callApi('GET', config.CATEGORY_URL , null).then(res => {
				var data = res.data;
				if(data.status){
					this.setState({
						categories: data.data
					});
				}
			});
			this.getCustomerData(id)
		}
		callApi('GET', config.CATEGORY_URL , null).then(res => {
			var data = res.data;
			if(data.status){
				this.setState({
					categories: data.data
				});
			}
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
		return yyyy+'-'+mm+'-'+dd;
	}	

	showCustomerService = () => {
		if (options !== '' && typeof options === 'object'){
			var {categories} = this.state;
			const options = [];
			if(categories && categories.length > 0){
				categories.map(data => options.push(
					{ value: data.id, label: data.title }
				));
			}
            return (<Select
                value={this.state.selectedServices}
                onChange={this.handleChangeServices}
                options={options}
				defaultValue={[options[0]]}
				isMulti={true}
            />);
		}
	}
	handleChangeServices = (selectedServices) => {
        this.setState({  selectedServices });
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

		if(date && date !== "0000-00-00 00:00:00"){
			var date_time = moment(date, "YYYY-MM-DD");
			return date_time;
		}
		return null;
		
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
   	}

	handleChangeDate = (date) => {
		const valueOfInput = date ? date.format('YYYY-MM-DD')+" "+moment().format('H:mm:ss') : null;
		this.setState({
			birthday: valueOfInput,
		  	startDate: date
		});
	}

	handleChangeCreated = (date) => {
		const valueOfInput = date ? date.format('YYYY-MM-DD')+" "+moment().format('H:mm:ss') : null;
		this.setState({
			created_at: valueOfInput,
		  	startCreated: date
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
		var {id, customerID,username, firstname, lastname, email, phone, address, gender, birthday, selectedServices, created_at} = this.state;
		var data = { customerID: customerID, username: username, firstname: firstname, lastname: lastname, email: email, phone: phone, address: address, gender: gender, birthday: birthday, selectedServices: selectedServices, created_at: created_at  };
		// console.log(data.created_at);
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			if(id) { //update
				
				callApi('PUT', config.CUSTOMER_URL + "/" + id, data).then(res => {
					Swal( 'Cập nhật thành công!', '', 'success')
					this.props.onUpdateCustomer(id, data);
					// history.goBack();
				});
			} else { //create
				callApi('POST', config.CUSTOMER_URL, data).then(res => {
					if(res.data && res.data.id) {
						this.props.onUpdateCustomer(res.data.id, data);
						Swal( 'Thêm khách hàng thành công!', '', 'success')
						history.push("/customers/edit/"+res.data.id);
					} else {
						history.goBack();
					}
				});
			}
		} else {
			Swal( 'Lỗi! Vui lòng kiểm tra lại...', '', 'error')
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
						this.props.onAddOrder();
						Swal('Thêm dịch vụ thành công','','success')
						this.onCloseModal();
						this.getCustomerData(id);
						const socket = socketIOClient(config.URL_SOCKET);
						socket.emit('change', service) 
					 });
				}
			})
			  			
		}
	}

	ShowCategories = () => {
		var {categories} = this.state;
		const options = [];
		if(categories && categories.length > 0){
			categories.map(data => options.push(
				<option key={data.id} value={data.id}>{data.title}</option>
			));
			return options;
		}else {
			return null;
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
							<Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={this.onOpenModal}>Thêm dịch vụ</Button>
						}
						<Link to="/customers/add" className="float-right">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								Thêm mới khách hàng
							</Button>					
						</Link>
						<div className="clearfix"></div> <br/>
						<Modal open={this.state.open} onClose={this.onCloseModal} center>
							<h2>Thêm dịch vụ cho khách hàng: <strong>{this.state.firstname + " " + this.state.lastname + "(" + this.state.phone + ")"}</strong></h2>
							<p>
								Thêm dịch vụ cho khách hàng. Sau khi thêm dịch vụ thông báo sẽ được chuyển đến phòng tương ứng
							</p>
								<div className="form-group">
									<div className="Service">
										<label>Dịch vụ</label>
										<select
											className="form-control"
											name="service"
											value={this.state.service}
											onChange={this.onChangeForm}
										>
											{this.ShowCategories()}
										</select>
									</div>
								</div>
								<div className="form-group">
									<label>Chú thích</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.note} 
										onChange={this.onChangeForm} 
										name="note" 
										placeholder="Chú thích"/>
								</div>
							<p>
								<Button 
									className="btn btn-primary btn-cons" 
									variant="contained" 
									color="secondary" 
									onClick={this.handleAddService}>Thêm dịch vụ</Button>
							</p>
						</Modal>
						
					</div>
					<div className="col-lg-12 col-xs-12 col-md-12">
					<form noValidate onSubmit={this.handleFormSubmit}>
						<div className="col-md-6 col-lg-6">
							<div className="form-group">
								<label>Mã khách hàng ( Nếu để trống mã khách hàng sẽ tự động tạo, tối đa 50 kí tự )</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.customerID} 
									onChange={this.onChangeForm} 
									name="customerID" 
									placeholder="Mã khách hàng"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{customerID : this.state.customerID}}
									validationRules={{ maxLength:50 }} 
									validationMessages={{  maxLength: "Độ dài tối đa là : 50 "}}/>
							</div>
							
							<div className="form-group">
								<label>Họ*( Không được để trống )</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.firstname} 
									onChange={this.onChangeForm} 
									name="firstname" 
									placeholder="Họ"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{firstname : this.state.firstname}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là : 10 "}}/>
							</div>
							
							<div className="form-group">
								<label>Tên*( Không được để trống )</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.lastname} 
									onChange={this.onChangeForm} 
									name="lastname" 
									placeholder="Tên"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{lastname : this.state.lastname}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là : 10 "}}/>
								
							</div>
							<div className="form-group">
								<label>Khách hàng thuộc dịch vụ</label>
								{this.showCustomerService()}
							</div>
							<div className="form-group">
								<span>Nữ</span>
								<Radio
									checked={this.state.selectedValue === 'male'}
									onChange={this.handleChange('selectedValue')}
									value='male'
									name="gender"
									aria-label="male"
								/>
								<span>Nam</span>
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
								<label>Email</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.email} 
									onChange={this.onChangeForm} 
									name="email" 
									placeholder="Email"/>
								{/* <Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{email : this.state.email}}
									validationRules={{required:true, email:true}} 
									validationMessages={{ required: "Trường này không được để trống", email: "Email không đúng định dạnh"}}/>
								 */}
							</div>
							
							<div className="form-group">
								<label>Số điện thoại (VD:  0987654321)</label>
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
										placeholder="Số điện thoại"/>
								</div>
{/* 								
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{phone : this.state.phone}}
									validationRules={{required:true, minLength: 10, maxLength:10 }} 
									validationMessages={{ required: "Trường này không được để trống", number: "Số diện thoại là chữ số", maxLength: "Độ dài tối đa là : 10 kí tự", minLength: "Độ dài tối thiểu là 10 kí tự"}}/>
								 */}
							</div>
							
							<div className="form-group">
								<label>Địa chỉ</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.address} 
									onChange={this.onChangeForm} 
									name="address" 
									placeholder="Địa chỉ"/>
								{/* <Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{address : this.state.address}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là : 10 "}}/> */}
							</div>
							
							<div className="form-group">
									<label>Ngày sinh</label>
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
									<label>Ngày tạo (Nếu để trống thì sẽ tự động tạo)</label>
									<DatePicker
										className="form-control"
										dateFormat="DD-MM-YYYY "
										placeholderText="Ex: 25-10-2018"
										name="created_at" 
										todayButton="Today"
										withPortal
										showYearDropdown
										dropdownMode="select"
										selected={this.state.startCreated}
										onChange={this.handleChangeCreated} 
									/>
									
							</div>
							

						</div> 
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{minHeight:100}}>
							<Button type="submit" className="btn btn-primary btn-cons"  variant="contained" color="primary">
								Lưu <i className="material-icons">done_all</i>
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

const mapDispatchToProps = (dispatch, props) => {
	return {
		onUpdateCustomer : (id, data) => {
			dispatch(actUpdateCustomerRequest(id, data));
		},
		onAddOrder : () => {
			dispatch(actAddOrderRequest());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActionPage);
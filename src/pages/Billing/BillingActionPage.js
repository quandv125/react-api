import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
import Cleave from 'cleave.js/react';
import { Link } from 'react-router-dom';
import * as config from '../../constants/config';
import callApi from '../../utils/apiCaller';
import Button from '@material-ui/core/Button';
import ModalCalling from '../../components/Customers/ModalCalling';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2'

class Billing extends Component {

	constructor(props){
		super(props);
		this.state = {
			order: [],
			billing: [],
			created_at: '',
			title: '',
			note: '',
			total: 0,
			payment: 0,
			indebtedness: 0,
			submitted: false,
			startDate: this.getToday(),
			isFormValidationErrors : true,
			user_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).id : '',
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			callApi('GET', config.BILLING_URL + "/order/" + id, null).then(res => {
				var data = res.data;
				console.log(data);
				this.setState({
					total: data.data.total ? data.data.total : this.state.total,
					order: data.data,
					billing: data.billing,
					indebtedness: data.billing ? parseInt(data.billing.indebtedness) : this.state.indebtedness,
					payment: data.billing ? parseInt(data.billing.money_payment) : this.state.payment,
					note: data.billing ? (data.billing.note) : this.state.note,
					created_at: data.billing ? (data.billing.created_at) : this.state.created_at,

				});
			});
		}
	}

	onChangeForm (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		if(name === 'payment'){	
			value = parseInt(value.replace(',', '').replace(/[^0-9.]+/, ''));
			this.setState({
				indebtedness: this.state.total - value
			});
		}
		this.setState({
			[name]: value
		});
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
	}

	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			// var {history} = this.props;
			var {order, user_id, total, payment, indebtedness, note, created_at} = this.state;
			var data = { user_id: user_id, customer_id: order.customer_id ,total_payable: total, money_payment: payment, indebtedness: indebtedness, note: note, created_at: created_at ? created_at : moment().format("YYYY-MM-DD H:mm:ss") };
			
			if( order.id ) { //update
				callApi('PUT', config.BILLING_URL  + "/" + order.id, data).then( res => {
					console.log(res);
					Swal( 'Cập nhật thành công!', '', 'success')
					// history.push("/category");
				});
			} else { //create
				callApi('POST', config.BILLING_URL, data ).then( res => {
					// history.goBack();
				});
			}
		}
	}
	
	getToday = () => {
		var tempDate = new Date();
		// var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
		let day = tempDate.getDate() < 10 ? "0"+tempDate.getDate() : tempDate.getDate();
		let month = (tempDate.getMonth()+1);
		let year = tempDate.getFullYear();
		var date = day + "-" + month + "-" + year ;
		return date;
	}

	handleChangeDate = (date) => {
		const valueOfInput = date ? date.format('YYYY-MM-DD H:mm:ss') : null;
		this.setState({
			created_at: valueOfInput,
		  	startDate: date
		});
	}

	render() {
		var {order, billing} = this.state;
		var money_payment = billing ? billing.money_payment : this.state.payment;
		// console.log(order);
		// console.log(billing);
		return (

			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<div className="grid simple">
					<div className="grid-body no-border">
						<Link to="/billing" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<Link to={"/orders/invoice/"+ order.id}>
							<Button type="submit" className="btn btn-primary btn-cons " variant="contained" color="primary" >
								Hóa đơn
							</Button>	
						</Link>
						<ModalCalling />
						<div className="clearfix"></div>
						<div className="col-lg-3 col-sm-3 col-xs-3 col-md-3"></div>
						<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
							<form noValidate onSubmit={this.handleFormSubmit}>
								<div className="form-group">
									<label>Mã giao dịch</label>
									<input 
										type="text" 
										className="form-control" 
										disabled={true}
										value={order.transaction_id} 
										onChange={this.onChangeForm} 
										name="title" 
										placeholder="Tên loại dịch vụ"/>
									
							
								</div>
								<div className="form-group">
										<label>Thời gian</label>
										<DatePicker
											className="form-control"
											dateFormat="DD-MM-YYYY"
											placeholderText="Ex: 25-10-2018"
											name="created_at" 
											todayButton="Today"
											// withPortal
											// peekNextMonth
											// showMonthDropdown
											// showYearDropdown
											dropdownMode="select"
											// selected={this.state.startDate}
											selected={this.state.startDate ? moment(this.state.startDate, 'DD-MM-YYYY') : moment()}

											onChange={this.handleChangeDate} 
										/>
										
								</div>
								<div className="form-group">
									<label>Tên người nộp</label>
									<input 
										type="text" 
										disabled={true}
										className="form-control" 
										value={order.customer_name} 
										onChange={this.onChangeForm} 
										name="customer_name" 
										placeholder="Tên loại dịch vụ"/>
							
								</div>
								<div className="form-group">
									<label>Số tiền cần phải thanh toán</label>
									<Cleave className="input-numeral form-control" 
											placeholder="Nhập giá của sản phẩm" 
											disabled={true}
											name="payment"
											value={this.state.total} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											// onChange={this.onChangeForm}
										/>
									{/* <input 
										type="text" 
										className="form-control" 
										value={order.total} 
										onChange={this.onChangeForm} 
										name="total" 
										placeholder="Số tiền cần phải thanh toán"/> */}
									
								</div>

								<div className="form-group">
									<label>Số tiền thanh toán </label>
									<Cleave className="input-numeral form-control" 
											placeholder="Nhập giá của sản phẩm" 
											name="payment"
											value={money_payment} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											onChange={this.onChangeForm}
										/>
										<Validator 
											isValidationError={this.isValidationError}
											isFormSubmitted={this.state.submitted} 
											reference={{payment : this.state.payment}}
											validationRules={{ required:true }} 
											validationMessages={{ required: "Trường này không được để trống"}}/>
									{/* <input 
										type="text" 
										className="form-control" 
										value={this.state.payment} 
										onChange={this.onChangeForm} 
										name="payment" 
										placeholder="Số tiền thanh toán"/>
							 */}
								</div>

								<div className="form-group">
									<label>Số tiền nợ</label>
									<Cleave className="input-numeral form-control" 
											placeholder="Nhập giá của sản phẩm" 
											disabled={true}
											name="payment"
											value={this.state.indebtedness} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											// onChange={this.onChangeForm}
										/>
							
								</div>

								{/* <div className="form-group">
									<label>Loại tiền tệ </label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.currency} 
										onChange={this.onChangeForm} 
										name="desc" 
										placeholder="Loại tiền tệ"/>
							
								</div> */}

								<div className="form-group">
									<label>Ghi chú</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.note} 
										onChange={this.onChangeForm} 
										name="note" 
										placeholder="Ghi chú"/>
							
								</div>
							
								<Button type="submit" variant="contained" color="primary">Lưu</Button>

							</form>
						</div>
						
					</div>
				</div>
			</CSSTransitionGroup>
		);
	} // end render

	
}

export default Billing;

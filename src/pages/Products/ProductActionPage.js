import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
import Cleave from 'cleave.js/react';
import Button from '@material-ui/core/Button';
import Validator from 'react-forms-validator';
import Checkbox from '@material-ui/core/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
// Note: include <ToastContainer/>
import 'react-toastify/dist/ReactToastify.css';

class ProductActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			categories: [],
			services: [],
			id: '',
			sku: '',
			title: '',
			price: '',
			price_max: '',
			currency: '',
			category_id: '25',
			service_id: '19',
			unit: '',
			quantity: 0,
			time: '',
			submitted: false,
			isFormValidationErrors : true,
			is_publish: false
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
	}

	componentWillMount(){
		callApi('GET', config.CATEGORY_URL, null).then(res => {
			this.setState({
				category_id: res.data.data[0].id,
				categories: res.data.data
			});
		});
		callApi('GET', config.SERVICE_URL, null).then(res => {
			this.setState({
				service_id: res.data.data[0].id,
				services: res.data.data
			});
		});
	}


	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			callApi('GET', config.PRODUCT_URL + "/" +id, null).then(res => {
				var data = res.data.data;
				console.log(data.service_id);
				this.setState({
					id: data.id ? data.id : '',
					sku: data.sku ? data.sku : '',
					title: data.title ? data.title : '',
					price: data.price ? data.price : '',
					price_max: data.price_max ? data.price_max : '',
					quantity: data.quantity ? data.quantity : '',
					unit: data.unit ? data.unit : '',
					currency: data.currency ? data.currency : '',
					category_id: data.category_id ? data.category_id : '',
					service_id: data.service_id ? data.service_id : '',
					note: data.note ? data.note : '',
					is_publish: data.is_publish? true : false,
					time: data.time? data.time : ''

				});
			});
		}
	}

	onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});

		if(name === 'category_id'){
			callApi('GET', config.SERVICE_URL + "/get-service-by-category/"+ value, null).then(res => {
				console.log(res);
				this.setState({
					services: res.data.data
				});
			});
		}
	}


	handleChange = name => event => {
		var value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
		this.setState({
			[name]: value
		});
	};


	priceVal = (price) => {
		return parseFloat(price.replace(/[^0-9-.]/g, ''));
	};

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
	}
	   
	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			// var {history} = this.props;
			var {id, sku, title, price, price_max, quantity, unit, is_publish, category_id, service_id,currency, note, time} = this.state;
			var data = {sku: sku, title: title, price: this.priceVal(price),price_max: this.priceVal(price_max), quantity: quantity,  service_id: service_id,  category_id: category_id, time: time,currency: currency, note: note, unit: unit, is_publish: is_publish ? true : false };
			// console.log(data);return;
			if(id) { //update
				callApi('PUT', config.PRODUCT_URL  + "/" + id, data).then( res => {
					console.log(res);
					toast.success("Cập nhật sản phẩm thành công", { position: "top-right", hideProgressBar: false,	closeOnClick: true });
					// history.push("/products");
				});
			} else { //create
				callApi('POST', config.PRODUCT_URL, data ).then( res => {
					toast.success("Thêm mới sản phẩm thành công !", { position: "top-right", hideProgressBar: false,	closeOnClick: true });
					//C1 // history.push("/products-list");
					// console.log(res);
					// history.push("/products");
					//C2: redirect 
					// history.goBack();
				});
			}
		}
	}

	render() {
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/products" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<Link to="/products/add" className="float-right">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
									Thêm sản phẩm
								</Button>
							</Link>
						<ToastContainer />
						<form noValidate onSubmit={this.handleFormSubmit}>
							<legend>Sản phẩm</legend>
							<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
									
									<div className="form-group">
										<label>Tên sản phẩm*</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.title} 
											onChange={this.onChangeForm} 
											name="title" 
											placeholder="Tên sản phẩm"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{title : this.state.title}}
												validationRules={{required:true}} 
												validationMessages={{ required: "Trường này không được để trống"}}/>
									</div>
									<div className="form-group">
										<label>Giá*</label>
										<Cleave className="input-numeral form-control" 
											placeholder="Nhập giá của sản phẩm" 
											name="price"
											value={this.state.price} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											onChange={this.onChangeForm}
										/>
										<Validator 
											isValidationError={this.isValidationError}
											isFormSubmitted={this.state.submitted} 
											reference={{price : this.state.price}}
											validationRules={{ required:true }} 
											validationMessages={{ required: "Trường này không được để trống"}}/>
							
									</div>
									<div className="form-group">
										<label>Giá</label>
										<Cleave className="input-numeral form-control" 
											placeholder="Nhập giá của sản phẩm" 
											name="price_max"
											value={this.state.price_max} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											onChange={this.onChangeForm}
										/>
										<Validator 
											isValidationError={this.isValidationError}
											isFormSubmitted={this.state.submitted} 
											reference={{price_max : this.state.price_max}}
											validationRules={{ maxLength: 50 }} 
											validationMessages={{ maxLength: "Độ dài tối đa 50 kí tự"}}/>
							
									</div>
							
									<div className="form-group">
										<label>Số lượng</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.quantity} 
											onChange={this.onChangeForm} 
											name="quantity" 
											placeholder="quantity"/>
											
							
									</div>
									<div className="form-group">
										<label>Đơn vị</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.unit} 
											onChange={this.onChangeForm} 
											name="unit" 
											placeholder="Đơn vị"/>
									
							
									</div>
							</div>
							<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
													
									
									<div className="form-group">
										<label>Thời gian (Dành cho sản phẩm yêu cầu thời gian hoàn thành)</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.time} 
											onChange={this.onChangeForm} 
											name="time" 
											placeholder="Thời gian"/>
									</div>
									<div className="form-group">
										<div className="currency">
											<label>Loại tiền</label>
											<select
												className="form-control"
												name="currency"
												value={this.state.currency} 
												onChange={this.onChangeForm}
											>
												<option value={config.CURRENCY_VND}>{config.CURRENCY_VND}</option>
												<option value={config.CURRENCY_USD}>{config.CURRENCY_USD}</option>
											</select>
										</div>
									</div>

									<div className="form-group">
										<div className="category_id">
											<label>Dịch vụ</label>
											<select 
												className="form-control" 
												name="category_id" 
												value={this.state.category_id} 
												onChange={this.onChangeForm}
											>
												{this.showCategory()}
											</select>
										</div>
									</div>

									<div className="form-group">
										<div className="service_id">
											<label>Danh mục</label>
											<select 
												className="form-control" 
												name="service_id" 
												value={this.state.service_id} 
												onChange={this.onChangeForm}
											>
												{this.showService()}
											</select>
										</div>
									</div>

									<div className="form-group">
										<label>Kích hoạt</label>
										{/* <div className="checkbox1">
											<input 
												type="checkbox" 
												value={this.state.is_publish} 
												checked={this.state.is_publish} 
												onChange={this.onChangeForm} 
												name="is_publish"/>
											
										</div> */}
										<div>
											<Checkbox
												checked={this.state.is_publish}
												onChange={this.handleChange('is_publish')}
												value="is_publish"
											/>
											
										</div>
									</div>
									{/* <div className="form-group">
										<label>note</label>
										
										<textarea name="note" id="input" onChange={this.onChangeForm} value={this.state.note}  className="form-control" rows="5">
											{this.state.note} 
										</textarea>
										
									</div> */}

							</div>
							<div className="col-lg-12 col-md-12">
									<Button type="submit" variant="contained" color="primary">Lưu</Button>
							</div>
							</form>
					</div>
				</div>
			</CSSTransitionGroup>
		);
	} // end render

	showCategory = () => {
		const options = [];
		const {categories} = this.state;
		categories.map(data => options.push(
			<option key={data.id} value={data.id}>{data.title}</option>
		));
		return options;
	}

	showService = () => {
		const options = [];
		const {services} = this.state;
		services.map(data => options.push(
			<option key={data.id} value={data.id}>{data.title}</option>
		));
		return options;
	}

}

export default ProductActionPage;

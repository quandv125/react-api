import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
import Cleave from 'cleave.js/react';
import Button from '@material-ui/core/Button';
import Validator from 'react-forms-validator';
import Checkbox from '@material-ui/core/Checkbox';

class ProductActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			categories: [],
			id: '',
			sku: '',
			title: '',
			price: '',
			currency: '',
			category_id: '',
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
				categories: res.data.data
			});
		});
	}


	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			callApi('GET', config.PRODUCT_URL+id, null).then(res => {
				var data = res.data.data;
				this.setState({
					id: data.id ? data.id : '',
					sku: data.sku ? data.sku : '',
					title: data.title ? data.title : '',
					price: data.price ? data.price : '',
					quantity: data.quantity ? data.quantity : '',
					unit: data.unit ? data.unit : '',
					currency: data.currency ? data.currency : '',
					category_id: data.category_id ? data.category_id : '',
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
			var {history} = this.props;
			var {id, sku, title, price, quantity, unit, is_publish, category_id,currency, note, time} = this.state;
			var data = {sku: sku, title: title, price: this.priceVal(price), quantity: quantity,  category_id: category_id, time: time,currency: currency, note: note, unit: unit, is_publish: is_publish ? true : false };
			if(id) { //update
				callApi('PUT', config.PRODUCT_URL + id, data).then( res => {
					history.push("/products");
				});
			} else { //create
				callApi('POST', config.PRODUCT_URL, data ).then( res => {
					//C1 // history.push("/products-list");
					// console.log(res);
					// history.push("/products");
					//C2: redirect 
					history.goBack();
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
						<form noValidate onSubmit={this.handleFormSubmit}>
							<legend>Products</legend>
							<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
									
									<div className="form-group">
										<label>title</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.title} 
											onChange={this.onChangeForm} 
											name="title" 
											placeholder="title"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{firstname : this.state.title}}
												validationRules={{required:true, maxLength:50}} 
												validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
									</div>
									<div className="form-group">
										<label>Price</label>
										<Cleave className="input-numeral form-control" 
											placeholder="Enter numeral" 
											name="price"
											value={this.state.price} 
											options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
											onChange={this.onChangeForm}
										/>
										<Validator 
											isValidationError={this.isValidationError}
											isFormSubmitted={this.state.submitted} 
											reference={{firstname : this.state.price}}
											validationRules={{ required:true }} 
											validationMessages={{ required: "This field is required"}}/>
							
									</div>
									<div className="form-group">
										<label>quantity</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.quantity} 
											onChange={this.onChangeForm} 
											name="quantity" 
											placeholder="quantity"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{firstname : this.state.quantity}}
												validationRules={{required:true}} 
												validationMessages={{ required: "This field is required"}}/>
							
									</div>
									<div className="form-group">
										<label>unit</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.unit} 
											onChange={this.onChangeForm} 
											name="unit" 
											placeholder="unit"/>
										<Validator 
											isValidationError={this.isValidationError}
											isFormSubmitted={this.state.submitted} 
											reference={{firstname : this.state.unit}}
											validationRules={{required:true}} 
											validationMessages={{ required: "This field is required"}}/>
							
									</div>
							</div>
							<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
													
									
									<div className="form-group">
										<label>time</label>
										<input 
											type="text" 
											className="form-control" 
											value={this.state.time} 
											onChange={this.onChangeForm} 
											name="time" 
											placeholder="time"/>
									</div>
									<div className="form-group">
										<div className="currency">
											<label>currency</label>
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
											<label>category_id</label>
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
										<label>Publish</label>
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
									<Button type="submit" variant="contained" color="primary">Save</Button>
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

}

export default ProductActionPage;

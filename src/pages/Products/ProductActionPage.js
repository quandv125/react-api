import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
import Cleave from 'cleave.js/react';

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
			is_publish: 1,
			note: '',
			time: ''
		};
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
					is_publish: data.is_publish? data.is_publish : '',
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

	priceVal = (price) => {
		return parseFloat(price.replace(/[^0-9-.]/g, ''));
	};

	onSave = (event) => {
		event.preventDefault();
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

	render() {
		
		return (
			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<div>
					<div className="col-lg-3 col-sm-3 col-xs-3 col-md-3">
					</div>
					<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
						
						<form onSubmit={this.onSave}>
							<legend>Form title</legend>
						
							<div className="form-group">
								<label>sku</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.sku} 
									onChange={this.onChangeForm} 
									name="sku" 
									placeholder="sku"/>
							</div>
							<div className="form-group">
								<label>title</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.title} 
									onChange={this.onChangeForm} 
									name="title" 
									placeholder="title"/>
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
							</div>
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
								<div className="checkbox">
									<label>
										<input 
											type="checkbox" 
											value={this.state.is_publish} 
											checked={this.state.is_publish} 
											onChange={this.onChangeForm} 
											name="is_publish"/>
										Publish
									</label>
								</div>
							</div>
							<div className="form-group">
								<label>note</label>
								
								<textarea name="note" id="input" onChange={this.onChangeForm} value={this.state.note}  className="form-control" rows="5">
									{this.state.note} 
								</textarea>
								
							</div>

							<button type="submit" className="btn btn-primary margin-right-10">Save</button>
							<Link to="/products" className="btn btn-success">
									Back
							</Link>
						</form>
						<br/><br/>
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

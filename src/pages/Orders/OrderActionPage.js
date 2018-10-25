import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import { Link } from 'react-router-dom';
import * as config from '../../constants/config';
import callApi from '../../utils/apiCaller';
class OrderActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			id: '',
			sku: '',
			title: '',
			price: '',
			unit: '',
			quantity: 0,
			is_publish: 1
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			
			callApi('GET', config.ORDER_URL+id, null).then(res => {
				var data = res.data.data;
				console.log(data);
				this.setState({
					id: data.id ? data.id : '',
					sku: data.sku ? data.sku : '',
					title: data.title ? data.title : '',
					price: data.price ? data.price : '',
					quantity: data.quantity ? data.quantity : '',
					unit: data.unit ? data.unit : '',
					is_publish: data.is_publish? data.is_publish : ''
				});
			});
		}
	}

	onChangeFrom (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

	onSave (event) {
		event.preventDefault();

		var {history} = this.props;
		var {id, sku, title, price, quantity, unit, is_publish} = this.state;
		var data = {sku: sku, title: title, price: price, quantity: quantity, unit: unit, is_publish: is_publish ? true : false };
		if(id) { //update
			
			callApi('PUT', config.ORDER_URL + id, data).then( res => {
				console.log(res);
				history.push("/orders");
			});
		} else { //create
			callApi('POST', config.ORDER_URL, data ).then( res => {
				//C1 // history.push("/orders-list");
				// console.log(res);
				// history.push("/orders");
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
									onChange={this.onChangeFrom} 
									name="sku" 
									placeholder="sku"/>
							</div>
							<div className="form-group">
								<label>title</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.title} 
									onChange={this.onChangeFrom} 
									name="title" 
									placeholder="title"/>
							</div>
							<div className="form-group">
								<label>Price</label>
								<input 
									type="number" 
									className="form-control" 
									value={this.state.price} 
									onChange={this.onChangeFrom} 
									name="price" 
									placeholder="price"/>
							</div>
							<div className="form-group">
								<label>quantity</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.quantity} 
									onChange={this.onChangeFrom} 
									name="quantity" 
									placeholder="quantity"/>
							</div>
							<div className="form-group">
								<label>unit</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.unit} 
									onChange={this.onChangeFrom} 
									name="unit" 
									placeholder="unit"/>
							</div>
							<div className="form-group">
								<label>Publish</label>
								<div className="checkbox">
									<label>
										<input 
											type="checkbox" 
											value={this.state.is_publish} 
											checked={this.state.is_publish} 
											onChange={this.onChangeFrom} 
											name="is_publish"/>
										Publish
									</label>
								</div>
								
							</div>
							
							<button type="submit" className="btn btn-primary margin-right-10">Save</button>
							<Link to="/orders" className="btn btn-success">
									Back
							</Link>
						</form>
					</div>
				</div>
				</CSSTransitionGroup>
		);
	} // end render

	
}

export default OrderActionPage;

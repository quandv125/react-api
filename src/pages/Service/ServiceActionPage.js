import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
import { Link } from 'react-router-dom';
import * as config from '../../constants/config';
import callApi from '../../utils/apiCaller';
import Button from '@material-ui/core/Button';

class ServiceActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			id: '',
			title: '',
			desc: '',
			product_category_id: '', 
			categories: [],
			submitted: false,
			isFormValidationErrors : true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
		
	}

	componentDidMount(){
		callApi('GET', config.CATEGORY_URL, null).then(res => {
			this.setState({
				categories: res.data.data
			});
		});
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			
			callApi('GET', config.SERVICE_URL + "/" + id, null).then(res => {
				var data = res.data.data;
				this.setState({
					id: data.id,
					product_category_id: data.product_category_id ? data.product_category_id : '',
					title: data.title ? data.title : '',
					desc: data.desc ? data.desc : ''
				});
			});
			
		}
		
	}

	showCategory = () => {
		const options = [];
		const {categories} = this.state;
		categories.map(data => options.push(
			<option key={data.id} value={data.id}>{data.title}</option>
		));
		return options;
	}

	onChangeForm (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
		console.log(name, value);
		
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
	}

	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			var {history} = this.props;
			var {id, title, desc, product_category_id} = this.state;
			var data = { title: title, desc: desc, product_category_id:product_category_id };
			if( id ) { //update
				console.log(data);
				callApi('PUT', config.SERVICE_URL  + "/" + id, data).then( res => {
					console.log(res);
					// history.push("/service");
				});
			} else { //create
				callApi('POST', config.SERVICE_URL, data ).then( res => {
					history.goBack();
				});
			}
		}
	}

	render() {
		return (

			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/service" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<div className="clearfix"></div>
						<div className="col-lg-3 col-sm-3 col-xs-3 col-md-3"></div>
						<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
							<form noValidate onSubmit={this.handleFormSubmit}>
							
								<div className="form-group">
									<label>Tên danh mục</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.title} 
										onChange={this.onChangeForm} 
										name="title" 
										placeholder="Tên danh mục"/>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{firstname : this.state.title}}
										validationRules={{required:true, maxLength:50}} 
										validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							
								</div>
								<div className="form-group">
										<div className="product_category_id">
											<label>Dịch vụ</label>
											<select 
												className="form-control" 
												name="product_category_id" 
												value={this.state.product_category_id} 
												onChange={this.onChangeForm}
											>
												{this.showCategory()}
											</select>
										</div>
									</div>
								<div className="form-group">
									<label>Mô tả</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.desc} 
										onChange={this.onChangeForm} 
										name="desc" 
										placeholder="Mô tả"/>
									
								</div>
							
								<Button type="submit" variant="contained" color="primary">Save</Button>

							</form>
						</div>
						
					</div>
				</div>
			</CSSTransitionGroup>
		);
	} // end render

	
}

export default ServiceActionPage;

import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
import Button from '@material-ui/core/Button';

class SmsCategoryActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			id: '',
			title: '',
			desc: '',
			submitted: false,
			isFormValidationErrors : true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			console.log(id);
			callApi('GET', config.SMS_CATEGORY_URL + "/" +id, null).then(res => {
				var data = res.data.data;

				this.setState({
					id: data.id,
					title: data.title ? data.title : '',
					desc: data.desc ? data.desc : ''
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

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
	}

	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		let { isFormValidationErrors } = this.state;
		// console.log(isFormValidationErrors);
		if ( !isFormValidationErrors ){
			var {history} = this.props;
			var {id, title, desc} = this.state;
			var data = { title: title, desc: desc };
			if( id ) { //update
				callApi('PUT', config.SMS_CATEGORY_URL  + "/" + id, data).then( res => {
					history.push("/sms-category");
				});
			} else { //create
				callApi('POST', config.SMS_CATEGORY_URL, data ).then( res => {
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
						<Link to="/sms-category" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<div className="clearfix"></div>
						<div className="col-lg-3 col-sm-3 col-xs-3 col-md-3"></div>
						<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
							<form noValidate onSubmit={this.handleFormSubmit}>
							
								<div className="form-group">
									<label>Title</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.title} 
										onChange={this.onChangeFrom} 
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
									<label>Content</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.desc} 
										onChange={this.onChangeFrom} 
										name="desc"
										placeholder="desc"/>
									
							
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

export default SmsCategoryActionPage;

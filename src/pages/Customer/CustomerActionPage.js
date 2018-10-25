import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import callApi from './../../utils/apiCaller';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import Validator from 'react-forms-validator';

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
			gender: config.GENDER_FEMALE,
			isValidation: '',
			isFormValidationErrors : true
		
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
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
					gender: data.gender ? data.gender : '',
					birthday: data.birthday ? this.convertNumberToDate(data.birthday) : '',
				});
			});
		}
	}

	convertNumberToDate = (number) => {
		var myDate = new Date(number*1000);
		return myDate.toISOString().slice(0,10).replace(/-/g,"-");		
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
   	}

	onChangeForm (event) {
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
		var {id, username, firstname, lastname, email, phone, address, gender, birthday} = this.state;
		var data = { username: username, firstname: firstname, lastname: lastname, email: email, phone: phone, address: address, gender: gender, birthday: birthday };
        if ( !this.state.isFormValidationErrors ){
			if(id) { //update
				callApi('PUT', config.CUSTOMER_URL + id, data).then(res => {
					history.goBack();
				});
			} else { //create
				callApi('POST', config.CUSTOMER_URL, data).then(res => {
					history.goBack();
				});
			}
        }
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div>
					<div className="col-lg-3 col-xs-3 col-md-3"></div>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						
						<form noValidate  >
							<legend>Form title</legend>
							<div className="form-group">
								<label>UserName</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.username} 
									onChange={this.onChangeForm} 
									name="username" 
									placeholder="username"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{username : this.state.username}}
									validationRules={{required:true, minLength: 5,maxLength:50}} 
									validationMessages={{ required: "This field is required", minLength: "Not a valid Min length: 5 ",maxLength: "Not a valid Max length: 50 "}}/>
							</div>
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
								<label>Phone</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.phone} 
									onChange={this.onChangeForm} 
									name="phone" 
									placeholder="phone"/>
								 <Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{phone : this.state.phone}}
									validationRules={{required:true, number:true, minLength: 10,maxLength:11}} 
									validationMessages={{ required: "This field is required", number: "Not a valid number", maxLength: "Not a valid Max length: 11 character", minLength: "Not a vaild min length is 10 character"}}/>
								
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
							<div className="form-group">
								<label>Birthday</label>
								<input 
									type="date" 
									className="form-control" 
									value={this.state.birthday} 
									onChange={this.onChangeForm} 
									name="birthday" 
									placeholder="birthday"/>
									
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{birthday : this.state.birthday}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							</div>
							
							<div className="form-group">
								<div className="gender">
									<label>gender</label>
									<select
										className="form-control"
										name="gender"
										value={this.state.gender}
										onChange={this.onChangeForm}
									>
										<option value={config.GENDER_MALE}>Male</option>
										<option value={config.GENDER_FEMALE}>Female</option>
										
									</select>
								
								</div>
							</div>
							
							<br/><br/>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
								<button type="submit" className="btn btn-primary margin-right-10" onClick={this.onSave}>Save</button>

								<Link to="/customers" className="btn btn-success">
									Back
								</Link>
							</div>
							
							
							
						</form>
					</div>    
				</div>
			</CSSTransitionGroup>

		)
	}
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps, null)(CustomerActionPage);
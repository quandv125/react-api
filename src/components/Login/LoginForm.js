import React, { Component } from 'react';
import Validator from 'react-forms-validator';
import { connect } from 'react-redux';
import './../../App.css';
import {actAddUserRequest, actEditUserRequest, actGetUserRequest} from './../../actions/index';
class UserAddPage extends Component {
    constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
        this.flag= true;
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
		this.setState( { submitted:true } );
		// var {history} = this.props;
        // var {id, username, firstname, lastname, email, job, phone, address, actived, gender} = this.state;
		// var data = { username: username, firstname: firstname, lastname: lastname, email: email, job: job, phone: phone, address: address, gender: gender, actived: actived? config.ACTIVED : config.DEACTIVED };
		
		// this.setState( { submitted:true } );
        // let { isFormValidationErrors } = this.state;
        // if ( !isFormValidationErrors ){
		// 	if(id) { //update
		// 		this.props.onEditUser(data, id);
		// 		history.goBack();
		// 	} else { //create
		// 		this.props.onAddUser(data);
		// 		history.goBack();
		// 	}
        // }
	}

	render() {
		
		return (
            
            <div className="container-center">
                
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			
					<form noValidate onSubmit={this.onSave}>
                    <div className="imgcontainer">
                       Login Form
                    </div>

						<div className="form-group">
							<label>UserName</label>
							<input 
								type="text" 
								value={this.state.username} 
								onChange={this.onChangeForm} 
								name="username" 
								placeholder="UserName"/>
							<Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={this.state.submitted} 
                                reference={{username : this.state.username}}
                                validationRules={{required:true, minLength: 5,maxLength:10}} 
                                validationMessages={{ required: "This field is required", minLength: "Not a valid Min length: 5 ",maxLength: "Not a valid Max length: 10 "}}/>
						</div>
						<div className="form-group">
							<label>password</label>
							<input 
								type="text" 
								value={this.state.password} 
								onChange={this.onChangeForm} 
								name="password" 
								placeholder="password"/>
							<Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={this.state.submitted} 
                                reference={{password : this.state.password}}
                                validationRules={{required:true, maxLength:50}} 
                                validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
						</div>
					
						<button type="submit" >Login</button>
                        <label>
                            <input type="checkbox" name="remember"/> Remember me
                        </label>
                       <br/>
                            <button type="button" className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot password?</span>
                      
					</form>
				
			</div>

    </div>

		);
	} // end render
	
}

const mapStateToProps = state => {
	
	return {
		user: state.user,
		users: state.users,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddUser : (user) => {
			dispatch(actAddUserRequest(user));
		}, 
		onEditUser : (user, id) => {
			dispatch(actEditUserRequest(user, id));
		},
		getUserId : (id) => {
			dispatch(actGetUserRequest(id));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddPage);
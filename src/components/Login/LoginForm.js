import React, { Component } from 'react';
import Validator from 'react-forms-validator';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import './../../App.css';
import { actLoginRequest } from './../../actions/index';
// import Button from '@material-ui/core/Button';
import { MSG_LOGIN, ISLOGIN } from './../../constants/config';
class UserAddPage extends Component {
    constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			loginError: '',
			messages: MSG_LOGIN,
			isLogin: ISLOGIN,
		};
		
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
		this.showMessageError = this.showMessageError.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.flag = true;
	}

	componentWillReceiveProps(nextprops){
		if(nextprops.authentication.loggedIn === false){
			this.setState({ 
				loginError: 'false',
				messages: nextprops.authentication.msg ? nextprops.authentication.msg : this.state.messages
			 });
		} else {
			this.setState({
				isLogin: nextprops.authentication.loggedIn,
			});
		}
	}
	
	
	render() {
		// if(this.state.isLogin){
        //     return <Redirect to={{ pathname: "/"}}/>;
		// }
		
		return (
			<div>
				{this.showMessageError()}
				<div className="div-center">
					<div className="content">
						<form noValidate onSubmit={this.onSave}>
							<div className="imgcontainer">
								<h3>Login</h3>
							</div>
							<div className="form-group">
								<input 
									type="text" 
									value={this.state.email} 
									onChange={this.onChangeForm} 
									name="email" 
									placeholder="Name"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{email : this.state.email}}
									validationRules={{required: true, minLength: 5,maxLength: 50}} 
									validationMessages={{ required: "This field is required", minLength: "Not a valid Min length: 5 ",maxLength: "Not a valid Max length: 10 "}}/>
							</div>
							<div className="form-group">
								<input 
									type="password" 
									value={this.state.password} 
									onChange={this.onChangeForm} 
									name="password" 
									placeholder="Password"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{password : this.state.password}}
									validationRules={{required: true, maxLength: 50}} 
									validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
								<button type="submit" variant="contained" style={ styles.buttonLogin } color="primary">
									Submit
								</button>
						
							</div>
							
							<br/>
							{/* <label>
								<input type="checkbox" name="remember"/> Remember me
							</label>
							
							<span className="forgot-password">Forgot password?</span>
						 */}
						</form>
				
					</div>
				
				</div>
			</div>
		);
	} // end render

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
   	}

	onChangeForm (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked : target.value;
		this.setState({
			[name]: value
        });
	}

	onSave (event) {
		event.preventDefault();
		var {email, password} = this.state;
		var data = { email: email, password: password};
		if(email !== '' && password !== '' && !this.state.isFormValidationErrors){
			this.props.onLogin(data);
		} else {
			this.setState({ loginError: 'false', messages: MSG_LOGIN });
		}
	}

	showMessageError() {
		if( this.state.loginError && this.state.loginError === 'false' ) {
			return 	<div className="alert alert-danger"> {this.state.messages} </div>;
		}
	}
	
}

const styles = {};
styles.buttonLogin = {
	fontSize: '14px'
};
  
  

const mapStateToProps = state => {
	return {
		authentication: state.authentication
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onLogin : (user) => {
			dispatch(actLoginRequest(user));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddPage);
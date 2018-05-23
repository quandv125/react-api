import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import Validator from 'react-forms-validator';
import { connect } from 'react-redux';
import {actAddUserRequest, actEditUserRequest, actGetUserRequest} from './../../actions/index';
import ErrorMessage from './../../components/Users/ErrorMessage';

class UserAddPage extends Component {
    constructor(props){
		super(props);
		this.state = {
			id: '', username: '', firstname: '', lastname: '', email: '', address: '', phone: '', job: 'Dev', gender: config.GENDER_FEMALE, actived: config.DEACTIVED, isFormValidationErrors : true,
			submitted: false,
			isValidation: ''
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeForm = this.onChangeForm.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.flag = true;
		this.isBlocking = false;
	}
	
	componentDidMount(){
		var {match} = this.props;
		if(match) {
			/*
			 * Get id from URL
			 */ 
			var id = match.params.id;
			this.props.getUserId(id);
		}
	}

	componentWillReceiveProps(nextprops){
		if(nextprops && nextprops.userEdit){
			var {userEdit} = nextprops;
			this.setState({
				id: userEdit.id, username: userEdit.username, firstname: userEdit.firstname, lastname: userEdit.lastname, email: userEdit.email, address: userEdit.address, phone: userEdit.phone, job: userEdit.job, gender: userEdit.gender, actived: userEdit.actived
			});
		}

		if(nextprops && nextprops.users && nextprops.users){
			var {status} = nextprops.users;
			this.setState({isValidation: String(status)});
			if(status === true){
				var {history} = this.props;
				history.goBack();
			} else {
				if(nextprops.users && nextprops.users.preUser){
					var preUser = nextprops.users.preUser;
					this.setState({
						id: preUser.id,	username: preUser.username,	firstname: preUser.firstname,	lastname: preUser.lastname,	email: preUser.email,	address: preUser.address,	phone: preUser.phone,	job: preUser.job,	gender: preUser.gender,	actived: preUser.actived
					});
				}
			}
		}
		
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
	
		if(target.type === 'file'){
			let files = event.target.files || event.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
			var output = document.getElementById('output');
    		output.src = URL.createObjectURL(files[0]);
		}
		
	}

	createImage(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
			this.setState({
				picture: e.target.result
			})
		};
		reader.readAsDataURL(file);
	}

	onSave (event) {
		event.preventDefault();
		this.setState({
			// isBlocking: false,
			submitted:true
		});
        var {id, username, firstname, lastname, email, job, phone, address, actived, gender, picture} = this.state;
		var data = { username: username, firstname: firstname, lastname: lastname, email: email, job: job, phone: phone, address: address, gender: gender, actived: actived ? config.ACTIVED : config.DEACTIVED, picture: picture };
		
		let { isFormValidationErrors } = this.state;
        if ( isFormValidationErrors === false){
			if(id) { //update
				this.props.onEditUser(data, id);
			} else { //create
				this.props.onAddUser(data);
			}
        }
	}

	render() {
		// const { isBlocking } = this.state;
		return (
			<div>
				<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">

					{ this.state.isValidation === 'false' ? <ErrorMessage messages={this.props.users}/>: null}
	
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
								placeholder="UserName"/>
							<Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={this.state.submitted} 
                                reference={{username : this.state.username}}
                                validationRules={{required:true, minLength: 5,maxLength:10}} 
                                validationMessages={{ required: "This field is required", minLength: "Not a valid Min length: 5 ",maxLength: "Not a valid Max length: 10 "}}/>
						</div>
						<div className="form-group">
							<label>FirstName</label>
							<input 
								type="text" 
								className="form-control" 
								value={this.state.firstname} 
								onChange={this.onChangeForm} 
								name="firstname" 
								placeholder="FirstName"/>
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
								placeholder="LastName"/>
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
								placeholder="Email"/>
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
								type="Phone" 
								className="form-control" 
								value={this.state.phone} 
								onChange={this.onChangeForm} 
								name="phone" 
								placeholder="Phone"/>
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
								type="Address" 
								className="form-control" 
								value={this.state.address} 
								onChange={this.onChangeForm} 
								name="address" 
								placeholder="Address"/>
							<Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={this.state.submitted} 
                                reference={{address : this.state.address}}
                                validationRules={{required:true, maxLength:50}} 
                                validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
						</div>
						<div className="form-group">
							<div className="Job">
								<label>Job</label>
								<select
									className="form-control"
									name="job"
									value={this.state.job}
									onChange={this.onChangeForm}
								>
									<option value='Dev'>Dev</option>
									<option value='Doctor'>Doctor</option>
									<option value='Driver'>Driver</option>
								</select>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{job : this.state.job}}
									validationRules={{required:true}} 
									validationMessages={{ required: "This field is required"}}/>
								
							</div>
						</div>
						<div className="form-group">
							<div className="checkbox">
								<label>
									<input 
										type="checkbox" 
										value={this.state.actived} 
										checked={this.state.actived}
										onChange={this.onChangeForm} 
										name="actived"/>
									Active 
								</label>
							</div>
						</div>
						<div className="form-group">
							<div className="Radio">
								<label>	Gender </label>
								<br/>
								<span className="gender-male margin-right-10">
									<input type="radio" 
										name="gender" 
										value="0"
										checked={this.state.gender === "0"} 
										onChange={this.onChangeForm} /> Male
								</span>
								<span>
								<input type="radio"
									name="gender"
									value="1" 
									checked={this.state.gender === "1"} 
									onChange={this.onChangeForm} /> Female
								</span>
							</div>
							
						</div>
						<img id="output"  alt="" className="width100px"/> <br/>
						<div className="form-control">
							
							<div className="file-upload">
								<input 
									type="file" 
									name="picture" 
									accept="image/*"
									id="image-upload"
									onChange={this.onChangeForm}
								/> 
							</div>	
						</div>
						
						<br/>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
							<button type="submit" className="btn btn-primary margin-right-10" onClick={this.onSave}>Save</button>

							<Link to="/users" className="btn btn-success">
									Back
							</Link>
						</div>
						
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<br/><br/>
						</div>
						
					</form>

					{/* <Prompt
						when={isBlocking}
						message={location => `Are you sure you want to go to ${location.pathname}`	}
					/> */}
				</div>
			</div>
		);
	} // end render
	
}

const mapStateToProps = state => {
	
	return {
		userEdit: state.userEdit,
		users: state.users,
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
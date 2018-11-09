import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import Validator from 'react-forms-validator';
import { connect } from 'react-redux';
import {actAddUserRequest, actEditUserRequest, actGetUserRequest} from './../../actions/index';
import ErrorMessage from './../../components/Users/ErrorMessage';
import Cleave from 'cleave.js/react';

class UserAddPage extends Component {
    constructor(props){
		super(props);
		// this.state = {
		// 	id: '',
		// 	username: 'test'+Math.floor((Math.random() * 100) + 1),
		// 	firstname: 'demo',
		// 	lastname: 'demo',
		// 	email: 'test'+Math.floor((Math.random() * 100) + 1)+'@gmail.com',
		// 	address: 'Ha Noi',
		// 	phone: '0976459551',
		// 	birthday: '2018-07-22',
		// 	role_id: '14',
		// 	gender: config.GENDER_FEMALE,
		// 	is_active: config.ACTIVED,
		// 	isFormValidationErrors : true,
		// 	submitted: false,
		// 	isValidation: ''
		// };
		this.state = {
			id: '',
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			address: '',
			phone: '',
			role_id: '14',
			birthday: '2018-07-22',
			gender: config.GENDER_FEMALE,
			is_active: config.DEACTIVED,
			isFormValidationErrors : true,
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
		if(nextprops && nextprops.users.userEdit){
			var {userEdit} = nextprops.users;
			this.setState({
				id: userEdit.id,
				username: userEdit.username,
				firstname: userEdit.firstname,
				lastname: userEdit.lastname,
				email: userEdit.email,
				address: userEdit.address,
				phone: userEdit.phone,
				role_id: userEdit.role_id,
				gender: userEdit.gender,
				is_active: userEdit.is_active
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
						id: preUser.id,	username: preUser.username,	firstname: preUser.firstname, lastname: preUser.lastname, email: preUser.email,	address: preUser.address, phone: preUser.phone,	role_id: preUser.role_id, gender: preUser.gender, is_active: preUser.is_active
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
		console.log(this.state);
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
				avatar: e.target.result
			})
		};
		reader.readAsDataURL(file);
	}

	onSave (event) {
		event.preventDefault();
		this.setState({
			submitted:true
		});
		var {id, username, firstname, lastname, email, role_id, phone, address, is_active, gender, avatar} = this.state;
		var data = { 
			username: username,
			firstname: firstname,
			lastname: lastname,
			email: email,
			role_id: role_id,
			phone: phone,
			address: address,
			gender: gender,
			is_active: is_active ? config.ACTIVED : config.DEACTIVED,
			avatar: avatar 
		};
		let { isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
			if(id) { //update
				this.props.onEditUser(data, id);
			} else { //create
				this.props.onAddUser(data);
			}
        }
	}

	render() {
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple ">
					<div className="grid-body no-border">
					<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
						{ this.state.isValidation === 'false' ? <ErrorMessage messages={this.props.users}/>: null}
						<form noValidate  >
							<legend></legend>
							{/* <div className="form-group">
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
									validationRules={{required:true, minLength: 5,maxLength:10}} 
									validationMessages={{ required: "Trường này không được để trống", minLength: "Not a valid Min length: 5 ",maxLength: "Độ dài tối đa: 50 "}}/>
							</div> */}
							<div className="form-group">
								<label>Họ</label>
								<input 
									type="text" 
									className="form-control" 
									value={this.state.firstname} 
									onChange={this.onChangeForm} 
									name="firstname" 
									placeholder="Họ"/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{firstname : this.state.firstname}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa: 50 "}}/>
							</div>
							<div className="form-group">
								<label>Tên</label>
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
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa: 50 "}}/>
								
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
									validationMessages={{ required: "Trường này không được để trống", email: "Email không đúng định dạng"}}/>
								
							</div>
							<div className="form-group">
								<label>Số điện thoại (VD: 987654321)</label>
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
									validationRules={{required:true, number:true, minLength: 9,maxLength:11}} 
									validationMessages={{ required: "Trường này không được để trống", number: "Số điện thoại là số", maxLength: "Độ dài tối đa: 11 kí tự", minLength: "Độ dài tối thiểu là 9 kí tự"}}/>
								
							</div>
							<div className="form-group">
								<label>Địa chỉ</label>
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
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa: 10 "}}/>
							</div>
							<div className="form-group">
								<label>Ngày sinh</label>
								<Cleave 
									className="form-control" 
									placeholder="birthday" 
									name="birthday" 
									value={this.state.birthday} 
									options={{date: true, datePattern: ['Y', 'm', 'd']}}
									onChange={this.onDateChange}/>
								<Validator 
									isValidationError={this.isValidationError}
									isFormSubmitted={this.state.submitted} 
									reference={{birthday : this.state.birthday}}
									validationRules={{required:true, maxLength:50}} 
									validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa: 10 "}}/>
							</div>
							<div className="form-group">
								<div className="role_id">
									<label>Vai trò/ Chức vụ</label>
									<select
										className="form-control"
										name="role_id"
										value={this.state.role_id}
										onChange={this.onChangeForm}
									>
										<option value='14'>Administrator</option>
										<option value='15'>Quản lý</option>
										<option value='16'>Bác sỹ</option>
										<option value='33'>Trợ lý</option>
										<option value='34'>Lễ tân</option>
										
									</select>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{role_id : this.state.role_id}}
										validationRules={{required:true}} 
										validationMessages={{ required: "Trường này không được để trống"}}/>
									
								</div>
							</div>
							<div className="form-group">
								<label>Kích hoạt </label>
								<div className="checkbox1">
									
										<input 
											type="checkbox" 
											value={this.state.is_active} 
											checked={this.state.is_active}
											onChange={this.onChangeForm} 
											name="is_active"/>
										
									
								</div>
							</div>
							{/* <div className="form-group">
								<div className="Radio">
									<label>	Gender </label>
									<br/>
									<span className="gender-male margin-right-10">
										<input type="radio" 
											name="gender" 
											value="0"
											checked={gender === config.GENDER_MALE } 
											onChange={this.onChangeForm} /> Male
									</span>
									<span>
									<input type="radio"
										name="gender"
										value="1" 
										checked={gender === config.GENDER_FEMALE } 
										onChange={this.onChangeForm} /> Female
									</span>
								</div>
							</div> */}
							<div className="form-group">
								<div className="gender">
									<label>Giới tính</label>
									<select
										className="form-control"
										name="gender"
										onChange={this.onChangeForm}
									>
										<option value={config.GENDER_MALE}>Nữ</option>
										<option value={config.GENDER_FEMALE}>Nam</option>
										
									</select>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{gender : this.state.gender}}
										validationRules={{required:true}} 
										validationMessages={{ required: "Trường này không được để trống"}}/>
									
								</div>
							</div>
							{/* <img id="output"  alt="" className="width100px"/> 
							<div className="form-control">
								<div className="file-upload">
									<input 
										type="file" 
										name="avatar" 
										accept="image/*"
										id="image-upload"
										onChange={this.onChangeForm}
									/> 
								</div>	
							</div> */}
							
							<br/><br/>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
								<button type="submit" className="btn btn-primary margin-right-10" onClick={this.onSave}>Lưu</button>

								<Link to="/users" className="btn btn-success">
									Quay lại
								</Link>
							</div>
							
						</form>
						<br/><br/><br/><br/>
					</div>
				</div></div>
			</CSSTransitionGroup>
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
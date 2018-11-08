import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
// import { Link } from 'react-router-dom';
import Validator from 'react-forms-validator';
import callApi from './../../utils/apiCaller';
import * as config from '../../constants/config';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2'
import Radio from '@material-ui/core/Radio';
class MyAccount extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: '',
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            birthday: '',
			startDate: null,
			gender: config.GENDER_FEMALE,
			selectedValue: 'male',
			submitted: false,
			isFormValidationErrors : true,
        }
    }

    componentDidMount(){
        callApi('POST', config.API_URL + "/me", null).then(res => {
            var data = res.data;
            console.log(data);
            this.setState({
                id: data.id ? data.id  : '',
                username: data.username ? data.username : '',
                firstname: data.firstname ? data.firstname : '',
                lastname: data.lastname ? data.lastname : '',
                email: data.email ? data.email : '',
                address: data.address ? data.address : '',
                phone: data.phone ? data.phone : '',
                selectedValue: data.gender ? this.returnGender(data.gender) : 'male',
                startDate: this.convertNumberToDate(data.birthday)
            });
        });
		
    }

    returnGender = (gender) => {
		return gender === config.GENDER_MALE ? 'male' : 'female';
	}
    
    convertNumberToDate = (date) => {
        if( date !== null && date !== '0000-00-00 00:00:00'){
            // date => 2018-10-25 15:28:46
            var date_time = moment(date, "YYYY-MM-DD");
            return date_time;
        }
		return null;
	}


    isValidationError = (flag) => {
		this.setState({isFormValidationErrors:flag});
   	}

    onChangeForm = (event) => {
        var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
    }

    handleChangeDate = (date) => {
		const valueOfInput = date ? date.format('YYYY-MM-DD H:mm:ss') : null;
		this.setState({
			birthday: valueOfInput,
		  	startDate: date
		});
	}

	handleChange = name => event => {
		// Input, checkbox, Radio, Select
		var value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
		this.setState({
			gender: value === 'male' ? config.GENDER_MALE : config.GENDER_FEMALE,
			[name]: value
		});
	};

    handleFormSubmit = (event) => {
        event.preventDefault();
		this.setState({ submitted:true });
		var {id, username, firstname, lastname, email, phone, address, gender, birthday} = this.state;
        var data = { username: username, firstname: firstname, lastname: lastname, email: email, phone: phone, address: address, gender: gender, birthday: birthday };
		let { isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
			callApi('PUT', config.USER_URL  + "/" + id, data).then( res => {
                if( res ){
                    if( res.data.status ){
                        Swal(' Good job!', 'The data have be saved.', 'success')
                    } else {
                        Swal('Oops...', 'Something went wrong!', 'error')
                    }
                }
            });
        } else {
            Swal('Oops...', 'Something went wrong!', 'error')
        }
    }

    render() {
        return (
            <React.Fragment>
            <CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                <div className="grid simple">
                    <div className="grid-title no-border">
                        <h4>My Account</h4>
                    </div>
                    <div className="grid-body no-border">
                        <div className="row">
                            <div className="col-md-3 col-lg-3 user-profile">
                                <div className="user-info-wrapper sm"> 
                                    <div className="profile-wrapper1 sm text-center">
                                        <img src="https://backend.ssllabel.com/images/thumbnails/300_5b3efede24593.jpg"
                                            alt=""
                                            data-src="https://backend.ssllabel.com/images/thumbnails/300_5b3efede24593.jpg"
                                            data-src-retina="https://backend.ssllabel.com/images/thumbnails/300_5b3efede24593.jpg"
                                            width="200"
                                            height="200"/>
                                        <div className="availability-bubble online"></div>
                                    </div>
                                    <br/>
                                </div>
                                <p className="text-center"><i className="fa fa-envelope m-r-xs"></i> {this.state.email}</p>
                                <p className="text-center">{this.state.firstname} {this.state.lastname}</p>
                                
                                <ul className="list-unstyled text-center">
                                    <li><p><i className="fa fa-map-marker m-r-xs"></i> {this.state.address} </p></li>
                                </ul>
                                
                            </div>
                            <div className="col-md-9 col-lg-9 m-t-lg">
                                <h4 className="bold">Tài khoản  <a href="https://backend.ssllabel.com/admin/users/edit/21"><i className="fa fa-pencil"></i></a> </h4>
                                <div className="progress progress-xs">
                                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                                    <form noValidate onSubmit={this.handleFormSubmit}>
                                        <div className="col-lg-6 col-md-6">
                                            
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
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="DD-MM-YYYY"
                                                    placeholderText="Ex: 25-10-2018"
                                                    name="birthday" 
                                                    todayButton="Today"
                                                    withPortal
                                                    // peekNextMonth
                                                    // showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChangeDate} 
                                                />
                                                
                                            </div>
                                            <div className="form-group">
                                                <span>Male</span>
                                                <Radio
                                                    checked={this.state.selectedValue === 'male'}
                                                    onChange={this.handleChange('selectedValue')}
                                                    value='male'
                                                    name="gender"
                                                    aria-label="male"
                                                />
                                                <span>Female</span>
                                                <Radio
                                                    checked={this.state.selectedValue === 'female'}
                                                    onChange={this.handleChange('selectedValue')}
                                                    value='female'
                                                    name="gender"
                                                    aria-label="female"
                                                />
                                                    
                                                {/* <div className="gender">
                                                    <label>Gender</label>
                                                    <select
                                                        className="form-control"
                                                        name="gender"
                                                        value={this.state.gender}
                                                        onChange={this.onChangeForm}
                                                    >
                                                        <option value={config.GENDER_MALE}>Male</option>
                                                        <option value={config.GENDER_FEMALE}>Female</option>
                                                        
                                                    </select>
                                                
                                                </div> */}
                                            </div>
                                        </div>

                                        {/* ********** */}

                                        <div className="col-lg-6 col-md-6">
                                            
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
                                                <label>Phone (Ex: +84 987654321)</label>
                                                <div className="input-group transparent">
                                                    <span className="input-group-addon">
                                                        (+84)
                                                    </span>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={this.state.phone} 
                                                        onChange={this.onChangeForm} 
                                                        name="phone" 
                                                        placeholder="phone"/>
                                                </div>
                                                
                                                <Validator 
                                                    isValidationError={this.isValidationError}
                                                    isFormSubmitted={this.state.submitted} 
                                                    reference={{phone : this.state.phone}}
                                                    validationRules={{required:true }} 
                                                    validationMessages={{ required: "This field is required", number: "Not a valid number", maxLength: "Not a valid Max length: 11 character", minLength: "Not a vaild min length is 9 character"}}/>
                                                
                                            </div>
                                            
                                            

                                            
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <Button type="submit" variant="contained" color="primary">Save</Button>
                                        </div>
                                    </form>

                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransitionGroup>
        </React.Fragment>
        );
    }
}

export default MyAccount;
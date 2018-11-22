import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Validator from 'react-forms-validator';
import callApi from '../../utils/apiCaller';
import * as config from '../../constants/config';
import Swal from 'sweetalert2';
class ForgotForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            notification: "" ,
            submit: false,
            code: "",
            password: "",
            confirm_password: ""
        };
        this.flag = true;
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked : target.value;
		this.setState({
			[name]: value
        });
	}

    handleSave = (e) => {
        e.preventDefault();
        var {email} = this.state;
		var data = { email: email};
		if(email !== '' && !this.state.isFormValidationErrors){
         
            callApi('POST', config.API_URL + 'forgot' , data).then(res => {
                if(res && res.data.status){
                    
                    this.setState({ email: '', notification: true, submit: true });
                } else {
                    this.setState({ notification: 'exist'});
                }
            });
		} else {
			this.setState({ notification: false });
		}
    }

    handleChangePass = (e) => {
        e.preventDefault();
        var {code, password} = this.state;
        var data = {code: code, password: password};
        if(code !== '' && !this.state.isFormValidationErrors){
            callApi('POST', config.API_URL + "reset-password", data).then( res => {
                if(res){
                    if( res.data.status ){
                        Swal('Đổi mật khẩu thành công!', '', 'success')
                    } else {
                        Swal('', res.data.message, 'error')
                    }
                }
            });
        }
    }

    isValidationError = (flag) => {
		this.setState({isFormValidationErrors:flag});
    }
       
    showError = () => {
        var {notification} = this.state;
        if( notification === 'exist'){
            return 	<div className="alert alert-danger"> Email không tồn tại </div>;
        } else if (notification) {
            return 	<div className="alert"> Yêu cầu đặt lại mật khẩu thành công. Vui lòng kiểm tra email </div>;
        } else if ( notification !== '' ){
            return 	<div className="alert alert-danger"> Không được để trống hoặc kiểm tra lại email </div>;
        }
    }

    render() {
        var {submit} = this.state;
        return (
            <div>
                
                {this.showForm(submit)}
                

            </div>
        );
    }

    showForm = (submit) => {
        if(!submit){
            return (
                <div>
                    { this.showError() }
                    <form className="animated fadeIn validate" noValidate onSubmit={this.handleSave}>
                        <div className="row form-row m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                            <div className="register-form">
                            <input 
                                className="form-control" 
                                type="text" 
                                value={this.state.email} 
                                onChange={this.onChangeForm} 
                                name="email" 
                                placeholder="Email"/>
                            <Validator 
                                isValidationError={this.isValidationError}
                                isFormSubmitted={this.state.submitted} 
                                reference={{email : this.state.email}}
                                validationRules={{email:true, required: true}} 
                                validationMessages={{ email: "", required: "Không được để trống"}}/>
                                
                            </div>
                            
                        </div>
                        <div className="row p-t-12 m-l-20 m-r-20 xs-m-l-12 xs-m-r-12">
                            <div className="control-group col-md-12 text-center">
                                
                                <Button type="submit" className="btn btn-primary btn-cons" variant="contained" style={ styles.buttonLogin } color="primary">
                                    Submit
                                </Button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    { this.showError() }
                    <form className="animated fadeIn validate" noValidate onSubmit={this.handleChangePass}>
                        <div className="row form-row m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                            <div className="register-form">
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    value={this.state.code} 
                                    onChange={this.onChangeForm} 
                                    name="code" 
                                    placeholder="Code"
                                    />
                                <Validator 
                                    isValidationError={this.isValidationError}
                                    isFormSubmitted={this.state.submitted} 
                                    reference={{code : this.state.code}}
                                    validationRules={{ required: true}} 
                                    validationMessages={{ required: "Không được để trống"}}/>
                                
                            </div>

                            <div className="register-form">
                                
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={this.state.password} 
                                    onChange={this.onChangeForm} 
                                    name="password" 
                                    placeholder="Mật khẩu mới"/>
                                <Validator 
                                    isValidationError={this.isValidationError}
                                    isFormSubmitted={this.state.submitted} 
                                    reference={{password : this.state.password}}
                                    validationRules={{required:true, maxLength:20}} 
                                    validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là: 20 kí tự "}}/>
                            </div>

                            <div className="register-form">
                               
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={this.state.confirm_password} 
                                    onChange={this.onChangeForm} 
                                    name="confirm_password" 
                                    placeholder="Xác nhận mật khẩu"/>
                                <Validator 
                                    isValidationError={this.isValidationError}
                                    isFormSubmitted={this.state.submitted} 
                                    reference={{confirm_password : this.state.confirm_password}}
                                    validationRules={{required:true, maxLength:20, equalTo:this.state.password}} 
                                    validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là: 20 kí tự ", equalTo: "Không khớp với mật khẩu"}}/>
                            </div>
                            
                        </div>
                        <div className="row p-t-12 m-l-20 m-r-20 xs-m-l-12 xs-m-r-12">
                            <div className="control-group col-md-12 text-center">
                                
                                <Button type="submit" className="btn btn-primary btn-cons" variant="contained" style={ styles.buttonLogin } color="primary">
                                    Submit
                                </Button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }

}



const styles = {};
styles.buttonLogin = {
	fontSize: '14px'
};

export default ForgotForm;
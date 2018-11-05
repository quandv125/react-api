import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Validator from 'react-forms-validator';
import callApi from '../../utils/apiCaller';
import * as config from '../../constants/config';

class ForgotForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            notification: "" 
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
                    console.log(res.data);
                    this.setState({ email: '', notification: true });
                } else {
                    this.setState({ notification: 'exist'});
                }
            });
		} else {
			this.setState({ notification: false });
		}
    }

    isValidationError = (flag) => {
		this.setState({isFormValidationErrors:flag});
    }
       
    showError = () => {
        var {notification} = this.state;
        if( notification === 'exist'){
            return 	<div className="alert alert-danger"> The email not exist </div>;
        } else if (notification) {
            return 	<div className="alert"> Please check email </div>;
        } else if ( notification !== '' ){
            return 	<div className="alert alert-danger"> This field is required </div>;
        }
    }

    render() {
        return (
            <div>
                
                { this.showError() }

                <form className="animated fadeIn validate" noValidate onSubmit={this.handleSave}>
                    <div className="row form-row m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                        <div className="register-form">
                        <input 
                            type="text" 
                            value={this.state.email} 
                            onChange={this.onChangeForm} 
                            name="email" 
                            placeholder="Email"/>
                        <Validator 
                            isValidationError={this.isValidationError}
                            isFormSubmitted={this.state.submitted} 
                            reference={{email : this.state.email}}
                            validationRules={{email:true, required: true, minLength: 5,maxLength: 50}} 
                            validationMessages={{ email: "invalid email address", required: "This field is required", minLength: "Not a valid Min length: 5 ",maxLength: "Not a valid Max length: 10 "}}/>
                            
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

const styles = {};
styles.buttonLogin = {
	fontSize: '14px'
};

export default ForgotForm;
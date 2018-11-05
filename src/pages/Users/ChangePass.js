import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
// import { Link } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import * as config from './../../constants/config';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

class ChangePass extends Component {

    constructor (props) {
        super(props)
        this.state = {
            old_password: '',
            new_password: '',
            confirm_password: '',
            isFormValidationErrors : true,
			submitted: false,
        }
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

    handleFormSubmit = (event) => {
        event.preventDefault();
		this.setState({ submitted:true });
		var {old_password, new_password, confirm_password} = this.state;
		var data = { 
			old_password: old_password,
			new_password: new_password,
			confirm_password: confirm_password
		};
		let { isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
           
			callApi('POST', config.API_URL + "change-password", data).then( res => {
                console.log(res);
                if(res){
                    if( res.data.status ){
                        Swal(' Good job!', res.data.message, 'success')
                    } else {
                        Swal('Oops...', res.data.message, 'error')
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
                    <div className="grid-body no-border">
                        
                       
                        <form noValidate onSubmit={this.handleFormSubmit}>
							<div className="col-lg-6 col-md-6">
									
									<div className="form-group">
										<label>Old Password</label>
										<input 
											type="password" 
											className="form-control" 
											value={this.state.old_password} 
											onChange={this.onChangeForm} 
											name="old_password" 
											placeholder="old_password"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{old_password : this.state.old_password}}
												validationRules={{required:true, maxLength:20}} 
												validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 20 "}}/>
									</div>
									
                                    <div className="form-group">
										<label>New Password</label>
										<input 
											type="password" 
											className="form-control" 
											value={this.state.new_password} 
											onChange={this.onChangeForm} 
											name="new_password" 
											placeholder="new_password"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{new_password : this.state.new_password}}
												validationRules={{required:true, maxLength:20}} 
												validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 20 "}}/>
									</div>

                                    <div className="form-group">
										<label>Confirm Password</label>
										<input 
											type="password" 
											className="form-control" 
											value={this.state.confirm_password} 
											onChange={this.onChangeForm} 
											name="confirm_password" 
											placeholder="confirm_password"/>
											<Validator 
												isValidationError={this.isValidationError}
												isFormSubmitted={this.state.submitted} 
												reference={{confirm_password : this.state.confirm_password}}
												validationRules={{required:true, maxLength:20, equalTo:this.state.new_password}} 
												validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 20 ", equalTo: "equal To password"}}/>
									</div>
									

							</div>
							<div className="col-lg-12 col-md-12">
								<Button type="submit" variant="contained" color="primary">Save</Button>
							</div>
						</form>

                    </div>
                </div>
                
                
                </CSSTransitionGroup>
            </React.Fragment>
        );
    }
}

export default ChangePass;
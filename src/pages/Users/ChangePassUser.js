import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
import { Link } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import * as config from './../../constants/config';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

class ChangePassUser extends Component {
    constructor (props) {
        super(props)
        this.state = {
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
        var {id} = this.props.match.params;
        
		var { new_password} = this.state;
		var data = { 
			password: new_password,
		}; 
		let { isFormValidationErrors } = this.state;
        if ( !isFormValidationErrors ){
           
			callApi('POST', config.USER_URL + "/change-password-user/" + id, data).then( res => {
                if(res && res.data){
                    if( res.data.status ){
                        Swal(' Đổi mật khẩu thành công!', res.data.message, 'success')
                    } else {
                        Swal('', res.data.message, 'error')
                    }
                }
            });
        } else {
            Swal('Vui lòng nhập tất cả các ô...', '', 'error')
        }
    }

    render() {
        return (
            <React.Fragment>
            <CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                <div className="grid simple">
                <div className="grid-body no-border">
                    <Link to="/users" className="margin-right20">
                        <Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
                        <i className="material-icons">arrow_back</i>
                        </Button>	
                    </Link>
                    <br/><br/><br/>
                    <form noValidate onSubmit={this.handleFormSubmit}>
                        <div className="col-lg-4 col-md-4">
                                
                                <div className="form-group">
                                    <label>Mật khẩu mới</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        value={this.state.new_password} 
                                        onChange={this.onChangeForm} 
                                        name="new_password" 
                                        placeholder="Mật khẩu mới"/>
                                        <Validator 
                                            isValidationError={this.isValidationError}
                                            isFormSubmitted={this.state.submitted} 
                                            reference={{new_password : this.state.new_password}}
                                            validationRules={{required:true, maxLength:20}} 
                                            validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là: 20 kí tự "}}/>
                                </div>

                                <div className="form-group">
                                    <label>Xác nhận mật khẩu</label>
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
                                            validationRules={{required:true, maxLength:20, equalTo:this.state.new_password}} 
                                            validationMessages={{ required: "Trường này không được để trống", maxLength: "Độ dài tối đa là: 20 kí tự ", equalTo: "Không khớp với mật khẩu"}}/>
                                </div>
                                

                        </div>
                        <div className="col-lg-12 col-md-12">
                            <Button type="submit" variant="contained" color="primary">Lưu</Button>
                        </div>
                    </form>

                </div>
            </div>
            
            
            </CSSTransitionGroup>
        </React.Fragment>
        );
    }
}

export default ChangePassUser;
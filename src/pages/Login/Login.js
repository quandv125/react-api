import React, { Component } from 'react';
import LoginForm from './../../components/Login/LoginForm';
import {Redirect} from 'react-router-dom';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginAuth: JSON.parse(localStorage.getItem('loginAuth'))
        }
    }

    render() {
        
        if(this.state.loginAuth.status === true){
            return <Redirect to={{ pathname: "/"}}/>;
		}
        return (
            <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                
              
                
                <LoginForm >

                </LoginForm>
            </div>
        );
    }
}

export default Login;
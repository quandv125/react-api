import React, { Component } from 'react';
import LoginForm from './../../components/Login/LoginForm';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";

class Login extends Component {

     constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        };
    }

    componentWillReceiveProps(nextprops) {
        if(nextprops.authentication){
            this.setState({
                isLogin: nextprops.authentication 
            });
        }
    }

    render() {

        if(this.state.isLogin){
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

const mapStateToProps = state => {
    return {
        authentication: state.authentication.status
    }
}
export default connect(mapStateToProps, null)(Login);

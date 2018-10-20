import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import LoginForm from './../../components/Login/LoginForm';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import * as config from './../../constants/config';

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
            <CSSTransitionGroup transitionName={config.LOGINTRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12" >
                    <LoginForm/>
                </div>
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication.status
    }
}
export default connect(mapStateToProps, null)(Login);

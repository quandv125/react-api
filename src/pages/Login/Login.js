import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import LoginForm from './../../components/Login/LoginForm';
import ForgotForm from '../../components/Login/ForgotForm';

// import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import {LOGINTRANSITION, TRANSITIONSPEED} from './../../constants/config';

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
        // if(this.state.isLogin){
        //     return <Redirect to={{ pathname: "/"}}/>;
		// }
        return (
            <CSSTransitionGroup transitionName={LOGINTRANSITION} transitionAppear={true} transitionAppearTimeout={TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                <div className="error-body no-top lazy wapper-login">
                    <div className="container">
                        <div className="row login-container animated fadeInUp">
                            <div className="col-md-8 col-md-offset-2 tiles white no-padding">
                                <div className="p-t-30 p-l-40 p-b-20 xs-p-t-10 xs-p-l-10 xs-p-b-10">
                                    <h2 className="normal text-center">
                                        Phòng khám nha khoa Phạm Văn Mùi
                                    </h2>
                                    <br/>
                                    <div role="tablist" className="text-center">
                                        <a href="#tab_login" className="btn btn-primary btn-cons" role="tab" data-toggle="tab">Đăng nhập</a> 
                                        <a href="#tab_forgot" className="btn btn-info btn-cons" role="tab" data-toggle="tab">Quên mật khẩu</a>
                                        {/* <a href="#tab_register" className="btn btn-danger btn-cons" role="tab" data-toggle="tab">Register</a> */}
                                    </div>
                                </div>
                        
                                <div className="tiles grey p-t-20 p-b-20 no-margin text-black tab-content">
                                    <div role="tabpanel" className="tab-pane active" id="tab_login">
                                        <LoginForm/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="tab_forgot">
                                        <ForgotForm/>
                                    </div>
                                    {/* <div role="tabpanel" className="tab-pane" id="tab_register">
                                        <div className="text-center">Comming soon</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
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

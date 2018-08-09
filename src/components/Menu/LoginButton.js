import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { actLogoutRequest } from './../../actions/index';
import { TOKEN } from './../../constants/config.js';
import {Redirect} from 'react-router-dom';

class LoginButton extends Component {

    constructor(props) {
        super(props);
        let session = JSON.parse(sessionStorage.getItem('authentication'));
        this.state = {
            isLogin: (session && session.status) ? session.status : false,
            token: TOKEN,
        }
        this.showLogout = this.showLogout.bind(this);
    }

    
    componentWillReceiveProps(nextprops) {
        this.setState({
            isLogin: nextprops.authentication.loggedIn 
        });
    }

    showLogout() {
        var result = null;
        var { isLogin, token } = this.state;
        console.log(isLogin)
        if (isLogin) {// isLogin = true => token has data => logout is display and login is hidden 
            result = <li> <a onClick={() => this.onLogout(token)} >Logout</a>	</li>;
        } else { // isLogin = false => token is null => logout is hidden and login is display 
            result = <li> <Link to="/login" className="my-link"> Login	</Link>	</li>;
        }
        return result;
    }

    onLogout(token) {
        if (token !== null) {
            this.props.onActLogout(token);
        } else {
            alert('Missing token');
        }
    }

    render() {
        if(this.state.isLogin){
            return <Redirect to={{ pathname: "/"}}/>;
        }
        return (
            <React.Fragment>

                {this.showLogout()}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onActLogout: (token) => {
            // console.log(token)
            dispatch(actLogoutRequest(token));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
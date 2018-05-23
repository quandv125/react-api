import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { actLogoutRequest } from './../../actions/index';

class LoginButton extends Component {

    constructor(props) {
        super(props);
        let session = JSON.parse(sessionStorage.getItem('authentication'));
        this.state = {
            isLogin: session ? session.loggedIn : false,
            token: session ? session.data.auth_token : null,
        }
        this.showLogout = this.showLogout.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        let { loggedIn } = nextprops.authentication
        this.setState({
            isLogin: typeof loggedIn === 'undefined' ? this.state.isLogin : loggedIn
        });
    }

    showLogout() {
        var result = null;
        var { isLogin, token } = this.state;
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
            dispatch(actLogoutRequest(token));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
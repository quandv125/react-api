import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { actLogoutRequest } from './../../actions/index';

class LoginButton extends Component {

    constructor(props) {
        super(props);
        let session = JSON.parse(sessionStorage.getItem('authentication'));
        this.state = {
            isLogin: (session && session.status) ? session.status : false,
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
        var { isLogin } = this.state;
        if (isLogin) {// isLogin = true => token has data => logout is display and login is hidden 
            result = <li className="class-default"> <span onClick={() => this.onLogout()} >Logout</span>	</li>;
        } else { // isLogin = false => token is null => logout is hidden and login is display 
            result = <li> <Link to="/login" className="my-link"> Login	</Link>	</li>;
        }
        return result;
    }

    onLogout() {
        this.props.onActLogout();
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
        onActLogout: () => {
            dispatch(actLogoutRequest());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
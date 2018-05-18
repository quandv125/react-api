import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {actLogoutRequest} from './../../actions/index';
const menu = [
	{
		name: 'Home',
		to: '/',
		exact: true
	},
	{
		name: 'About',
		to: '/about',
		exact: false
	},
	{
		name: 'Products',
		to: '/products-list',
		exact: false
	},
	{
		name: 'Users',
		to: '/users',
		exact: true
	},
	// {
	// 	name: 'Login',
	// 	to: '/login',
	// 	exact: false
	// }
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
	return (
		<Route 
			path={to} 
			exact={activeOnlyWhenExact} 
			children={({ match }) => {
				var active = (match && match !== null) ? 'active abc' : '';
				return (
					<li className={`class-default ${active}`}>
						<Link to={to} className="my-link">
							{label}
						</Link>
					</li>
				)
			}}
		/>
	)
}


class Menu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			token: null
		}
		
		this.showMenu = this.showMenu.bind( this );
		this.UpdateLoggedIn = this.UpdateLoggedIn.bind( this );
		this.showLogout = this.showLogout.bind(this);
	}

	UpdateLoggedIn(loggedIn) {
		
		if( loggedIn ) {
			// Login already
			var {auth_token} = JSON.parse(sessionStorage.getItem('authentication')).data;
			this.setState({	isLogin: loggedIn, token: auth_token });
		} else {
			this.setState({	isLogin: loggedIn, token: null });
		}
		
	}

	componentWillMount(){
		var {loggedIn} = this.props.authentication;
		this.UpdateLoggedIn(loggedIn);
	}

	componentWillReceiveProps(nextprops){
		var {loggedIn} = nextprops.authentication;
		this.UpdateLoggedIn(loggedIn);
	}

	showMenu (menus) {
		var result = null;
		var {isLogin} = this.state;
		if( isLogin ) {
			menus.splice(4, 1);
		}
		if(menus.length > 0){
			result = menus.map((menu, index) => {
				return ( <MenuLink label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} key={index} /> )
			});
		}
		return result;
	}

	showLogout(){
		var result = null;
		var {isLogin} = this.state;
		if( isLogin ) {
			// isLogin = true => token has data => logout is display and login is hidden 
			result = (
				<li>
					<a onClick={ this.onLogout } >Logout</a>
				</li>
			);
		} else {
			// isLogin = false => token is null => logout is hidden and login is display 
			result = (
				<li>
					<Link to="/login" className="my-link">
						Login
					</Link>
				</li>
			);
		}
		return result;
	}

	onLogout = () => {
		var token = this.state.token;
		this.props.onActLogout(token);
	}

	render() {
		
		return (
			<nav className="navbar navbar-inverse">
				<ul className="nav navbar-nav">
					{ this.showMenu(menu) }
					<li> 
						<Link to="/dfasdfadfasdf" className="my-link">
							Not Found
						</Link>
					</li>
					{this.showLogout()}
				</ul>
			</nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
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
	{
		name: 'Login',
		to: '/login',
		exact: false
	}
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
			loginAuth: false
		}

		this.showMenu = this.showMenu.bind( this );
		this.UpdateLoggedIn = this.UpdateLoggedIn.bind( this );
	}

	UpdateLoggedIn(loggedIn) {
		this.setState({	loginAuth: loggedIn });
	}
	componentWillMount(){
		this.UpdateLoggedIn( this.props.authentication.loggedIn );
	}

	componentWillReceiveProps(nextprops){
		this.UpdateLoggedIn( nextprops.authentication.loggedIn );
	}

	showMenu (menus) {
		var result = null;
		if( this.state.loginAuth ) {
			menus.splice(4, 1);
		}
		if(menus.length > 0){
			result = menus.map((menu, index) => {
				return ( <MenuLink label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} key={index} /> )
			});
		}
		return result;
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

export default connect(mapStateToProps, null)(Menu);
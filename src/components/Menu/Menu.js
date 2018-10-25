import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
const menu = [
	{
		name: 'Home',
		to: '/',
		exact: true
	},
	{
		name: 'Products',
		to: '/products',
		exact: false
	},
	{
		name: 'Orders',
		to: '/orders',
		exact: false
	},
	{
		name: 'Categories',
		to: '/category',
		exact: false
	},
	{
		name: 'Customers',
		to: '/customers',
		exact: false
	},
	
	{
		name: 'Users',
		to: '/users',
		exact: false
	},
	{
		name: 'SMS',
		to: '/sms',
		exact: false
	},
	// {
	// 	name: 'Config',
	// 	to: '#',
	// 	exact: false
	// }
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {

	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				var active = (match && match !== null) ? 'active' : '';
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
		this.showMenu = this.showMenu.bind(this);
	}
	showMenu(menus) {
		var result = null;
		if (menus.length > 0) {
			result = menus.map((menu, index) => {
				return (<MenuLink label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} key={index} />)
			});
		}
		return result;
	}

	render() {
		return (
			<nav className="navbar navbar-inverse">
				<ul className="nav navbar-nav">
					
					{this.showMenu(menu)}
					 
					<LoginButton />
				</ul>
			</nav>
		);
	}
}

export default Menu;
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menu = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true,
		icon: 'home'
	},
	{
		name: 'Sản phẩm',
		to: '/products',
		exact: false,
		icon: 'layers'
	},
	{
		name: 'Lịch sử dụng dịch vụ',
		to: '/orders',
		exact: false,
		icon: 'card_giftcard'
	},
	// {
	// 	name: 'Categories',
	// 	to: '/category',
	// 	exact: false,
	// 	icon: 'apps'
	// },
	{
		name: 'Khách hàng',
		to: '/customers',
		exact: false,
		icon: 'supervisor_account'
	},
	
	{
		name: 'Lịch sử cuộc gọi',
		to: '/calling',
		exact: false,
		icon: 'phone_in_talk'
	},
	{
		name: 'Tin nhắn/ SMS',
		to: '/sms',
		exact: false,
		icon: 'question_answer'
	},
	{
		name: 'Nhân viên',
		to: '/users',
		exact: false,
		icon: 'account_circle'
	},
];

const MenuLink = ({ label, to, activeOnlyWhenExact, icon}) => {

	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				var active = (match && match !== null) ? 'active' : '';
				return (
					<li className={`class-default ${active}`}>
						<Link to={to} className="my-link">
							<i className="material-icons">{icon}</i>
							<span className="title">{label}</span>
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
				return (<MenuLink label={menu.name} to={menu.to} activeOnlyWhenExact={menu.exact} key={index} icon={menu.icon}/>)
			});
		}
		return result;
	}

	render() {
		return (
				<ul>
					
					{this.showMenu(menu)}
					 
				</ul>
		);
	}
}

export default Menu;
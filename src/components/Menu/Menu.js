import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { ASSISTANT, RECRPTIONIST} from './../../constants/config';

const menu = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true,
		icon: 'home'
	},
	{
		name: 'Dịch vụ',
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
	// 	name: 'Thanh toán',
	// 	to: '/billing',
	// 	exact: false,
	// 	icon: 'assignment'
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

const menuReceptionist = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true,
		icon: 'home'
	},
	{
		name: 'Dịch vụ',
		to: '/products',
		exact: false,
		icon: 'layers'
	},
	// {
	// 	name: 'Thanh toán',
	// 	to: '/billing',
	// 	exact: false,
	// 	icon: 'assignment'
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
];

const menuAssistant = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true,
		icon: 'home'
	},
	{
		name: 'Dịch vụ',
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
	{
		name: 'Khách hàng',
		to: '/customers',
		exact: false,
		icon: 'supervisor_account'
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
		this.state = ({
			
			role_id: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : ''
		
		});
		this.showMenu = this.showMenu.bind(this);
	}

	showMenu() {
		var result = null;
		var menus = menu;
		if(this.state.role_id){
			if( this.state.role_id === RECRPTIONIST){
				menus = menuReceptionist;
			} else if(this.state.role_id === ASSISTANT){
				menus = menuAssistant;
			} else{
				menus = menu;
			}
				
			if (menus.length > 0) {
				result = menus.map((m, index) => {
					return (<MenuLink label={m.name} to={m.to} activeOnlyWhenExact={m.exact} key={index} icon={m.icon}/>)
				});
			}
		}
		return result;
	}

	onLogout() {
        this.props.onActLogout();
    }

	render() {
		return (
				<ul>
					
					{this.showMenu(menu)}
					<li className="class-default logout-action" onClick={() => this.onLogout()}>
						<span className="my-link-logout">
							<i className="material-icons">input</i><span className="title">Đăng xuất</span>
						</span>
					</li>
					 
				</ul>
		);
	}
}

export default Menu;
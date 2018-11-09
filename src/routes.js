import React from 'react';
import HomePage from './pages/Home/HomePage';

import UsersPage from './pages/Users/UsersPage';
import UserAddPage from './pages/Users/UserAddPage';
import ChangePass from './pages/Users/ChangePass';
import MyAccount from './pages/Users/MyAccount';
import Permission from './pages/Users/Permission';

import CustomersPage from './pages/Customer/CustomersPage';
import CustomerActionPage from './pages/Customer/CustomerActionPage';

import SmsPage from './pages/Sms/SmsPage';
import SmsActionPage from './pages/Sms/SmsActionPage';

import SmsCategory from './pages/Sms/SmsCategory';
import SmsCategoryActionPage from './pages/Sms/SmsCategoryActionPage';

import CallingPage from './pages/Calling/CallingPage';
import CallingActionPage from './pages/Calling/CallingActionPage';

import ProductPage from './pages/Products/ProductPage';
import ProductActionPage from './pages/Products/ProductActionPage';

import OrderPage from './pages/Orders/OrderPage';
import OrderPageFilter from './pages/Orders/OrderPageFilter';
import OrderActionPage from './pages/Orders/OrderActionPage';

import CategoryPage from './pages/Category/CategoryPage';
import CategoryActionPage from './pages/Category/CategoryActionPage';

import ServicePage from './pages/Service/ServicePage';
import ServiceActionPage from './pages/Service/ServiceActionPage';

import RolePage from './pages/Roles/RolesPage';
import RoleActionPage from './pages/Roles/RoleActionPage';
// 404
import NotFoundPage from './pages/NotFound/404_NotFoundPage';
// 403
import Forbidden from './pages/NotFound/403_Forbidden';
import AuthExample from './pages/Action/AuthExample';


import Login from './pages/Login/Login';
const routes = [
	// Home
	{
		path: '/',
		exact: true, // required
		main: () => <HomePage/>
	},
	// Users
	{
		path: '/users',
		exact: true, // required
		main: ({match, location, history}) => <UsersPage match={match} location={location} history={history}/>
	},
	{
		path: '/users/add',
		exact: false,
		main: ({location, history}) => <UserAddPage history={history} location={location}/>
	},
	{
		path: '/users/edit/:id',
		exact: false,
		main: ({match, location, history}) => <UserAddPage match={match} history={history} location={location}/>
	},
	{
		path: '/my-account',
		exact: false,
		main: ({match, location, history}) => <MyAccount match={match} history={history} location={location}/>
	},
	{
		path: '/change-password',
		exact: false,
		main: ({match, location, history}) => <ChangePass match={match} history={history} location={location}/>
	},
	{
		path: '/permission/edit/:id',
		exact: false,
		main: ({match, location, history}) => <Permission match={match} history={history} location={location}/>
	},
	{
		path: '/permission',
		exact: true,
		main: ({match, location, history}) => <Permission match={match} history={history} location={location}/>
	},

	// Products
	{
		path: '/products',
		exact: true, // required
		main: ({match, location, history}) => <ProductPage match={match} location={location} history={history}/>
	},
	{
		path: '/products/add',
		exact: false,
		main: ({location, history}) => <ProductActionPage history={history} location={location}/>
	},
	{
		path: '/products/edit/:id',
		exact: false,
		main: ({match, location, history}) => <ProductActionPage match={match} history={history} location={location}/>
	},
	// Categories
	{
		path: '/category',
		exact: true, // required
		main: ({match, location, history}) => <CategoryPage match={match} location={location} history={history}/>
	},
	{
		path: '/category/add',
		exact: false,
		main: ({location, history}) => <CategoryActionPage history={history} location={location}/>
	},
	{
		path: '/category/edit/:id',
		exact: false,
		main: ({match, location, history}) => <CategoryActionPage match={match} history={history} location={location}/>
	},
	// Services
	{
		path: '/service',
		exact: true, // required
		main: ({match, location, history}) => <ServicePage match={match} location={location} history={history}/>
	},
	{
		path: '/service/add',
		exact: false,
		main: ({location, history}) => <ServiceActionPage history={history} location={location}/>
	},
	{
		path: '/service/edit/:id',
		exact: false,
		main: ({match, location, history}) => <ServiceActionPage match={match} history={history} location={location}/>
	},
	// role
	{
		path: '/role',
		exact: true, // required
		main: ({match, location, history}) => <RolePage match={match} location={location} history={history}/>
	},
	{
		path: '/role/add',
		exact: false,
		main: ({location, history}) => <RoleActionPage history={history} location={location}/>
	},
	{
		path: '/role/edit/:id',
		exact: false,
		main: ({match, location, history}) => <RoleActionPage match={match} history={history} location={location}/>
	},
	// Orders
	{
		path: '/orders',
		exact: true, // required
		main: ({match, location, history}) => <OrderPage match={match} location={location} history={history}/>
	},
	{
		path: '/orders/filter/:start/:end',
		exact: false, // required
		main: ({match, location, history}) => <OrderPageFilter match={match} location={location} history={history}/>
	},
	{
		path: '/orders/add',
		exact: false,
		main: ({location, history}) => <OrderActionPage history={history} location={location}/>
	},
	{
		path: '/orders/edit/:id/:customer_id',
		exact: false,
		main: ({match, location, history}) => <OrderActionPage match={match} history={history} location={location}/>
	},
	// Customers
	{
		path: '/customers',
		exact: true,
		main: () => <CustomersPage/>
	},
	{
		path: '/customers/add',
		exact: false,
		main: ({location, history}) => <CustomerActionPage history={history} location={location}/>
	},
	{
		path: '/customers/edit/:id',
		exact: false,
		main: ({match, location, history}) => <CustomerActionPage match={match} history={history} location={location}/>
	},
	// Sms
	{
		path: '/sms',
		exact: true,
		main: ({match, location, history}) => <SmsPage match={match} history={history} location={location}/>

	},
	{
		path: '/sms/add',
		exact: false,
		main: ({location, history}) => <SmsActionPage history={history} location={location}/>
	},
	{
		path: '/sms/edit/:id',
		exact: false,
		main: ({match, location, history}) => <SmsActionPage match={match} history={history} location={location}/>
	},
	// calling
	{
		path: '/calling',
		exact: true,
		main: ({match, location, history}) => <CallingPage match={match} history={history} location={location}/>

	},
	{
		path: '/calling/add',
		exact: false,
		main: ({location, history}) => <CallingActionPage history={history} location={location}/>
	},
	{
		path: '/calling/edit/:id',
		exact: false,
		main: ({match, location, history}) => <CallingActionPage match={match} history={history} location={location}/>
	},
	// Sms Categories
	{
		path: '/sms-category',
		exact: true,
		main: ({location, history}) => <SmsCategory history={history} location={location}/>
	},
	{
		path: '/sms-category/edit/:id',
		exact: false,
		main: ({match, location, history}) => <SmsCategoryActionPage match={match} history={history} location={location}/>
	},
	// LOGIN
	{
		path: '/login',
		exact: false,
		main: ({match}) => <Login match={match}/>
	},
	// LOGIN
	{
		path: '/auth-router',
		exact: false,
		main: ({match}) => <AuthExample match={match}/>
	},
	// 403
	{
		path: '/403',
		exact: false,
		main: ({match}) => <Forbidden match={match}/>
	},
	// 404 NotFoundPage
	{
		path: '',
		exact: false,
		main: ({match}) => <NotFoundPage  match={match}/>
	},
	
];

export default routes;
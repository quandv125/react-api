import React from 'react';
import HomePage from './pages/Home/HomePage';

import UsersPage from './pages/Users/UsersPage';
import UserAddPage from './pages/Users/UserAddPage';

import CustomersPage from './pages/Customer/CustomersPage';
import CustomerActionPage from './pages/Customer/CustomerActionPage';

import SmsPage from './pages/Sms/SmsPage';
import SmsActionPage from './pages/Sms/SmsActionPage';

import ProductPage from './pages/Products/ProductPage';
import ProductActionPage from './pages/Products/ProductActionPage';

import OrderPage from './pages/Orders/OrderPage';
import OrderActionPage from './pages/Orders/OrderActionPage';

import CategoryPage from './pages/Category/CategoryPage';
import CategoryActionPage from './pages/Category/CategoryActionPage';

import NotFoundPage from './pages/NotFound/NotFoundPage';


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
		path: '/users/:id/edit',
		exact: false,
		main: ({match, location, history}) => <UserAddPage match={match} history={history} location={location}/>
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
		path: '/products/:id/edit',
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
		path: '/category/:id/edit',
		exact: false,
		main: ({match, location, history}) => <CategoryActionPage match={match} history={history} location={location}/>
	},
	// Orders
	{
		path: '/orders',
		exact: true, // required
		main: ({match, location, history}) => <OrderPage match={match} location={location} history={history}/>
	},
	{
		path: '/orders/add',
		exact: false,
		main: ({location, history}) => <OrderActionPage history={history} location={location}/>
	},
	{
		path: '/orders/:id/edit',
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
		path: '/customers/:id/edit',
		exact: false,
		main: ({match, location, history}) => <CustomerActionPage match={match} history={history} location={location}/>
	},
	// Sms
	{
		path: '/sms',
		exact: true,
		main: () => <SmsPage/>
	},
	{
		path: '/sms/add',
		exact: false,
		main: ({location, history}) => <SmsActionPage history={history} location={location}/>
	},
	{
		path: '/sms/:id/edit',
		exact: false,
		main: ({match, location, history}) => <SmsActionPage match={match} history={history} location={location}/>
	},
	// LOGIN
	{
		path: '/login',
		exact: false,
		main: ({match}) => <Login match={match}/>
	},
	{
		path: '',
		exact: false,
		main: ({match}) => <NotFoundPage  match={match}/>
	}
];

export default routes;
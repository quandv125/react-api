import React from 'react';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import ProductListPage from './pages/ProductList/ProductListPage';
import ProductActionPage from './pages/Action/ProductActionPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import UsersPage from './pages/Users/UsersPage';
import UserAddPage from './pages/Users/UserAddPage';
import Login from './pages/Login/Login';
const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomePage/>
	},
	{
		path: '/about',
		exact: false,
		main: () => <AboutPage/>
	},
	// Products
	{
		path: '/products-list',
		exact: false,
		main: ({match, location, history}) => <ProductListPage match={match} location={location} history={history}/>
	},
	{
		path: '/products/add',
		exact: false,
		main: ({history}) => <ProductActionPage history={history}/>
	},
	{
		path: '/products/:id/edit',
		exact: false,
		main: ({match, history}) => <ProductActionPage match={match} history={history}/>
	},

	// Users
	{
		path: '/users',
		exact: true,
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
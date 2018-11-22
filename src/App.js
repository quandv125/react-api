import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // => /#
import Navbar from './components/Elements/Navbar';
import Sidebar from './components/Elements/Sidebar';
import Login from './pages/Login/Login';
import routes from './routes';
import { ISLOGIN, ROLE } from './constants/config';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from './constants/config';
import Forbidden from './pages/NotFound/403_Forbidden'; // 403
import {findIndex, split} from 'lodash';
import callApi from './utils/apiCaller';
import { actLogoutRequest } from './actions/index';

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			isLogin : ISLOGIN,
			role_id : ROLE,
			pages: ''
		}
	}

	componentDidMount(){
		const ele = document.getElementById('ipl-progress-indicator')
		if(ele){
		  	// fade out
			ele.classList.add('available')
			setTimeout(() => {
				// remove from DOM
				ele.outerHTML = ''
			},300)
		}
		if(this.state.role_id){
			callApi('GET', config.ROLES_URL  + "/permission/" + this.state.role_id, null).then( res => {
				if(res && res.data.status){
					this.setState({
						role_id: this.state.role_id,
						pages: res.data.data
					});
				}
			});
		}
		
	}

	componentWillReceiveProps(nextprops){
		this.setState({
			isLogin: nextprops.authentication.loggedIn
		});	

		if(nextprops.authentication.role && typeof nextprops.authentication.role !== 'undefined'){
			callApi('GET', config.ROLES_URL  + "/permission/" + nextprops.authentication.role, null).then( res => {
				if(res.data.status){
					this.setState({
						role_id: nextprops.authentication.role,
						pages: res.data.data
					});
				}
			});
		}
	}

	onActLogout = () => {
		this.props.onActLogout();
	}

	render() {
		if( this.state.isLogin ) {
			return (
				<Router>
					<Route render={({ location }) => (
						<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
							<div className="App" >
								<Navbar/>
								<div className="page-container row-fluid">
									<Sidebar role_id={this.state.role_id} onActLogout={this.onActLogout} />
									<div className="page-content ">
										<div className="content sm-gutter">
										<div className="page-title"></div>
										</div>
										{/* <div className="grid simple ">
											<div className="grid-body no-border"> */}
												<Switch location={location}>
													{this.showContentMenu(routes,location)}
												</Switch>
											{/* </div>
										</div> */}
									</div>
								</div>
							</div>
						</CSSTransitionGroup>
					)}/>
				</Router>
			);
		} else {
			return (
				<CSSTransitionGroup transitionName={config.LOGINTRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
					<Login />
				</CSSTransitionGroup>
			);
		}
		
	}

	isAuthenticated = (location) => {
		if(this.state.pages !== ''){
			// var pages = [
			// 	{ 'page': '' },
			// 	{ 'page': 'sms' },
			// 	{ 'page': 'products' },
			// 	{ 'page': 'orders' },
			// 	{ 'page': 'customers' },
			// 	{ 'page': 'customers/add' },
			// 	{ 'page': 'customers/205' },
			// ];
			var {pages} = this.state;
			
			var path = null;
			var arr = split(location.pathname,'/', 3);
			if(arr[2]) {
				path = arr[1] + "/" + arr[2];
			} else{
				path = arr[1];
			}
			
			if( findIndex(pages, { 'page': path }) === -1 ) {
				return true;
			}
			return false;
		}
		return false;
	}

	showContentMenu = (routes,location) => {
		var result = null;
		var {role_id} = this.state;
		if(role_id && role_id !== config.ADMINISTRATOR) {
			if( this.isAuthenticated(location) ){
				return <Route exact={false} path='/' component={Forbidden}/> // ===> redirect to 403
			}
		}
		
		if(routes.length > 0){
			result = routes.map((route, index) => {
				return (
					<Route 
						key={index} 
						path={route.path} 
						exact={route.exact} 
						component={route.main} 
					/>
				);
			})
		}
		return result;
	}
	
}

const mapStateToProps = state => {
	return {
		authentication: state.authentication,
	}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onActLogout: () => {
            dispatch(actLogoutRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


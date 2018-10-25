import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Login from './pages/Login/Login';
import routes from './routes';
import { ISLOGIN } from './constants/config';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from './constants/config';

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			isLogin : ISLOGIN
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
		  },100)
		}
	}

	componentWillReceiveProps(nextprops){
		this.setState({
			isLogin: nextprops.authentication.loggedIn
		});	
	}

	render() {
		if( this.state.isLogin ) {
			return (
				<Router>
					<Route render={({ location }) => (
						<div className="App" >
							
							<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
							<Menu />
							<Switch location={location}>
								{this.showContentMenu(routes,location)}
							</Switch>
							</CSSTransitionGroup>

						</div>
					)}/>
				</Router>
			);
		} else {
			return (
				
				<div className="App" >
					<Login />
				</div>
				
			);
		}
		
	}

	showContentMenu = (routes,location) => {
		var result = null;
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

// const mapDispatchToProps = (dispatch, props) => {
// 	return {
// 		getUsers : () => {
// 			dispatch(actFetchUsersRequest());
// 		},
// 		onDeleteUser : (id) => {
// 			dispatch(actDeleteUserRequest(id));
// 		}
// 	}
// }

export default connect(mapStateToProps, null)(App);


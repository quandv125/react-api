import React, { Component } from 'react';
import {connect} from 'react-redux';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			AuthLogin: null
		};
	
		// console.log('contrucstor'); // 1
		this.onTest = this.onTest.bind(this);
	}

	componentWillMount(){
		// console.log('componentWillMount'); // 2
		// console.log(this.props);
		this.setState({
			AuthLogin: this.props.AuthLogin
		});
	}

	componentDidMount(){
		// console.log('componentDidMount'); // 4
	}

	// ****** //


	shouldComponentUpdate(nextProps, nextState){
		// 1.2
		// console.log('shouldComponentUpdate');
		// console.log(nextProps);
		// console.log(nextState);
		return true;
	}

	componentWillUpdate(nextProps, nextState){
		// 1.3
		// console.log('componentWillUpdate');
		// console.log(nextProps);
		// console.log(nextState);
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		// 1.5
		// console.log('componentDidUpdate');
		// console.log(prevProps);
		// console.log('====================================');
		// console.log(prevState);
		// console.log('====================================');
		// console.log(this.state);
	}

	// ****** //

	componentWillUnmount(){
		// console.log('componentWillUnmount');
	}
	componentWillReceiveProps(nextprops){
		// console.log('componentWillReceiveProps')
		if ( nextprops && nextprops.AuthLogin){
			this.setState({
				AuthLogin: nextprops.AuthLogin
			});
		}
	}
	onTest() {
		// 1.1 
		// console.log('test');
		this.setState({
			test: 'new'
		});
		
	}
	
	//Case 1:  1. contrucstor 2. componentWillMount 3. render 4. componentDidMount
	//Case 2:  1. func: test 2. shouldComponentUpdate 3. ComponentWillUpdate 4. render 5. componentDidUpdate
	render() {
		// console.log('render'); // 3 | 1.4
		var username = this.props.AuthLogin.loggedIn ? this.props.AuthLogin.data.username : null;
		var email = this.props.AuthLogin.loggedIn ? this.props.AuthLogin.data.email : null;
	
		return (
			<React.Fragment>
				
				<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<button type="button" onClick={this.onTest} className="btn btn-default">button</button>
				</div>
				<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					{ this.state.AuthLogin && this.state.AuthLogin.loggedIn ? 
						<div> <h3>Login Successfully </h3> <div>Username: {username}</div><div>Email: {email}</div></div> 
						: null	
					}
				
				</div>
				
			</React.Fragment>
		);
		
	}
	
}

const mapStateToProps = (state) => {

	return {
		AuthLogin: state.authentication
	}
}

export default connect(mapStateToProps, null) (Home);

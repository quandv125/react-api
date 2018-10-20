import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import * as config from './../../constants/config';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			AuthLogin: JSON.parse(sessionStorage.getItem('authentication'))
		};
		// console.log('contrucstor'); // 1
		this.onTest = this.onTest.bind(this);
	}

	// componentWillMount(){
	// 	// console.log('componentWillMount'); // 2
	// 	// console.log(this.props);
	// 	this.setState({
	// 		AuthLogin: this.props.AuthLogin
	// 	});
	// }

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
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div>
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						{ this.state.AuthLogin && this.state.AuthLogin.status ? 
							(
								<div> 
									<h3>Login Successfully </h3> 
								</div> 
							)
							: 
							(
								<Link to="/login" className="my-link">
									Login
								</Link>
							)
						}
					</div>
				</div>
			</CSSTransitionGroup>
		);
		
	}
	
}

const mapStateToProps = (state) => {
	return {
		AuthLogin: state.authentication
	}
}

export default connect(mapStateToProps, null) (Home);

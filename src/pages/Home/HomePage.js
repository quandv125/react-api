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
					
						{ this.state.AuthLogin && this.state.AuthLogin.status ? 
							(
								<div className="grid simple">
									<div className="grid-body no-border">
									
									<div className="row">
											<div className="col-md-4 col-vlg-3 col-sm-6">
												<div className="tiles green m-b-10">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title text-black">OVERALL SALES </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Overall Visits</span> <span className="item-count animate-number semi-bold" data-value="2415" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Today's</span> <span className="item-count animate-number semi-bold" data-value="751" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Monthly</span> <span className="item-count animate-number semi-bold" data-value="1547" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="64.8%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description ">4% higher <span className="blend">than last month</span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 col-vlg-3 col-sm-6">
												<div className="tiles blue m-b-10">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title text-black">OVERALL VISITS </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Overall Visits</span> <span className="item-count animate-number semi-bold" data-value="15489" data- animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Today's</span> <span className="item-count animate-number semi-bold" data-value="551" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Monthly</span> <span className="item-count animate-number semi-bold" data-value="1450" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="54%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description ">4% higher <span className="blend">than last month</span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 col-vlg-3 col-sm-6">
												<div className="tiles purple m-b-10">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title text-black">SERVER LOAD </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Overall Load</span> <span className="item-count animate-number semi-bold" data-value="5695" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Today's</span> <span className="item-count animate-number semi-bold" data-value="568" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Monthly</span> <span className="item-count animate-number semi-bold" data-value="12459" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="90%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description ">4% higher <span className="blend">than last month</span></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 col-vlg-3 visible-xlg visible-sm col-sm-6">
												<div className="tiles red m-b-10">
													<div className="tiles-body">
														{/* <div className="controller">
															<a href="javascript:;" className="reload"></a>
															<a href="javascript:;" className="remove"></a>
														</div> */}
														<div className="tiles-title text-black">OVERALL SALES </div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Overall Sales</span> <span className="item-count animate-number semi-bold" data-value="5669" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats">
															<div className="wrapper transparent">
																<span className="item-title">Today's</span> <span className="item-count animate-number semi-bold" data-value="751" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="widget-stats ">
															<div className="wrapper last">
																<span className="item-title">Monthly</span> <span className="item-count animate-number semi-bold" data-value="1547" data-animation-duration="700">0</span>
															</div>
														</div>
														<div className="progress transparent progress-small no-radius m-t-20" >
															<div className="progress-bar progress-bar-white animate-progress-bar" data-percentage="64.8%"></div>
														</div>
														<div className="description"> <span className="text-white mini-description ">4% higher <span className="blend">than last month</span></span>
														</div>
													</div>
												</div>
											</div>
										</div></div></div>


							
							)
							: 
							(
								<Link to="/login" className="my-link">
									Login
								</Link>
							)
						}
				
				
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

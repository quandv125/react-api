import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
// import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as config from './../../constants/config';
class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			loggedOut: false
		}
		// this.onFormSubmit = this.onFormSubmit.bind(this)
		// this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
    }

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<h2>About</h2>
						{/* <form onSubmit={this.onFormSubmit}>
							
							<input type="file" onChange={this.onChange} />
							<br/>
							<button type="submit">Upload</button>
						</form> */}
					</div>    
				</div>
			</CSSTransitionGroup>

		)
	}
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps, null)(About);
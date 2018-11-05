import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import * as config from '../../constants/config';
class Forbidden extends Component {
	render() {
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

			<div className="error-wrapper container">
				<div className="row">
					<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-offset-1 col-xs-10">
						<div className="error-container">
							<div className="error-main">
								<div className="error-number"> 403 </div>
								<div className="error-description-mini"> You don't have permission access to this page </div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			</CSSTransitionGroup>
		);
	}
}

export default Forbidden;

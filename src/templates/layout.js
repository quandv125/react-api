import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

class layout extends Component {
    render() {
        return (
            <React.Fragment>
                <CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                    <div className="grid simple">
                        <div className="grid-body no-border">
                            <Link to="/" className="margin-right20">
                                <Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
                                <i className="material-icons">arrow_back</i>
                                </Button>	
                            </Link>
                            <Link to="/users/add" className="float-right">
                                <Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
                                    Add
                                </Button>					
                            </Link>
                            <div className="clearfix"></div><br/>
                            <div>
                                content
                            </div>


                        </div>
                    </div>
                    
                    
                </CSSTransitionGroup>
            </React.Fragment>
        );
    }
}

export default layout;
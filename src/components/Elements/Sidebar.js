import React, { Component } from 'react';
import Menu from './../Menu/Menu';
import avatar from './../../images/avatar.jpg';
class Sidebar extends Component {

    constructor (props) {
        super(props)
        this.state = {
            name: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).name : '',
            display_name: sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).display_name : ''
        }
    }

    render() {
        var {name, display_name} = this.state;
        return (
            <div>
                <div className="page-sidebar" id="main-menu">

                    <div className="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
                        <div className="user-info-wrapper sm">
                            <div className="profile-wrapper sm">
                                <img src={avatar} alt="" data-src={avatar} data-src-retina="assets/img/profiles/avatar2x.jpg" width="69" height="69" />
                                <div className="availability-bubble online"></div>
                            </div>
                            <div className="user-info sm">
                                <div className="username">{name}</div>
                                <div className="status">{display_name}</div>
                            </div>
                        </div>
                            <p className="menu-title sm"> BROWSE <span className="pull-right"><a href="/"><i className="material-icons">refresh</i></a></span></p>
                        
                            <Menu /> 
                            
                        <div className="clearfix"></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
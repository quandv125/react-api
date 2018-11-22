import React, { Component } from 'react';
// import avatar from './../../images/avatar.jpg';
import logo from './../../images/logo.png';

import LoginButton from "./../Menu/LoginButton";
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="header navbar navbar-inverse ">

                    <div className="navbar-inner">
                        
                        <div className="header-seperation">
                            <ul className="nav pull-left notifcation-center visible-xs visible-sm">
                                <li className="dropdown">
                                    <a href="/main-menu" data-webarch="toggle-left-side">
                                        <i className="material-icons">menu</i>
                                    </a>
                                </li>
                            </ul>
                            <Link to="/">
                                <img src={logo} className="logo" alt="" data-src="images/logo.png" data-src-retina="assets/img/logo2x.png" width="106" height="50" />
                            </Link>
                            <ul className="nav pull-right notifcation-center">
                                <li className="dropdown hidden-xs hidden-sm">
                                    <Link to="/" className="dropdown-toggle active" data-toggle="">
                                        <i className="material-icons">home</i>
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>

                        <div className="header-quick-nav">

                            <div className="pull-left">
                                <ul className="nav quick-section">
                                    <li className="quicklinks">
                                        <span id="layout-condensed-toggle">
                                            <i className="material-icons">menu</i>
                                        </span>
                                    </li>
                                </ul>
                                {/* <ul className="nav quick-section">
                                    <li className="quicklinks  m-r-10">
                                        <a href="/" className="">
                                            <i className="material-icons">refresh</i>
                                        </a>
                                    </li>
                                    <li className="quicklinks">
                                        <a href="/" className="">
                                            <i className="material-icons">apps</i>
                                        </a>
                                    </li>
                                    <li className="quicklinks">
                                        <span className="h-seperate"></span>
                                    </li>
                                    <li className="quicklinks">
                                        <a href="/" className="" id="my-task-list" data-placement="bottom" data-content='' data-toggle="dropdown" data-original-title="Notifications">
                                            <i className="material-icons">notifications_none</i>
                                            <span className="badge badge-important bubble-only"></span>
                                        </a>
                                    </li>
                                  
                                </ul> */}
                            </div>
                            

                            <div className="pull-right">
                                {/* <div className="chat-toggler sm">
                                    <div className="profile-pic">
                                        <img src={avatar} alt="" data-src={avatar} data-src-retina="assets/img/profiles/avatar_small2x.jpg" width="35" height="35" />
                                        <div className="availability-bubble online"></div>
                                    </div>
                                </div> */}
                                <ul className="nav quick-section ">
                                    <li className="quicklinks">
                                        <a data-toggle="dropdown" className="dropdown-toggle  pull-right " href="/" id="user-options">
                                            <i className="material-icons">tune</i>
                                        </a>
                                        <ul className="dropdown-menu  pull-right" role="menu" aria-labelledby="user-options">
                                            <li>
                                                <Link to="/my-account">
                                                     Tài khoản
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/change-password">
                                                     Đổi mật khẩu
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <a href="calender.html">My Calendar</a>
                                            </li>
                                            <li>
                                                <a href="email.html"> My Inbox&nbsp;&nbsp;
                                                    <span className="badge badge-important animated bounceIn">2</span>
                                                </a>
                                            </li> */}
                                            <li className="divider"></li>
                                            
                                            <LoginButton />
                                            
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </div>

                        </div>

                    </div>

                    </div>
            </div>
        );
    }
}

export default Navbar;
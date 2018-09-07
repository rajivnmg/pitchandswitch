import React, {Component} from 'react';
import Style from './main.css';
import '../slick.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import userIMg from '../images/user-pic.png';
import CategoryMenu from './categoryMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faTag, faGrinAlt, faFrownOpen, faEnvelope, faTruck, faClock, faTimesCircle, faCog } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const navHide = {
    display: 'none'
}

class Header extends Component {
	constructor(props){
    super(props);
    this.state = {
	     user:{
		 email:'',
		 lastName:'',
		 middleName:'',
		 profilePic:'',
		 userName:''
		},
	    notifications:0,
	    notifications:[]
	}	
     this.logoutHandler = this.logoutHandler.bind(this);
     console.log('TOken', localStorage.getItem('jwtToken'));
     if(localStorage.getItem('jwtToken') === null){
       window.location.href="#/login";
      }
  }
  
  logoutHandler = (e) => {
    localStorage.removeItem('jwtToken');    
    //window.location.reload();
    this.props.history.push('/login');
  };
  componentDidMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	console.log("jwtToken",localStorage.getItem('jwtToken'))
	if(localStorage.getItem('jwtToken') !== null){
		axios.get('/user/getLoggedInUser').then(result => {
			console.log("result",result)
			this.setState({ 
				user:result.data.result,
				notification_type:result.data.notification_type,
				notifications :result.data.notifications,
				totalNotifications:result.data.totalNotifications
			})			
		})
	}	
  }
	
Capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
} 
	
    render() {
        return(
                <header>
                    <figure className="logo">
                        <Link to={'/'}><img src={Logo} alt='logo' /></Link>
                    </figure>
                    <CategoryMenu />
                    <div className="search-container">
                        <div className="location"><input type="text" placeholder="Texas" /></div>
                        <div className="search"><input type="text" placeholder="Texas" /></div>
                        <input type="submit" value="search" className="search-icon" />
                        <div className="cl"></div>
                    </div>

                    <If condition={this.state.user.userName !==''}>
                    <Then>
                    <nav className="after-login">
					 <ul>
						<li><span className="pic"><img src={userIMg} alt={userIMg} /></span><a className="drop-arrow" href="#">{this.Capitalize(this.state.user.userName)} </a>
						<ul className="dashboard-subnav">
							<li><a href={'/dashboard'} className="dashboard-icon">Dashboard</a></li>
							<li><a href="#" className="my-trades-icon">My Trades </a></li>
							<li><a href="#" className="wishlist-icon">Wishlist</a></li>
							<li><a href="#" className="trade-match-icon">Trade Match</a></li>
							<li><a href={'/my-treasure-chest'} className="my-chest-icon">My Treasure Chest</a></li>
							<li><a href="#" className="settings-icon">Settings</a></li>
							<li><a href="#" className="help-icon">Help</a></li>
							<li><Link to={''} onClick={this.logoutHandler} className="login-link">Logout</Link></li>
						</ul>
					  </li>
				    <li className="notification "><a href="#"><i className="icon"></i></a>
					<ul className="dashboard-subnav notification-show">
					   <li><h3>Notifications</h3></li>
						<li>
						     <div className="scroll-div"> 
								<div className="row unread">
									<FontAwesomeIcon icon="tag" /> You have got a new pitch request
								</div>                            
								<div className="row unread">
									<FontAwesomeIcon icon="grin-alt" /> Your pitch request has been accepted
								</div> 
								<div className="row">
									<FontAwesomeIcon icon="frown-open" /> Your pitch request has been rejected
								</div> 
								<div className="row unread">
									<FontAwesomeIcon icon="envelope" /> You have got a new message
								</div> 
								<div className="row">
									<FontAwesomeIcon icon="truck" /> Your item has been delivered successfully
								</div> 
								<div className="row">
									<FontAwesomeIcon icon="clock" /> Your subscription will end on 25 May 2018
								</div> 
								<div className="row">
									<FontAwesomeIcon icon="times-circle" /> Trade has been end you have pitched on
								</div> 
								<div className="row">
									<FontAwesomeIcon icon="cog" /> New features updated on your account
								</div> 
							</div>
						</li>
					</ul>                    
				</li>
			</ul>
		    </nav>
		    </Then>
	       <Else>
             <nav className="login-nav">
                   <Link to={'/login'} className="login-link">Login</Link>
                   <Link to={'/register'} className="register-link">Register</Link>
              </nav>
           </Else>
		   </If>
              <div className="cl"></div>        
           </header>
         )

    }
}

export default Header;

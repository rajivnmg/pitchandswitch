import React, {Component} from 'react';
import Style from './main.css';
import '../slick.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import CategoryMenu from './categoryMenu';
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
                  
                    <nav style={navHide}>
						 <If condition={this.state.user.userName !==''}>
						<Then>
							<ul>
								<li><Link to={'/dashboard/Dashboard'}>Dashboard</Link></li>
								<li><Link to={'/myTrades/MyTrades'}>My Trades</Link></li>
								<li><a href="#">Wish list</a></li>
								<li><a href="#">Treasure Chest</a></li>
								<li><a href="#">Treasure Hunt</a></li>
								<li><a href="#">Message</a></li>
								<li><a href="#">Notifications</a></li>
								<li><a href="#">My Profile</a>
									<ul>
										<li><a href="#">Update email </a></li>
										<li><a href="#">Upgrade Plans </a></li>
										<li><a href="#">Contact Us</a></li>
										<li><a href="#">Settings</a></li>
										<li> <Link to={''} onClick={this.logoutHandler} className="login-link">Logout</Link></li>
									</ul>
								</li>
							</ul>
                         
						</Then>						
						<Else>
						 <Link to={'/login'} className="login-link">Login</Link>
						 <Link to={'/register'} className="register-link">Register</Link>
						</Else>
					 </If>
                        
                    </nav>
                    <div className="cl"></div>
                </header>
                )
    }
}

export default Header;

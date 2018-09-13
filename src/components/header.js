import React, {Component} from 'react';
import Style from './main.css';
import '../slick.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import Logo from '../images/logo.png';
import userIMg from '../images/user-pic.png';
import CategoryMenu from './categoryMenu';
import { AutoComplete } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faTag, faGrinAlt, faFrownOpen, faEnvelope, faTruck, faClock, faTimesCircle, faCog,faIcon } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const Option = AutoComplete.Option;
const navHide = {   display: 'none' }

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
	    notifications:[],
	    result: [],
	    rs: []
	}	

     this.logoutHandler = this.logoutHandler.bind(this);    
     if(localStorage.getItem('jwtToken') === null){
       //window.location.href="#/login";
      }
  }
  
  logoutHandler = (e) => {
    localStorage.removeItem('jwtToken');        
    this.props.history.push('/login');
  };

	searchHandler = () => {
	   console.log("Click Search")
	}
	
	searchCategory(categoryID) {
		console.log('mmmmmm',categoryID);
		//~ this.setState({
			  //~ categoryID:categoryID,
		//~ });
     }
  
  componentDidMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	console.log("jwtToken",localStorage.getItem('jwtToken'))
	if(localStorage.getItem('jwtToken') !== null){
		axios.get('/user/getLoggedInUser').then(result => {			
			this.setState({ 
				user:result.data.result,
			})						
		})
	}

	
	axios.get('/user/frontNotification').then(result => {
		this.setState({ 
			user:result.data.result,
			notification_type:result.data.notification_type,
			notifications :result.data.notifications,
			totalNotifications:result.data.totalNotifications
		})	
		
	})

	axios.get('/location/listingCity').then(result => {			  
		this.setState({
			options: result.data.result, 
		});	  
	})	
		
	 axios.get('/product/activeProducts').then(rs => {			   			 
		this.setState({
		    productsListing: rs.data.result,           
		});  							  
	  })
    }
      
	
   Capitalize(str){
      //return str.charAt(0).toUpperCase() + str.slice(1);
   } 
	
     render() {
		   let optionsLists; 
		    let optionsAll;
			    if(this.state.productsListing){
				  let optionsList = this.state.productsListing; 
				    optionsLists = optionsList.map(s => <li onClick={this.searchCategory(s.productCategory._id)} key={s.productCategory._id}>{s.productName + ' - ' +s.productCategory.title} </li>);
			    }
                if(this.state.options){
				    let optionsListing = this.state.options; 
				    optionsAll = optionsListing.map(p => <li  key={p._id}>{p.cityName + ' - ' + p.stateSelect.stateName}</li>); 
			    }
			    
			    let matchingData = this.state.notification_type;
              return(
                <header>
                    <figure className="logo">
                        <Link to={'/'}><img src={Logo} alt='logo' /></Link>
                    </figure>
                    <CategoryMenu />
                    <div className="search-container">
                        <div className="location">
                           <AutoComplete
							  style={{ width:85 }}
							  dataSource={optionsAll}
							  placeholder="Search"
							  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
							  />
                        </div>
                        <div className="search">
                              <AutoComplete
								  style={{ width:410 }}
								  dataSource={optionsLists}
								  placeholder="Search"
								  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
							  />
                           </div>
                        <input type="button" onClick={this.searchHandler} value="search" className="search-icon" />
                        <div className="cl"></div>
                    </div>
                    <If condition={this.state.user.userName && this.state.user.userName !=""}>
                    <Then>
                    <nav className="after-login">
					 <ul>
						<li><span className="pic"><img src={userIMg} alt={userIMg} /></span><a className="drop-arrow" href="#">{this.Capitalize(this.state.user.userName)}</a>
						<ul className="dashboard-subnav">
							<li><Link to={'/dashboard'} className="dashboard-icon">Dashboard</Link></li>
							<li><Link to={'/my-trades'} className="my-trades-icon">My Trades</Link></li>
							<li><a href="#" className="wishlist-icon">Wishlist</a></li>
							<li><a href="#" className="trade-match-icon">Trade Match</a></li>
							<li><Link to={'/my-treasure-chest'} className="my-chest-icon">My Treasure Chest</Link></li>
							<li><a href="#" className="settings-icon">Settings</a></li>
							<li><a href="#" className="help-icon">Help</a></li>
							<li><Link to={''} onClick={this.logoutHandler} className="login-link">Logout</Link></li>
						</ul>
					  </li>
				    <li className="notification "><a href="#"><i className="icon"></i></a>
					<ul className="dashboard-subnav notification-show">
					   <li><h3>Notifications {this.state.totalNotifications}</h3></li>
						<li><div className="scroll-div"> 
						  { this.state.notifications.map((notificationValue, i) => {
							    const notifyHeading = this.state.notification_type.find(notify => notify.id === notificationValue.notificationTypeId)
							     return (<div className="row unread"><FontAwesomeIcon icon="tag" />{i+1+') '+ notifyHeading.name} </div>
							   )
					         })
					       }
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

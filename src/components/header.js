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
import {  fasTag, faTag, faGrinAlt, faFrownOpen, faEnvelope, faTruck, faClock, faTimesCircle, faCog,faIcon } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const constant = require('../config/constant')
const Option = AutoComplete.Option;
const navHide = {   display: 'none' }

class Header extends Component {
	constructor(props){
	//let categoryId = props.match.params.id;
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
	     rs: [],
	     searchData:"",
	     searchD :"",
	     categoryId :"",
		 latitude:"",
		 longitude:"",
		 gmapsLoaded: false
	}
     this.logoutHandler = this.logoutHandler.bind(this);
     this.onSearchHandler = this.searchHandler.bind(this);
     if(localStorage.getItem('jwtToken') === null){
         //window.location.href="#/login";
         //this.props.history.push('/login');
      }
  }

  initMap = () => {
  this.setState({
    gmapsLoaded: true,
  })
}


   handleChange = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    this.setState({address:address});


    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {

        this.setState({latitude:latLng['lat'] ,longitude:latLng['lng']});


    })
      .catch(error => console.error('Error', error));
  };

  formatEndpoint = () => {
    let endpoint = this.state.longitude;

	if(endpoint==""){
		this.setState({address:""});
	}

	};

   logoutHandler = (e) => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('loggedInUser');
      localStorage.setItem('isLoggedIn',0);
      localStorage.removeItem('userId');
	  localStorage.removeItem('userEmail');
	  localStorage.removeItem('userName');
      this.props.history.push('/login');
   };

    searchHandler = () =>
    {

		if (this.state.latitude && this.state.longitude) {
			 var searchData = " ";
			if(this.state.searchData){
			this.setState({searchData:this.state.searchData});
			searchData = this.state.searchData;
			}
			else{
			   this.setState({searchData:" "});

			}
			if(searchData === null || this.state.latitude === null || this.state.longitude === null){
        window.location = constant.PUBLIC_URL+'search-listing';
      }else{
          window.location = constant.PUBLIC_URL+'search-listing/'+searchData+'/'+this.state.latitude+'/'+this.state.longitude;
      }
  } else {
	   var searchData = " ";
	  if(this.state.searchData){
		  searchData = this.state.searchData;
			this.setState({searchData:this.state.searchData});
			}
			else{
			   this.setState({searchData:" "});

			}
	  this.setState({latitude:" " ,longitude:" "});
	  var latitude = "";
	   var longitude = "";
    if(searchData === ""){
      window.location = constant.PUBLIC_URL+'search-listing';
    }else{
      window.location = constant.PUBLIC_URL+'search-listing/'+searchData;
    }
  }


	}

	searchCategory = (search,categoryName)=>{
		this.setState({searchData:search.key})
	};

  componentWillMount(){
	  	if(localStorage.getItem('jwtToken') !== null){
			axios.get('/user/getLoggedInUser').then(result => {
				if(result.data.code === 200){
					this.setState({
						user:result.data.result,
					})
					localStorage.setItem('loggedInUser',result.data.result._id);
					localStorage.setItem('userId',result.data.result._id);
					localStorage.setItem('userEmail',result.data.result.email);
					localStorage.setItem('userName',result.data.result.userName);
					if((result.data.result.emailVerified == "1") && (result.data.result.subscriptionStatus =="1")){
						localStorage.setItem('isLoggedIn',1);
					}else{
						localStorage.setItem('isLoggedIn',0);
					}
				}else{
					 this.props.history.push('/logout');
				}
			})
		}
	}

  componentDidMount() {
	//code for google places api
	window.initMap = this.initMap
	const gmapScriptEl = document.createElement(`script`)
	gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_Is11HwzMFGIFAU-q78V2kQUiT9OQiZI&libraries=places&callback=initMap`
	document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	if(localStorage.getItem('jwtToken') !== null){
		//~ axios.get('/user/getLoggedInUser').then(result => {
			//~ this.setState({
				//~ user:result.data.result,
			//~ })
			//~ // setter method for loggedin user
			//~ localStorage.setItem('loggedInUser',result.data.result._id);
			//~ localStorage.setItem('userId',result.data.result._id);
			//~ localStorage.setItem('userName',result.data.result.userName);
			//~ localStorage.setItem('isLoggedIn',1);
		//~ })

		axios.get('/user/frontNotification').then(result => {
		this.setState({
			notification_type:result.data.notification_type,
			notifications :result.data.notifications,
			totalNotifications:result.data.totalNotifications
		  })
		})
	   console.log("localStorage",localStorage.getItem('isLoggedIn'));
	}


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
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

     render() {
		   let optionsLists;
		    let optionsAll;
			    if(this.state.productsListing){
				  let optionsList = this.state.productsListing;
				    optionsLists = optionsList.map(s => <li onClick={this.searchCategory.bind(s.productCategory._id)} key={s.productCategory._id}>{s.productName + ' - ' +s.productCategory.title} </li>);
			    }
                if(this.state.options){
				    let optionsListing = this.state.options;
				    optionsAll = optionsListing.map(p => <li key={p._id}>{p.cityName + ' - ' + p.stateSelect.stateName}</li>);
			    }
			   let matchingData = this.state.notification_type;
               return(
                <header>
                    <figure className="logo">
                     <If condition={localStorage.getItem('isLoggedIn') == "1"} >
						<Then>
							<Link to={'/dashboard'}><img src={Logo} alt='logo' /></Link>
                        </Then>
                        <Else>
							<Link to={'/'}><img src={Logo} alt='logo' /></Link>
                       </Else>
                     </If>
                    </figure>
                    <CategoryMenu />

                    <div className="search-container">

                        <div className="location">
                           <input className={"form-control textBox hide2"} value={this.state.latitude} name={"latitude"} type={"text"} placeholder="" />
                 <input className={"form-control textBox hide2"} value={this.state.longitude}  name={"longitude"} type={"text"} placeholder="" />
                 {this.state.gmapsLoaded && (
					<PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
					name={"address"}
					>

				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

				  <div>
					<input
					  {...getInputProps({
						placeholder: 'Search Places ...',
						className: 'location-search-input form-control'
						})}
						required={true}
					/>
					<div className="autocomplete-dropdown-container">
					  {loading && <div>Loading...</div>}
					  {suggestions.map(suggestion => {
						const className = suggestion.active
						  ? 'suggestion-item--active'
						  : 'suggestion-item';
						// inline style for demonstration purpose
						const style = suggestion.active
						  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
						  : { backgroundColor: '#ffffff', cursor: 'pointer' };
						return (
						  <div
							{...getSuggestionItemProps(suggestion, {
							  className,
							  style,
							})}
						  >
							<span>{suggestion.description}</span>
						  </div>
						);
					  })}
					</div>
				  </div>
				)}

      </PlacesAutocomplete>
	)}

                        </div>
                        <div className="search">
                              <AutoComplete
								  style={{ width:410 }}
								  dataSource={optionsLists}
								  placeholder="Search"
								  defaultValue={this.state.value}
							  />
                           </div>
                       <input type="submit" value="search" onClick={this.onSearchHandler.bind(this)} className="search-icon" />
                       <div className="cl"></div>
                    </div>
                    <If condition={localStorage.getItem('isLoggedIn') == "1"} >
                    <Then>
                    <nav className="after-login">
					 <ul>
						<li><span className="pic"><img src={userIMg} alt={userIMg} /></span><a className="drop-arrow" href="#">{this.Capitalize(this.state.user.userName.substring(0, 5))}</a>
						<ul className="dashboard-subnav">
							<li><Link to={'/dashboard'} className="dashboard-icon">Dashboard</Link></li>
							<li><Link to={'/my-trades'} className="my-trades-icon">My Trades</Link></li>
							<li><Link to={'/wishlist'} className="wishlist-icon">Wishlist</Link></li>
							<li><Link to={'/trade-match'} className="trade-match-icon">Trade Match</Link></li>
							<li><Link to={'/my-treasure-chest'} className="my-chest-icon">My Treasure Chest</Link></li>
							<li><Link to={'/setting-profile'} className="settings-icon">Settings</Link></li>
							<li><Link to={'/help'} className="help-icon">Help</Link></li>
							<li><Link to={''} onClick={this.logoutHandler} className="login-link">Logout</Link></li>
						</ul>
					  </li>
				    <li className="notification "><a href="#"><i className="icon"></i></a>
					<ul className="dashboard-subnav notification-show">
					   <li><h3>Notifications {this.state.totalNotifications}</h3></li>
						<li><div className="scroll-div">
						  { this.state.notifications.map((notificationValue, i) => {
							    const notifyHeading = this.state.notification_type.find(notify => notify.id === notificationValue.notificationTypeId)
							     return (<div key={notificationValue.notificationTypeId} className="row unread"><FontAwesomeIcon icon="tag" />{i+1+') '+notifyHeading.name} </div>
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

import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Style from './myTreasureChest/myTreasureChest.css';
//import popularItemImg from '../images/popular-item1.jpg';
//import userPicture from '../images/user-pic.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DitchPopup from "./subPopup";
// import { library } from '@fortawesome/fontawesome-svg-core';
//import Select from "react-select";
import axios from "axios";

// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// library.add(faHeart);
import Auxios from './Auxios';
var moment = require("moment");
class settingSubscription extends Component {
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };
  constructor(props) {
    super(props);   
     this.state = {
		activeItem: -1,
		currentUser:{},
		userSubscription: {},
		addons:[],		
		subscriptions : [],
	    isValidated: false,
	    isProcess : false,
	    showFormError:true,
	    showFormSuccess:false,
		message:'',
		paymentAmount:0,
		planTypeId : '',
		planType:'',
		totalInventoryAllowed:0,
		totalTradePermitted:0,		
		addPaymentForm: {
			cardHolderName:'',
			cardNumber:'',
			expiryMonth:'',
			expiryYear:'',
			cardCVV:''
		}
	}    
  }

  componentWillMount() {
    if (localStorage.getItem("jwtToken") !== null) {
      //~ axios.get("/user/getLoggedInUser").then(result => {
        //~ if (result.data.code === 200) {
          //~ this.setState({
            //~ user: result.data.result
          //~ });
          //~ localStorage.setItem("loggedInUser", result.data.result._id);
          //~ localStorage.setItem("userId", result.data.result._id);
          //~ localStorage.setItem("userEmail", result.data.result.email);
          //~ localStorage.setItem("userName", result.data.result.userName);
          //~ if (
            //~ result.data.result.emailVerified === "1" &&
            //~ result.data.result.subscriptionStatus === "1"
          //~ ) {
            //~ localStorage.setItem("isLoggedIn", 1);
          //~ } else {
            //~ localStorage.setItem("isLoggedIn", 0);
          //~ }
        //~ } else {
          //~ this.props.history.push("/logout");
        //~ }
      //~ });
			axios.all([
				 axios.get('/user/getLoggedInUser'),
				 axios.get('/subscription/getActiveAddons'),
				 axios.get('/subscription/listingsubscription'),
				 axios.get('/user/userSubscription')
			   ])
			   .then(axios.spread((user, raddons,rsubscription,usresult) => {
				   if(user.data.code === 200){					 
					   this.setState({ 
							currentUser:user.data.result,
							subscriptions:rsubscription.data.result,
						    userSubscription: usresult.data.userSubacriptions[0],
							addons:raddons.data.result,
							totalInventoryAllowed:(user.data.result.totalInventory === null)?0:user.data.result.totalInventory,
							totalTradePermitted:(user.data.result.totalTrade === null)?0:user.data.result.totalTrade	
						})						
						localStorage.setItem("loggedInUser", user.data.result._id);
						localStorage.setItem("userId", user.data.result._id);
						localStorage.setItem("userEmail", user.data.result.email);
						localStorage.setItem("userName", user.data.result.userName);
						if (
								user.data.result.emailVerified === "1" &&
								user.data.result.subscriptionStatus === "1"
						) {
								localStorage.setItem("isLoggedIn", 1);
						} else {
								localStorage.setItem("isLoggedIn", 0);
						}
					}				 			 	
			}))			  
			.catch(error => console.log(error));
      
      
    } else {
      this.props.history.push("/logout");
    }
  }
  
  handleItemClick(index) {
    this.setState({
      activeItem: index,
    })
  }
 	inputChangedHandler = (event, inputIdentifier) => {
		//console.log("data-ptype",event.target.getAttribute('data-ptype'))
		//console.log("event",event.target.value)
		if(event.target.getAttribute('data-ptype') !==null){
			//console.log("this.state.totalTradePermitted",this.state.totalTradePermitted);
			this.setState({
				paymentAmount:event.target.value,
				planTypeId : event.target.getAttribute('data-ptypeid'),
				planType:event.target.getAttribute('data-ptype'),
				totalInventoryAllowed:(parseInt(this.state.totalInventoryAllowed)+parseInt(event.target.getAttribute('data-inventory'))),
				totalTradePermitted:(parseInt(this.state.totalTradePermitted)+parseInt(event.target.getAttribute('data-trade'))),	
			});			
		}
			const paymentForm = {
			  ...this.state.addPaymentForm
			};
			paymentForm[inputIdentifier] = event.target.value;    
			this.setState({ addPaymentForm: paymentForm });
		};	
	submit = () => {		
		if(this.state.planTypeId ==''){		
			console.log("planTypeId",this.state.planTypeId)	
				this.setState({showFormError: true,message: 'Please choose a plan'});				
				setTimeout(() => {this.setState({showFormError: false});}, 12000);
			return false;
		}		
		const data = this.state.addPaymentForm;
		data.userEmail = localStorage.getItem('userEmail');
		data.userId =  localStorage.getItem('userId');
		data.amount =  this.state.paymentAmount;
		data.planTypeId =  this.state.planTypeId;
		data.planType =  this.state.planType;
		data.totalInventory = this.state.totalInventoryAllowed;
		data.totalTrade = this.state.totalTradePermitted;		
		//console.log("submit",data); return;
		this.setState({isProcess:true})
        axios.post('/subscription/updateUserPlan', data).then(result => {        
         if(result.data.code === 200){
			  this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			  setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});
						 localStorage.removeItem('jwtToken'); 
						 window.location.href='/login';
			 }, 12000);		  
			}else{
			  this.setState({
				message: result.data.result.message,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
				isProcess:false
			  });
			}
		  })
		  .catch((error) => {
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: this.state.message });
			}
		  });    
  }
  
 _renderSuccessMessage() {
    return (   
      <div className={"alert alert-success mt-4"} role="alert">
      Congratulation!!! You have successfully subscribe the plan <Link to={'/login'}> Go to Login </Link> Or it will automaticaly redirect in 10 second.            
      </div>
    );
  
  }
  
 _renderErrorMessage() {
    return (
      <div align="center" className={"errorMessage alert alert-danger mt-4"} role="alert">
        {this.state.message}
      </div>
    );
  }
	  
  render() {
    return (
      <div className="myTreasure">
        <div className="container">
          <div className="breadcrumb">
            <ul>
              <li>
                <a href={"/dashboard"}>Home</a>
              </li>{" "}
              <li>Settings</li>
            </ul>
          </div>

          <div className="setting-container">
            <div className="left-container">
              <ul>
                <li>
                  <Link to={"/setting-profile"}>Profile Info</Link>
                </li>
                <li>
                  <Link to={"/setting-change-password"}>Change Password</Link>
                </li>
                <li>
                  <Link to={"/setting-subscription"} className="active">
                    Subscription Management
                  </Link>
                </li>
                <li>
                  <Link to={"/setting-email-notification"}>
                    Email Notifications
                  </Link>
                </li>
              </ul>
            </div>
            <div className="right-container">
              <div className="change-password">
                <div className="form-row login-row">
                  <h3>Subscription Management</h3>
                  <p className="brdr-btm">
                    Find the perfect plan for you - 100% satisfaction
                    guaranteed.
                  </p>
                </div>
                <div className="whiteboxBG">
                  <div className="leftColum ">
                    <p className="addOns">
                      <strong>Active Plan</strong>
                    </p>
                    <h5 className="large">{this.state.userSubscription &&
                          (this.state.userSubscription.subscriptionId
                            ? this.state.userSubscription.subscriptionId
                                .subscriptionName
                            : "Basic")}</h5>
                    <p className="gray">
                      ({this.state.userSubscription &&
                          (this.state.userSubscription.subscriptionId
                            ? this.state.userSubscription.subscriptionId
                                .totalTradePermitted
                            : "0")}   Trade, {this.state.userSubscription &&
                          (this.state.userSubscription.subscriptionId
                            ? this.state.userSubscription.subscriptionId
                                .totalInventoryAllowed
                            : "0")} Items Stored in Treasure Chest and Wishlist)
                    </p>
                    <p className="yellow">+ {this.state.userSubscription &&
                          (this.state.userSubscription.subscriptionId
                            ? this.state.userSubscription.subscriptionId
                                .totalTradePermitted
                            : "0")} Trades</p>
                    <p className="gray">12 left</p>
                    <div>&nbsp;</div>
                  </div>
                  <div className="leftColum right">
                    <p className="addOns gray fr">Expire on:{moment(
                            this.state.userSubscription.subscriptionId
                              ? this.state.userSubscription.subscriptionId
                                  .createdAt
                              : Date()
                          )
                            .add(1, "years")
                            .format("LL")}</p>
                    <div className="cl" />
                    <DitchPopup />

                    <p className="green fr">Free</p>
                  </div>
                  <div className="cl"> </div>
                </div>
                <div className="whiteboxBG">
                  <p className="addOns">
                    <strong>Add-ons</strong> (How much trades you need)
                  </p>
                  {this.state.showFormError ? this._renderErrorMessage() : null}	
				  {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                  <ul className="trades-list">
					{this.state.addons && this.state.addons.map((addon,index) => {						
						return(
							<Auxios key={index}>
							 <li  key={index} className={this.state.activeItem === index ? 'active' : ''}>
							  <div className="radioBtn" >
								<input id={"gold1"+index} onClick={this.handleItemClick.bind(this, index)} type="radio" name="plan" onChange={(e) => this.inputChangedHandler(e, 'radio')} data-ptype={'addon'} data-ptypeid={addon._id} value={addon.price} data-trade={addon.totalTradePermitted} data-inventory={addon.totalInventoryAllowed}/>
								<label htmlFor={"gold1"+index}></label>
							 </div>	
							  <span className="bold">${addon.price} USD</span>
							  <span className="text">
							  {addon.totalTradePermitted} Trade, {addon.totalInventoryAllowed} Stored in Treasure Chest and Wishlist
							  </span>{" "}
							  <span className="validity">Vailidity: Lifetime</span>
							</li>
							</Auxios>		
						)
					})
					}
                  </ul>
                  <div className="form-row">
                    <button type={"submit"} className={"submitBtn fl"}>
                      Buy Now
                    </button>
                    <div className="cl"> </div>
                  </div>
                </div>
                <div className="cl"> </div>
              </div>
            </div>
            <div className="cl" />
          </div>
        </div>
      </div>
    );
  }
}
export default settingSubscription;

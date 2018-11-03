import React, { Component } from 'react';
import Style from './dashboard.css';
import PopularItems from './popularItems'
import NewlyProducts from './newlyProducts'
import TradeMatch from './tradeMatch'
import Style1 from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import Switched from './switched'
import Completed from './completed'
import Ditch from './ditch'
import SubscriptionAddonsPupup from '../subscriptionAddonsPupup'
import ProductShippingCostPopup from '../productShippingCostPopup'

import ReturnInfo from '../payShopPopup'
import ReturnInfo1 from '../payShopPopup1'
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import UpgradePlan from '../upgradePlanPopup'
import { Link } from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
var moment = require('moment');
class Dashboard extends Component {	
	constructor(props){
    super(props);
   	localStorage.setItem('isLoggedIn',1);
    this.state = {
		currentUser:{
			 email:'',
			 firstName:'',
			 lastName:'',
			 middleName:'',
			 profilePic:'',
			 userName:''
			},
			userSubscription:{},
			userSubscriptionAddons : {}
	}
    if(localStorage.getItem('jwtToken') === null){
       window.location.href="#/login";
    }
  }
  
  componentWillMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		 if(localStorage.getItem('jwtToken') !== null){		 		
			//~ axios.get('/user/getLoggedInUser').then(result => {				
				//~ this.setState({ 
					//~ currentUser:result.data.result,
					//~ notification_type:result.data.notification_type,
					//~ notifications:result.data.notifications,
					//~ totalNotifications:result.data.totalNotifications							
				//~ })			
			//~ })			
			//~ // function to get user subscription details : 			
			//~ axios.get('/user/userSubscription').then(sresult => {	
				//~ console.log("sresult",sresult.data.userSubacriptions[0])			
					//~ this.setState({ 					
						//~ userSubscription:sresult.data.userSubacriptions[0]		
					//~ })
			//~ })
			  axios.all([
				 axios.get('/user/getLoggedInUser'),
				 axios.get('/user/userSubscription'),
				 axios.get('/user/userSubscriptionAddon')
			   ])
			   .then(axios.spread((user, sresult,saresult) => {
				   if(user.data.code === 200){					 
					   this.setState({ 
							currentUser:user.data.result,
							notification_type:user.data.notification_type,
							notifications:user.data.notifications,
							totalNotifications:user.data.totalNotifications,
							userSubscription:sresult.data.userSubacriptions[0],
							userSubscriptionAddons:saresult.data.userSubacriptionAddons[0]						
						})	
				   }				 			 	
			   }))
			   //.then(response => this.setState({ vehicles: response.data }))
			   .catch(error => console.log(error));
			
		}	
			
  }
    
   componentDidMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		 if(localStorage.getItem('jwtToken') !== null){
			axios.get('/user/userTradeStates').then(result => {				
				//console.log("userTradeStates",result)
				this.setState({ 					
					totalInvemtory:result.data.totalInvemtory,
					totalInventoryAllowed:result.data.totalInventoryAllowed,
					totalTradePermitted:result.data.totalTradePermitted,
					totalTrade:result.data.totalTrade,
					inventoryLeft:result.data.inventoryLeft,
					tradeLeft:result.data.tradeLeft			
				})			
			})	
		}		
  }
  
  	
Capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
} 
    render() {
		console.log(this.state)
        return (
                <div className="dashboard">                
                    <div className="container">
                     <If condition={this.state.totalInvemtory === 0} >
						<Then>
							<div className="msgSuccess">                        
                       			<a href="#" className="close">x</a>You're almost there, upload your first item to get trading							
							</div>
                        </Then>
					</If>
                        <div className="heading-row">
                            <Link to={'/donate-product'} className="more-items">Donate Now</Link>
                            <h1>Welcome, {this.Capitalize(this.state.currentUser.firstName)}{' '}{this.Capitalize(this.state.currentUser.lastName)}.</h1>
                            <p className="subheading">There is a list of some latest and tranding itmes on pitch and switch </p>
                            <div className="cl"></div>
                        </div>
                        <div className="dashboardLeft">
                            <div className="tab-outer-container">
                                <Tabs>
                                    <TabList>
                                        <Tab>Pitch Requests</Tab>
                                        <Tab>Switched</Tab>
                                        <Tab>Ditched</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div className="message-filter">
                                            <ul>
                                                <li><a href="#" className='active'>All</a></li>
                                                <li className="sent"><a href="#">Sent</a></li>
                                                <li className="received"><a href="#">Recieved</a></li>
                                            </ul>
                                        </div>                            
                                        <h4>Pitch Requests</h4>
                                        <PitchRequests />
                                       {/* <ReturnInfo1 /> */}
                                        {/*<ProductShippingCostPopup /> */}
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="message-filter">
                                            <ul>
                                                <li><a href="#" className='active'>All</a></li>
                                                <li className="sent"><a href="#">Sent</a></li>
                                                <li className="received"><a href="#">Recieved</a></li>
                                            </ul>
                                        </div>     
                                        <h4>Switched and Completed</h4>
                                        <div className="expanded-tabs">
                                            <Tabs>
                
                                                <TabList>
                                                    <Tab>Switched</Tab>
                                                    <Tab>Completed</Tab>
                
                                                </TabList>
                                                <TabPanel>
                                                    <Switched />
                                                   {/* <ReturnInfo/> */}
                                                    {/*<SubscriptionAddonsPupup /> */}
                                                </TabPanel>
                                                <TabPanel>
                                                    <Completed />
                                                    <a className="more-items" href="#">More result</a>
                                                </TabPanel>
                
                                            </Tabs>
                                        </div>
                
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="message-filter">
                                            <ul>
                                                <li><a href="#" className='active'>All</a></li>
                                                <li className="sent"><a href="#">Sent</a></li>
                                                <li className="received"><a href="#">Recieved</a></li>
                                            </ul>
                                        </div>     
                                        <h4>Ditched</h4>
                                        <Ditch />
                                        <a className="more-items" href="#">More result</a>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                        <div className="dashboardRight">
                           {/* <div className="tradeText topMargin">
                                <span className="largeTxt">{this.state.tradeLeft}</span>
                                Trade left
                            </div>
                            <div className="tradeText">
                                <span className="largeTxt">{this.state.inventoryLeft}</span>
                               Inventory left
                            </div> */}
                            <div className="tradeText topMargin">
                                <h4>Current Plan</h4>
                                <Scrollbars className="Scrollsdiv" style={{height:402}} >
                                    <div className="brdrBox">
                                        <div className="row">
                                            <div className="left-div bold">
                                                {(this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.subscriptionName:'Basic'} 
                                            </div>
                                            <div className="rightDiv bold green">
                                                {(this.state.userSubscription.subscriptionId && this.state.userSubscription.subscriptionId.price > 0)?this.state.userSubscription.subscriptionId.price:'Free'} 
                                            </div>
                                            <div className="cl"></div>
                                        </div>
                                        <div className="row">
                                            <div className="left-div ">
                                                Trade 
                                            </div>
                                            <div className="rightDiv">
                                               {(this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.totalTradePermitted:'0'} 
                                            </div>
                                            <div className="cl"></div>
                                        </div>
                                        <div className="row">
                                            <div className="left-div">
                                                Inventory
                                            </div>
                                            <div className="rightDiv pink">
                                                {(this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.totalInventoryAllowed:'0'}
                                            </div>
                                            <div className="cl"></div>
                                        </div>
                                        <div className="topbrdr-row">
                                            <p>Start date: <span>{moment((this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.createdAt:Date()).format('LL')}</span></p>
                                            <p>End date: <span>{moment((this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.createdAt:Date()).add(1, 'years').format('LL')}</span></p>
                                             <UpgradePlan />
                                             <div className="cl"></div>
                                        </div>
                                    </div>
                                    <If condition = {this.state.userSubscriptionAddons}>
										<Then>
											<div className="brdrBox">
												<div className="row">
													<div className="left-div bold">
														Add-on
													</div>
													<div className="rightDiv bold green">
														${(this.state.userSubscriptionAddons && this.state.userSubscriptionAddons.addonId)?this.state.userSubscription.addonId.price:'0'}
													</div>
													<div className="cl"></div>
												</div>
												<div className="row">
													<div className="left-div ">
														Trade 
													</div>
													<div className="rightDiv">
														{(this.state.userSubscriptionAddons && this.state.userSubscriptionAddons.addonId)?this.state.userSubscriptionAddons.addonId.totalTradePermitted:'0'} 
													</div>
													<div className="cl"></div>
												</div>
												<div className="row">
													<div className="left-div">
														Inventory
													</div>
													<div className="rightDiv">
														 {(this.state.userSubscriptionAddons && this.state.userSubscriptionAddons.addonId)?this.state.userSubscriptionAddons.addonId.totalInventoryAllowed:'0'}
													</div>
													<div className="cl"></div>
												</div>
												<div className="topbrdr-row no-padding">
													<p>Vailidity:  <span>Lifetime</span></p>
												</div>
											</div>
										</Then>
                                    </If>
                                </Scrollbars> 
                            </div>
                        </div>
                        <div className="cl"></div>
                    </div>
                
                
                    <TradeMatch />
                </div>
                );
    }
}
export default Dashboard;

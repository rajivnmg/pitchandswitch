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
import ReturnInfo from '../payShopPopup'
import ReturnInfo1 from '../payShopPopup1'
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
class Dashboard extends Component {
	
	constructor(props){
    super(props);
    this.state = {
			currentUser:{
				 email:'',
				 firstName:'',
				 lastName:'',
				 middleName:'',
				 profilePic:'',
				 userName:''
				}			
				
					
	}
    
  // console.log('TOken', localStorage.getItem('jwtToken'));
    if(localStorage.getItem('jwtToken') === null){
       window.location.href="#/login";
    }
  }
  
  componentWillMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		 if(localStorage.getItem('jwtToken') !== null){
			axios.get('/user/getLoggedInUser').then(result => {
				console.log("result",result)
				this.setState({ 
					currentUser:result.data.result,
					notification_type:result.data.notification_type,
					notifications:result.data.notifications,
					totalNotifications:result.data.totalNotifications,
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
  
  
   componentDidMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		 if(localStorage.getItem('jwtToken') !== null){
			axios.get('/user/userTradeStates').then(result => {
				console.log("result",result)
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
                     <If condition={this.state.totalInvemtory && this.state.totalInvemtory == 0} >
						<Then>
							<div className="msgSuccess">                        
                       			<a href="#" className="close">x</a>You're almost there, upload your first item to get trading							
							</div>
                        </Then>
					</If>
                        <div className="heading-row">.
                            <a href="#" className="more-items">Donate Now</a>
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
                                        <ReturnInfo1 />
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
                                                    <ReturnInfo />
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
                            <div className="tradeText topMargin">
                                <span className="largeTxt">{this.state.tradeLeft}</span>
                                Trade left
                            </div>
                            <div className="tradeText">
                                <span className="largeTxt">{this.state.inventoryLeft}</span>
                               Inventory left
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

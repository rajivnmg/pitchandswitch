import React, { Component } from 'react';
import Style from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import SendRequests from './sendRequests'
import ReceivedRequests from './receivedRequests'
import Switched from './switched'
import SentSwitched from './sentSwitched'
import SendCompleted from './sendCompleted'
import ReceivedSwitched from './receivedSwitched'
import ReceivedCompleted from './receivedCompleted'
import Completed from './completed'
import Ditch from './ditch'
import SentDitch from './sentDitch'
import ReceivedDitch from './receivedDitch'
import axios from  'axios'


class MyTrades extends Component {	
	constructor(props){
		super(props)
		this.state = {trades:[]}
	}	
	 componentDidMount() {
		axios.get('/trade/offerTrades').then(result => {
			this.setState({inventory:result.data.result})		
		})
	}
	
    render() {
        return (
		<div className="my-trades-container">
		<div className="container">
		<div className="breadcrumb">
		<ul>
		<li><a href="/">Home</a></li>
		<li>My Trades</li>
		</ul>
		</div>
		<div className="cl"></div>
		<div className="my-trades">
		<h3>My Trades</h3>
		<div className="tab-outer-container">
		<Tabs forceRenderTabPanel>
		<TabList>
			<Tab>Pitch Requests</Tab>
			<Tab>Switched/Completed</Tab>
			<Tab>Ditched</Tab>
		</TabList>
		<TabPanel>
			 <Tabs forceRenderTabPanel className="tab_details">
			     <div className="message-filter">
			        <TabList>
						<Tab className='active tradeall'>ALL</Tab>
						<Tab className="sent tradeSent">Sent</Tab>
						<Tab className="received tabreceived">Received</Tab>
					</TabList>
					</div>
					<TabPanel>
						 <PitchRequests />
					</TabPanel>
					<TabPanel>
						 <SendRequests />
					</TabPanel>
					<TabPanel>
						<ReceivedRequests />
					</TabPanel>				
			 </Tabs>			
		</TabPanel>
		
		
		
		
		 <TabPanel>
			 <Tabs forceRenderTabPanel className="tab_details">
			     <div className="message-filter">
			        <TabList>
						<Tab className='active tradeall'>ALL</Tab>
						<Tab className="sent tradeSent">Sent</Tab>
						<Tab className="received tabreceived">Received</Tab>
					</TabList>
					</div>
					<h4>Switched and Completed</h4>
					<TabPanel>
						<Tabs>
							<TabList>
								<Tab>Switched</Tab>
								<Tab>Completed</Tab>
							</TabList>
							<TabPanel>
								<Switched />
							</TabPanel>
							<TabPanel>
								<Completed />
							</TabPanel>
						</Tabs>
					</TabPanel>
					<TabPanel>
						<Tabs>
							<TabList>
								<Tab>Switched</Tab>
								<Tab>Completed</Tab>
							</TabList>
							<TabPanel>
								<SentSwitched />
							</TabPanel>
							<TabPanel>
								<SendCompleted />
							</TabPanel>
						</Tabs>
					</TabPanel>
					<TabPanel>
						<Tabs>
							<TabList>
								<Tab>Switched</Tab>
								<Tab>Completed</Tab>
							</TabList>
							<TabPanel>
								<ReceivedSwitched />
							</TabPanel>
							<TabPanel>
								<ReceivedCompleted />
							</TabPanel>
						</Tabs>
					</TabPanel>				
			 </Tabs>			
		</TabPanel>
		
															
		<TabPanel>
		    <Tabs forceRenderTabPanel className="tab_details">
		        <div className="message-filter">
			         <TabList>
						<Tab className='active tradeall'>ALL</Tab>
						<Tab className="sent tradeSent">Sent</Tab>
					    <Tab className="received tabreceived">Received</Tab>
				     </TabList>
				</div> 
				<h4>Ditched</h4> 
				<TabPanel>
					 <Ditch />	
				</TabPanel>
				<TabPanel>
					<SentDitch />
				</TabPanel>
				<TabPanel>
					<ReceivedDitch />
				</TabPanel>
			</Tabs>										
		   </TabPanel>
		</Tabs>
		</div>
		</div>
		<div className="cl"> </div>
		</div>
		</div>
        );
    }
}

export default MyTrades;

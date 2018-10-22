import React, { Component } from 'react';
import Style from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import SendRequests from './SendRequests'
import ReceivedRequests from './ReceivedRequests'
import Switched from './switched'
import Completed from './completed'
import Ditch from './ditch'
import axios from  'axios'
class MyTrades extends Component {	
	constructor(props){
		super(props)
		this.state = {trades:[]}
	}	
	//this function call jusrt after render the page, all the initial data can be load here
	 componentDidMount() {
		axios.get('/trade/offerTrades').then(result => {
			this.setState({inventory:result.data.result})		
		})
	}
	
    render() {
        return (
		<div className="my-trades-container">
			<div  className="container">
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
								 <Tabs forceRenderTabPanel>
								  <TabList>
								     <div className="message-filter">
										<a href="#"><Tab className='active tradeall'>ALL</Tab></a>
										<Tab className="sent tradeSent">Sent</Tab>
										<Tab className="received tabreceived">Received</Tab>
								    </div> 
								  </TabList>
								<h4>Pitch Requests</h4>
								   <TabPanel>
									   <PitchRequests />
								  </TabPanel>
								  <TabPanel>        
									  <SendRequests />
							 	   </TabPanel>
								   <TabPanel>        
									  <ReceivedRequests />
								   </TabPanel>
								   <a className="more-items" href="#">More result</a>
								</Tabs>
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
									<Tabs forceRenderTabPanel>
										<TabList>
											<Tab>Switched</Tab>
											<Tab>Completed</Tab>                
										</TabList>
										<TabPanel>
											<Switched />
											<a className="more-items" href="#">More result</a>
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

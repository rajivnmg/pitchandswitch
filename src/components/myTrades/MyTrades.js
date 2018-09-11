import React, { Component } from 'react';
import Style from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import Switched from './switched'
import Completed from './completed'
import Ditch from './ditch'

class MyTrades extends Component {
    render() {
        return (
                <div className="my-trades-container">
                    <div  className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li><li>My Trades</li>
                            </ul>
                        </div>
                        <div className="cl"></div>
                        <div className="my-trades">
                            <h3>My Trades</h3>
                            <div className="tab-outer-container">
                                <Tabs>
                                    <TabList>
                                        <Tab>Pitch Requests</Tab>
                                        <Tab>Switched/Completed</Tab>
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
                                        <a className="more-items" href="#">More result</a>
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
                                        <a className="more-items" href="#">More result</a>
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

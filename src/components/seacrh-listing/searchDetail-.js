import React, { Component } from 'react';
import Style from '../myTrades/myTrades.css';
import Style1 from '../main2.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import PitchRequests from './pitchRequests'
import detailPic from '../../images/detail-pic.png'
import colorOrange from '../../images/color-orange.png'
import createHistory from "history/createBrowserHistory" 


const history = createHistory();


class MyTrades extends React.Component {
    render() {
        return (
                <div className="my-trades-container">
                    <div  className="container">
                      
                        <div className="detail-div">
                            <div className="pic">
                                <img src={detailPic} />
                            </div>
                            <div className="details">
                                <div className="linkRow">
                                    <a href="#" className="delete-product">Delete Product</a>
                                    <a href="#" className="edit-product">Edit Product</a>
                                    <a href="#" className="back-page" onClick={history.goBack}>Back</a>
                                    
                                    <div className="cl"></div>
                                </div>            
                                <p className="tagsrow">Sports &amp; Fitness / Cycling / Cycles / Hero Cycles</p>
                                <h1>God of War 3 ~ Download Full Version PC third-person action-adventure video game</h1>
                                <div className="productId">Product ID: <strong>PS2152436</strong> 
                                <span className="postedDate">Posted date:  20 May 2018 </span>
                </div>
                                
                                <div className="productDetails">
                                    <h5>Product Details</h5>
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>Size:</td><td>16.5 GB</td>
                                            </tr>
                                            <tr>
                                            <td>Color:</td><td> <img src={colorOrange} /></td>
                                            </tr>
                                            <tr>
                                                <td>Brand:</td><td>Sony</td>
                                            </tr>
                                            <tr>
                                                <td>Condition:</td><td>Excellent</td>
                                            </tr>
                                           <tr>
                                                <td>Age:</td><td>6 Month</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                
                            </div>
                            <div className="cl"></div>
                        </div>
                        <div className="cl"></div>
                        <div className="my-trades white-background">
                            <h3>My Trades</h3>
                            
                            <a className="more-items" href="#">More result</a>
                        </div>
                        <div className="cl"> </div>
                    </div>
                </div>
                );
    }
}

export default MyTrades;
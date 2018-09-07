import React, { Component } from 'react';
import Style from './subscription.css';
import subscribeImg1 from '../../images/subscription-pic1.png';
import subscribeImg2 from '../../images/subscription-pic2.png';
import GetStarted from '../subscription-basic/subscription-basic'


class Subscription extends Component {

    render() {
        return (
                <div className="subscription-container">
                           <div className="container">
                        <h3>Choose a plan that works for you    </h3>
                        <p className="subHeading">Simple, Affordable Pricing.</p>
                        <div className="colum-basic">
                            <div className="pic-row">
                                <img src={subscribeImg1} />
                            </div>
                            <h4>Basic</h4>
                            <div className="row-div">
                               <strong> 1</strong> Trade
                            </div>
                            <div className="row-div">
                                <strong>5 Items</strong> Storage 
                            </div>
                            <div className="row-div">
                                <strong>5 Items</strong> Wishlist
                            </div>
                            <h4 className="price">Free</h4>
                             <GetStarted />
                            
                        </div>
                        <div className="colum-basic gold">
                            <div className="pic-row">
                                <img src={subscribeImg2} />
                            </div>
                            <h4>Gold</h4>
                            <div className="row-div">
                            <strong>Unlimited </strong> Trade
                            </div>
                            <div className="row-div">
                                <strong>Unlimited </strong> Storage 
                            </div>
                            <div className="row-div">
                                <strong>Unlimited </strong> Wishlist
                            </div>
                            <h4 className="price">$25<sub>/y</sub></h4>
                             <GetStarted />
                        </div>
                        <div className="cl"></div>
                    </div>
                </div>
                );
    }
}

export default Subscription;

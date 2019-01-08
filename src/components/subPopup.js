import React, { Component }
from 'react';
import Warper from "./common/Warper";
import Popup from "reactjs-popup";
import Style from './subscription/subscription.css';
import subscribeImg1 from './../images/subscription-pic1.png';
import subscribeImg2 from './../images/subscription-pic2.png';
import GetStarted from './subscription/subscription-basic'
const contentStyle = {
    maxWidth: "700px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ <a className = 'upgrade-btn fr' > Upgrade now </a>}
modal
        contentStyle = {
            contentStyle}
    lockScroll 

    >
    {
            close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header">Upgrade Now
                                <div className="cl"></div>
                            </div>
                            <div className="content">
                                 <div className="subscription-container">
                           <div className="container">
                      
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
                             <a className= 'getStarted-btn gray-btn'> Get Started</a>
                            
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
                              <a className= 'getStarted-btn '> Upgrade now</a>
                        </div>
                        <div className="cl"></div>
                    </div>
                </div>
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);

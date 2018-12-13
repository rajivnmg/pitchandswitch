import React, { Component }
from 'react';
import Warper from "./common/Warper";
import Popup from "reactjs-popup";

const contentStyle = {
    maxWidth: "520px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ < a href='javascript:void(0)' className = 'more-items' > Shipping Cost </a>}
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
                            <div className="header">Your free trial has been expired
                                <div className="cl"></div>
                                <p className="sub-heading">Please upgrade your plan to make this trade</p>
                            </div>
                            <div className="content">
                                <div className="return-request-form">
                           
            <div className="yellow-brdr-box-div ">
            
            <div className="radioBtn"><input id="gold" type="radio" name="radio" checked="checked" value="" /><label htmlFor="gold"></label></div>
            <div className="right-div">
            <p>Gold Package
             <span className="price">$25 USD/year</span></p>   
             </div>
             <div className="cl"></div>
             <div className="radioBtn"><input id="gold1" type="radio"  value="" name="radio" /><label htmlFor="gold1"></label></div> 
             <div className="right-div">
             <p className="addOns"><strong>Add-ons</strong> (How much trades you need)</p>  
             <ul className="trades-list">
             <li><span className="bold">$1</span> 5 Trade, 8 Items Storage, 8 Items Wishlist</li>
             <li className="active"><span className="bold">$3</span> 20 Trade, 30 Items Storage, 30 Items Wishlist</li>
             <li><span className="bold">$5</span> 50 Trade, 75 Items Storage, 75 Items Wishlist</li>
             <li><span className="bold">$10</span> 110 Trade, 150 Items Storage, 150 Items Wishlist</li>
            </ul>
            </div> 
            <div className="cl"></div>
            </div>
                                    <div className="form-row">
                                        <span className="astrik">*</span>
                                        <label className="label">Name</label>
                                         <input type="text" placeholder="Card holder name" />
                                    </div>
                                    <div className="form-row">
                                        <span className="astrik">*</span>
                                        <label className="label">Card number</label>
                                        <input type="text" />
                                    </div>
                                     <div className="form-row">
                                    <div className="colum left">
                                        <span className="astrik">*</span>
                                        <label className="label">Expiry date</label>
                                        <input type="text" placeholder="7/21" />
                                        </div>
                                        <div className="colum right">
                                        <span className="astrik">*</span>
                                        <label className="label">Security code</label>
                                        <input type="text" placeholder="CVV" />
                                        </div>
                                        <div className="cl"></div>
                                        </div>
                                    <div className="form-row">
                                        <input className="" value="Pay $3.00" type="submit" />
                                    </div>
                                    <div className="form-row no-padding">
                                    <p className="secure-img"> Secure payments</p>
                                    <p className="secure-btm-text">This payments use a secure 128-bit SSL encryption</p>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);

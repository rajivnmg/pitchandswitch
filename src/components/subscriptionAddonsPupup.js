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
    trigger={ < a href='javascript:void(0)' className = 'more-items' > Addons </a>}
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
                            <div className="header">Pay your shipping cost
                                <div className="cl"></div>
                                <p className="sub-heading">Pay you shipping cost to proceed you trade</p>
                            </div>
                            <div className="content">
                                <div className="return-request-form">
                                <div className="brdr-box-div">
                                <p>God of War 3 ~ Download Full Version PC third-perso...</p>
                                <span className="catLink">Switched with</span>
                                <p>Shopkins Shoppies - Bubbleisha</p>                    
            </div>
             <div className="yellow-brdr-box-div "><p>Shipping cost
             <span className="price">$66</span></p>                    
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
                                        <input className="" value="Pay $66.00" type="submit" />
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

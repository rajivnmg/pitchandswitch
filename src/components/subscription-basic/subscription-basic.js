import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
//

const contentStyle = {
    maxWidth: "560px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={<a className= 'getStarted-btn'>Get Started</a>}
    modal
    contentStyle = {contentStyle}
    lockScroll 
          
    >
    {
        close => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header"> Enter payment details </div>
        <div className="content">
            <div className="form-row">

                <label className="label"> You have selected:</label>
                <div className="gold-div">
                    <strong>Gold</strong> $25
                </div>
            </div>
            <div className="form-row">  
                <span className="astrik">*</span>
                <label className="label"> Name</label>
                <input type="text" placeholder="Card holder name" className="form-control textBox" />
            </div>
            <div className="form-row">  
                <span className="astrik">*</span>
                <label className="label">Card Number</label>
                <input id="email" className="form-control textBox" type="email" placeholder=" " />
            </div>

            <div className="form-row">
                <div className="colum">
                    <span className="astrik">*</span>
                    <label className="label">Expiry date</label>
                    <input className="form-control textBox" type="text" placeholder="7/12" />
                </div>
                <div className="colum right">
                    <span className="astrik">*</span>
                    <label className="label">Security code</label>
                    <input className="form-control textBox" type="text" placeholder="CVV" />
                </div>
                <div className="cl"></div>
               </div>
               <div className="form-row">
               <input type="submit" className="" value="Pay $25.00" />
            </div>
            <div className="form-row">
            <p className="secureicon">Secure payments</p>
            </div>
            <div className="form-row no-padding">
            <p className="payInst">This payments use a secure 128-bit SSL encryption</p>
            </div>

        </div>

    </div>
    )}
</Popup>
);

export default Warper(CustomModal);

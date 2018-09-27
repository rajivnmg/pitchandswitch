import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import starRating from '../../images/star-rating.png'




const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ < a className = 'TradeInfobtn' > Post Review < /a>}
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
                            <div className="header">Post review
                                <div className="cl"></div>
                            </div>
                            <div className="content">
                                <div className="return-request-form">
                                   
                                    <div className="form-row"> 
                                        <label className="label">Write review</label>
                                        <textarea className="form-control textarea" placeholder=" "></textarea>
                                    </div>
                                     
                                    <div className="form-row">
                                        <img src={starRating} />
                                    </div>
                                    <div className="form-row">
                                        <input className="" value="Submit" type="submit" />
                                    </div>
                                </div> 
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);

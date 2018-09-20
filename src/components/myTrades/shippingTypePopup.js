import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import truckImg from '../../images/truck-img.png';
import twoType from '../../images/two-type.png';


const contentStyle = {
    maxWidth: "520px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ <a className = 'TradeInfobtn' > View Pitch  </a>}
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
                            <div className="header">Choose shipping type 
                                <div className="cl"></div>
                            </div>
                            <div className="content">
                                <div className="choose-shippinh-type">
                                <ul>
                                <li class="active"><img src={truckImg} alt="" /></li>
                                    <li><img src={twoType} alt="" /></li>
                                </ul>
                                </div> 
                            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);

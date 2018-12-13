import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
import successPic from '../../images/successful_img.png';
const contentStyle = {
    maxWidth: "460px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ <a href="#" className = 'ditch add-wishlist' > Add to Wishlist </a>}
modal
        contentStyle = {
            contentStyle}
    lockScroll 

    >
    {
            close => (
                        <div className="modal pitchSuccessful">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header centerheading"><span>Pitch</span> Successful<div className="cl"></div></div>
                            <p className="textSuccessful"><span classNamne="gray">You have successfully pitched on</span>
God of War 3 ~ Download Full Version PC third-person action 
adventure video game</p>
<div class="successIcon">
<img src={successPic} alt="" />
        </div>
        <div className="btm-btns no-brdr">
        <a href="#" className="more-items no-margin">more-items</a>
            </div>
                        </div>
                        )
}
</Popup>
            );

            export default Warper(CustomModal);

import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg';
import offerProduct1 from '../../images/offer-product-img1.jpg';
import offerProduct3 from '../../images/offer-product-img3.jpg';
import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';

import { Scrollbars } from 'react-custom-scrollbars';

const contentStyle = {
    maxWidth: "900px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={<a className= 'ditch'> Last Pitch </a>}
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
        <div className="header">Choose products to <span className="yellow">pitch again</span> on 
        <div className="select-box top-right">
                                            <select required="" name="category">
                                                <option>Select category</option>                                                
                                            </select>
                                        </div>
				<div className="cl"></div>
			</div>

			<div className="content">
				<div className="received-product">
					<div className="received-product-box">
						<div className="received-product-image-box">
							<img src={rcvProduct} alt="recieved-product image" />
						</div>
						<div className="received-product-content-box">
							<span>Product ID: <strong>PS2152436</strong></span>
							<h4>God of War 3 ~ Download Full Version PC third-person action-adventure video game</h4>
							<a className="catLink" href="/">Baby Products</a>
                                                        <div className="ratingRow">
                                                        <div className="pic"><img src={userPic} alt="" /></div>
                                                        <p>Mustafa ezz</p>
                                                        <div className="rated">4</div>
    <div className="cl"></div>
    </div>
						</div>
					</div>
					<div className="cl"></div>
					<div className="switch-product-section choose-product-div border-top">
                                         <Scrollbars className="Scrollsdiv" style={{height: 585 }}>
						<div className="switch-product-box">
                                                
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
                                                                <div className="switch-option-mask"> <div className="check-box"><input id="pitch1" type="checkbox" /><label for="pitch1">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box rejected">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
								<div className="switch-option-mask">
                                                                <img src={rejected} alt="" />
									 
								</div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch2" type="checkbox" /><label for="pitch2">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box rejected">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								<div className="switch-option-mask">
                                                                <img src={rejected} alt="" />
									 
								</div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch3" type="checkbox" /><label for="pitch3">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch4" type="checkbox" /><label for="pitch4">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch5" type="checkbox" /><label for="pitch5">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch6" type="checkbox" /><label for="pitch6">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                </Scrollbars>
                                                <div className="btm-btns">
                                                <a className="more-items" href="#">Pitch Now</a>
                                                <a className="ditch cancel-ditch"> Cancel Pitch </a>
                
                </div>
					</div>
				</div>
			</div>

    </div>
    )}
</Popup>
);

export default Warper(CustomModal);

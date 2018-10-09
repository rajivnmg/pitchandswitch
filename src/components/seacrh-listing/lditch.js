import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg';
import offerProduct1 from '../../images/offer-product-img1.jpg';
import offerProduct3 from '../../images/offer-product-img3.jpg';
import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "900px",
    width: "90%"
};


class viewPitchPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			offerTradeProducts:[]
		}		
		console.log("viewPitchPopup props", this.props)
	}
	
	componentWillMount(){
		this.setState({offerTradeId:this.props.offerTrade._id})
	}
	
	componentDidMount(){
		axios.get('/trade/offerTradeProduct/'+this.props.offerTrade._id).then(result => {
			if(result.data.code === 200){
			  this.setState({offerTradeProducts:result.data.result})				
		   }
		})
		axios.get('/trade/getAllProduct/').then(result => {
			if(result.data.code === 200){
			  this.setState({getAllProduct:result.data.result})				
		   }
		})
	}

render() {
    let img = this.props.offerTrade.userId?this.props.offerTrade.userId.profilePic:"";
    let productImg = 
    this.props.offerTrade.productImages?this.props.offerTrade.productImages[0]:"";
   return (
   <Popup
    trigger={<a href='#' className= 'ditch'>Pitch Now</a>}
    modal
    contentStyle = {contentStyle}  lockScroll >
    { close => (
         <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header">Choose products to <span className="yellow">Pitch again</span> on 
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
							<img 
							src={constant.BASE_IMAGE_URL+'Products/'+productImg} alt="recieved-product image" />
						</div>
						<div className="received-product-content-box">
							<span>Product ID: <strong>{this.props.offerTrade._id}</strong></span>
							<h4>{this.props.offerTrade.productName}</h4>
							<a className="catLink" href="/">{this.props.offerTrade.description}</a>
								<div className="ratingRow">
								<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" /></div>
								<p>{this.props.offerTrade.description}</p>
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
                                <div className="switch-option-mask"> <div className="check-box"><input id="pitch1" type="checkbox" /><label htmlFor="pitch1">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box selected">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
                                <div className="switch-option-mask"> <div className="check-box"><input id="pitch11" type="checkbox" defaultChecked /><label htmlFor="pitch11">&nbsp;</label></div>
                             </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						<div className="switch-product-box selected">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch2" type="checkbox" defaultChecked /><label htmlFor="pitch2">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                        <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								<div className="switch-option-mask">
                                <div className="check-box"><input id="pitch12" type="checkbox" /><label htmlFor="pitch12">&nbsp;</label></div>
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
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch3" type="checkbox" /><label htmlFor="pitch3">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch4" type="checkbox" /><label htmlFor="pitch4">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch5" type="checkbox" /><label htmlFor="pitch5">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                        <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch6" type="checkbox" /><label htmlFor="pitch6">&nbsp;</label></div> </div>
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
)}
}

export default viewPitchPopup;
//export default Warper(CustomModal);

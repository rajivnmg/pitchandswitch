import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg'
import offerProduct1 from '../../images/offer-product-img1.jpg'
import offerProduct3 from '../../images/offer-product-img3.jpg'
import userPic from '../../images/user-pic.png'
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};

class viewPitchPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			offerTradeProducts:[]
		}		
		console.log(" viewPitchPopup props", this.props)
	}
	
	componentWillMount(){
		console.log('viewPitchPopup componentWillMount',this.state.offerTrade)
			this.setState({offerTradeId:this.state.offerTrade._id})
	}
	
	componentDidMount(){
		axios.get('/trade/offerTradeProduct/'+this.state.offerTrade._id).then(result => {
				if(result.data.code === 200){
					this.setState({offerTradeProducts:result.data.result})				
				}
			})
	}
	
	
render() {
   return (
		<Popup trigger={<a className= 'view-pitch'> View Pitch </a>} modal contentStyle = {contentStyle} lockScroll > 

	{ close => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header">Pitch sent on <input className="ditch-btn" value="Cancel Pitch" type="submit" />
				<div className="cl"></div>
			</div>
			<div className="content">
				<div className="received-product">
					<div className="received-product-box">
						<div className="received-product-image-box">
							<img src={rcvProduct} alt="recieved-product image" />
						</div>
						<div className="received-product-content-box">
							<span>Product ID: <strong>{this.state.offerTrade.SwitchUserProductId._id}</strong></span>
							<h4>Product Name: {this.state.offerTrade.SwitchUserProductId.productName}  </h4>
							<span> {this.state.offerTrade.SwitchUserProductId.description} </span>
							<a className="catLink" href="/">{this.state.offerTrade.SwitchUserProductId.productCategory}</a>
								<div className="ratingRow">
								<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+this.state.offerTrade.SwitchUserId.profilePic} alt="" /></div>
								<p>{this.state.offerTrade.SwitchUserId.userName}</p>
								<div className="rated">4</div>
							<div className="cl"></div>
							</div>
						</div>
					</div>
					<div className="cl"></div>
					<div className="switch-product-section">
						<p>Offered products for switch:
                           <span className="pitch-offered"><span className="pitch-offer">Pitch offered To </span> {(this.state.offerTrade.SwitchUserId)?this.state.offerTrade.SwitchUserId.userName:''}</span>
							<div className="cl"></div>
						</p>
						<If condition={this.state.offerTradeProducts.length > 0}>
						<Then>

						{this.state.offerTradeProducts[0].products.map((offerTradeProduct, index) => {
						var productImages = (offerTradeProduct._id)?offerTradeProduct.productImages[0]:'';
						{console.log("this.state.offerTradeProducts[0]",offerTradeProduct)}

						return(<div className="switch-product-box">
						<div className="switch-product-image-box">
						<img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product image" />
						<div className="switch-option-mask">
						<a className="view-btn margin-top1" href="/">View</a>
						ditch-btn
						</div>
						</div>
						<div className="switch-product-content-box">
						<h4>{offerTradeProduct.productName}</h4>
						<a className="catLink" href="/">{offerTradeProduct.productCategory.title}</a>
						</div>
						</div>)
						})
						}
						</Then>							
						<Else>
						<p>No Image Available</p>
						</Else>
						</If>
					</div>
				</div>
			</div>

    </div>
    )}
</Popup>
)}
}

export default viewPitchPopup;

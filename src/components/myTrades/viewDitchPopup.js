import React, { Component } from 'react';
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
//import rcvProduct from '../../images/rcv-product-img.jpg'
//import offerProduct1 from '../../images/offer-product-img1.jpg'
//import offerProduct3 from '../../images/offer-product-img3.jpg'
//import userPic from '../../images/user-pic.png'
import axios from 'axios'
import { If, Then, Else } from 'react-if-elseif-else-render';
import {letterCaps} from "../commonFunction";
//import { Button,  Card,  CardBody,  CardHeader,  Col,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};

class ViewDitchPopup extends Component {
	constructor(props) {
	  super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			proID:this.props.proID,
			offerTradeProducts:[]
		}	
	}
	
	componentWillMount(){		
		this.setState({offerTradeId:this.state.offerTrade._id})
	}
	 
	componentDidMount(){
		axios.get('/trade/pitchedProductList/'+this.state.offerTrade._id).then(result => {
			if(result.data.code === 200){		
				this.setState({offerTradeProducts:result.data.result})				
			}
		})	
		 axios.get('/product/productDetails/'+ this.state.proID).then(result => {
		    this.setState({
				productData:result.data.result,
			});
		})
	}
	
	
	
render() {
	const proIMG = this.state.offerTrade.SwitchUserProductId?this.state.offerTrade.SwitchUserProductId.productImages[0]:"";
	const productIMG = this.state.offerTrade.SwitchUserId?this.state.offerTrade.SwitchUserId.profilePic:"";
	const productCategoryID = this.state.productData?this.state.productData.productCategory._id:"";
	const userID = this.state.offerTrade.SwitchUserId?this.state.offerTrade.SwitchUserId._id:"";
	
   return (
	<Popup trigger={<a className= 'view-pitch'> View Pitch </a>} modal contentStyle = {contentStyle} lockScroll > 
	{ close => (
      <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header">Pitch sent on</div>
          <div className="content">
			<div className="received-product">
			<div className="received-product-box">
			<div className="received-product-image-box">
			  <img src={constant.BASE_IMAGE_URL+'Products/'+proIMG} alt="recieved-product thumb" />
			</div>
			<div className="received-product-content-box">
			<span>Product ID: <strong>{this.state.offerTrade.SwitchUserProductId?this.state.offerTrade.SwitchUserProductId._id:""}</strong></span>
			<h4>Product Name: {(this.state.offerTrade && this.state.offerTrade.SwitchUserProductId)?this.state.offerTrade.SwitchUserProductId.productName:""}  </h4>
			<span> {(this.state.offerTrade && this.state.offerTrade.SwitchUserProductId)?this.state.offerTrade.SwitchUserProductId.description:""} </span>
			<a className="catLink" href={"search-listing/"+productCategoryID}>{(this.state.productData && this.state.productData.productCategory)?this.state.productData.productCategory.title:""}</a>
			<div className="ratingRow">
			<Link to={'public-profile/'+userID} >
				<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+productIMG} alt="" /></div>
				<p>{(this.state.offerTrade && this.state.offerTrade.SwitchUserId)?letterCaps(this.state.offerTrade.SwitchUserId.userName):""}</p>
				<div className="rated">4</div>
				<div className="cl"></div>
			</Link>	
			
			<div className="cl"></div>
			</div>
			</div>
			</div>
			<div className="cl"></div>
			<div className="switch-product-section">
			<p>Offered products for switch:
			<span className="pitch-offered">
					<span className="pitch-offer">Pitch offered To </span> {(this.state.offerTrade.SwitchUserId)?this.state.offerTrade.SwitchUserId.userName:''}</span>
			<div className="cl"></div>
			</p>

        <If condition={this.state.offerTradeProducts && this.state.offerTradeProducts.products}>
			<Then>
			  	{this.state.offerTradeProducts.products && this.state.offerTradeProducts.products.map((productList, index) => {			
				var productImng = (productList.productImages)?productList.productImages[0]:'';
				return(
				<div className="switch-product-box">
					<div className="switch-product-image-box">
					<img src={constant.BASE_IMAGE_URL+'Products/'+productImng} alt="recieved-product thumb" />
					<div className="switch-option-mask">
						<a className="view-btn" href={'/search-result/'+productList._id+'/'}>View</a>
					</div>
					</div>
					<div className="switch-product-content-box">
					<h4>{productList.productName}</h4>
					<a className="catLink" href={'/search-listing/'+((productList&& productList.productCategory)?productList.productCategory._id:"0")}>{(productList&& productList.productCategory)?productList.productCategory.title:"N/A"}</a>
					</div>
				</div>
				)
				})
		       }
		    </Then>							
		<Else>
		  <p>No Data Available</p>
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

export default ViewDitchPopup;

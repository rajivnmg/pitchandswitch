import React, { Component } from 'react';
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
//import rcvProduct from '../../images/rcv-product-img.jpg'
//import offerProduct1 from '../../images/offer-product-img1.jpg'
//import offerProduct3 from '../../images/offer-product-img3.jpg'
//import userPic from '../../images/user-pic.png'
import axios from 'axios'
import { If, Then, Else } from 'react-if-elseif-else-render';
import {Link} from 'react-router-dom';
//import { Button,  Card,  CardBody,  CardHeader,  Col,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
import {letterCaps} from "../commonFunction";
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
			proID:this.props.proID,
			offerTradeProducts:[],
			dataLoaded : false,
		}			
	}
		
	componentWillMount(){	
		this.setState({offerTradeId:this.state.offerTrade._id})
	}
	 
	componentDidMount(){			
		axios.all([
			axios.get('/trade/pitchedProductList/'+this.props.offerTrade._id),
			axios.get('/product/productDetails/'+ this.props.offerTrade.SwitchUserProductId._id)
		]).then(axios.spread((pitchedProductList, productDetails) => {
			if(pitchedProductList.data.code === 200){		
				this.setState({offerTradeProducts:pitchedProductList.data.result,productData:productDetails.data.result})				
			}
		}))  
	  .catch(error => console.log(error,this.props.offerTrade));
		
		//~ axios.get('/trade/pitchedProductList/'+this.state.offerTrade._id).then(result => {
			//~ if(result.data.code === 200){		
				//~ this.setState({offerTradeProducts:result.data.result})				
			//~ }
		//~ })
		 //~ axios.get('/product/productDetails/'+ this.state.offerTrade.SwitchUserProductId._id).then(result => {
		    //~ this.setState({
				//~ productData:result.data.result,
			//~ });
		//~ })
		 if (localStorage.getItem("jwtToken") !== null) {
			  axios.get("/user/getLoggedInUser").then(result => {
				if(result.data.code === 200) {
				  localStorage.setItem("userId", result.data.result._id);
				} 
			  });
		   }	
	}
	
     render() {
	 const proImg = this.state.offerTrade.SwitchUserProductId?this.state.offerTrade.SwitchUserProductId.productImages[0]:"";
	 const productIMG = this.state.offerTrade.SwitchUserId?this.state.offerTrade.SwitchUserId.profilePic:"";
//	 const categoryID = this.state.offerTrade.SwitchUserProductId?this.state.offerTrade.SwitchUserProductId.productCategory._id:""
	let userId = (this.state.offerTrade && this.state.offerTrade.SwitchUserId)?this.state.offerTrade.SwitchUserId._id:'0';
	
   return (
	<Popup trigger={<span className= 'view-pitch'> View Pitch </span>} modal contentStyle = {contentStyle} lockScroll > 
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
			  <img src={constant.BASE_IMAGE_URL+'Products/'+proImg} alt="recieved-product thumb" />
			</div>
			<div className="received-product-content-box">
			<span>Product ID: <strong>{this.state.offerTrade.SwitchUserProductId?this.state.offerTrade.SwitchUserProductId._id:""}</strong></span>
			<h4>Product Name: {((this.state.offerTrade && this.state.offerTrade.SwitchUserProductId)?this.state.offerTrade.SwitchUserProductId.productName:"")}  </h4>
			<span> {((this.state.offerTrade && this.state.offerTrade.SwitchUserProductId)?this.state.offerTrade.SwitchUserProductId.description:"")} </span>

			<a className="catLink" href={"search-listing/"+((this.state.productData && this.state.productData.productCategory)?this.state.productData.productCategory._id:'')}>{((this.state.productData && this.state.productData.productCategory)?this.state.productData.productCategory.title:"")}</a>

		    <div className="ratingRow">
			<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+productIMG} alt="" /></div>
			<p><Link to={"/public-profile/"+userId}>{((this.state.offerTrade && this.state.offerTrade.SwitchUserId)?letterCaps(this.state.offerTrade.SwitchUserId.userName):"")}</Link></p>
			<div className="rated">4</div>
			<div className="cl"></div>
			</div>
			</div>
			</div>
			<div className="cl"></div>
			<div className="switch-product-section">
			<p>Offered products for switch:
			<span className="pitch-offered">  
			<span className="pitch-offer">Pitch offered To </span><Link to={"/public-profile/"+userId}>{(this.state.offerTrade && this.state.offerTrade.SwitchUserId)?letterCaps(this.state.offerTrade.SwitchUserId.userName):''}</Link></span>
			<div className="cl"></div>
			</p>		
        <If condition={this.state.offerTradeProducts && this.state.offerTradeProducts.products}>
			<Then>
			  	{this.state.offerTradeProducts.products && this.state.offerTradeProducts.products.map((productList, index) => {			
				var productImages = (productList.productImages)?productList.productImages[0]:'';
				return(
				<div className="switch-product-box">
					<div className="switch-product-image-box">
					<img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product thumb" />
					<div className="switch-option-mask">
					 <If condition={localStorage.getItem('userId') === productList.userId}>
                       <Then>
						 <a className="view-btn" href={'/my-trade-detail/'+productList._id}>View</a>
					   </Then>
					  <Else>
					  <a className="view-btn" href={'/search-result/'+productList._id}>View</a>
					  </Else>
					 </If>
					</div>
					</div>
					<div className="switch-product-content-box">
					<h4>{productList.productName}</h4>
					<a className="catLink" href={"/search-listing/"+((productList.productCategory)?productList.productCategory._id:"0")}>{(productList.productCategory)?productList.productCategory.title:""}</a>
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

export default viewPitchPopup;

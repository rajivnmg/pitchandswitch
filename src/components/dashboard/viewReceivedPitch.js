import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg'
import offerProduct1 from '../../images/offer-product-img1.jpg'
import offerProduct3 from '../../images/offer-product-img3.jpg'
import userPic from '../../images/user-pic.png'
import axios from 'axios'
import successPic from '../../images/successful_img.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button,  Card,  CardBody,  CardHeader,  Col,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import ShippingTypePopup from './shippingTypePopup'
const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};
var FD = require('form-data');
var fs = require('fs');
var tempDate = new Date();
var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();


class viewReceivedPopup extends Component {
	constructor(props) {
	  super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			proID:this.props.proID,
			offerTradeProducts:[]
		}
		
		console.log("view pitchreceived",props)
	}
	
	
	componentWillMount(){		
		this.setState({offerTradeId:this.state.offerTrade._id})
	}
	
    submitHandler(proID){
	    const data = new FD();
        data.append('offerTradeId', this.state.offerTrade._id)
        data.append('tradePitchProductId', proID)
        data.append('tradeSwitchProductId', this.state.offerTrade.SwitchUserProductId._id)
        data.append('switchDate',date)
        data.append('status', 1)
	    axios.post('/trade/submitTradeProduct/',data).then(result => {	
		  if(result.data.code === 200){			  			
			 this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			   setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});			
				window.location.href='/my-trades';
			 }, 5000);	
		  }
      })  
   }
	
	componentDidMount(){
		axios.get('/trade/tradingProduct/'+this.state.offerTrade._id).then(result => {
			if(result.data.code === 200){					
				this.setState({offerTradeProducts:result.data.result})				
			}
		})
		 axios.get('/product/productDetails/'+ this.state.proID).then(result => {
		    this.setState({
				productData:result.data.result,
			});
		})
		if (localStorage.getItem("jwtToken") !== null) {
			  axios.get("/user/getLoggedInUser").then(result => {
				if(result.data.code === 200) {
				  localStorage.setItem("userId", result.data.result._id);
				} 
			  });
		   }
	}

    render() {
	  const proImg = this.state.offerTrade.SwitchUserProductId.productImages?this.state.offerTrade.SwitchUserProductId.productImages[0]:"";
	  const userID = this.state.offerTrade.SwitchUserId?this.state.offerTrade.SwitchUserId._id:"";
	
return (
<Popup
    trigger={<a className= 'TradeInfobtn'> View Pitch</a>}
    modal
    contentStyle = {contentStyle}
    lockScroll 
    >
    {
   close => (
    <div className="modal">
        <a className="close" onClick={close}>&times;</a>
         <If condition={this.state.showFormSuccess === true}>
			<Then>
				<div className="modal pitchSuccessful">
					<a className="close" onClick={close}>
					&times;
					</a>
					<div className="header centerheading"><span>Switch</span> Successful<div className="cl"></div></div>
					<p className="textSuccessful"><span classNamne="gray">You have successfully Switch on</span>
						{this.props.offerTrade.productName} ~ {this.props.offerTrade.description} 
					</p>
					<div class="successIcon">
						<img src={successPic} alt="" />
					</div>
				</div>
			  </Then>	
		<Else>        
		<div className="header">Pitch recieved on
		<div className="cl"></div>
		</div>
		<div className="content">
		<div className="received-product">
		<div className="received-product-box">
		<div className="received-product-image-box">
		   <img src={constant.BASE_IMAGE_URL+'Products/'+proImg} alt="recieved-product image" />
		</div>
		<div className="received-product-content-box">
		<span>Product ID: <strong>{this.state.offerTrade.SwitchUserProductId._id}</strong></span>
		<h4>{this.state.offerTrade.SwitchUserProductId.productName} </h4>
		<span> {this.state.offerTrade.SwitchUserProductId.description} </span>
		<a className="catLink" href={"search-listing/"+((this.state.productData && this.state.productData.productCategory)?this.state.productData.productCategory._id:'')}>{((this.state.productData && this.state.productData.productCategory)?this.state.productData.productCategory.title:"")}</a>
		</div>
		</div>
		<div className="cl"></div>
		<div className="switch-product-section">
		<p>Offered products for switch:
			<span className="pitch-offered"><span className="pitch-offer">Pitch offered by </span>
			  {this.state.offerTrade.SwitchUserId.userName} 
			</span>		
		</p>
		<div className="cl"></div>
		<If condition={this.state.offerTradeProducts}>
			<Then>
				{ (this.state.offerTradeProducts && this.state.offerTradeProducts.products)?this.state.offerTradeProducts.products.map((productList, index) => {			
				var productImages = (productList.productImages)?productList.productImages[0]:'';
				var productCategoryID = productList?productList.productCategory._id:"";
		
		return(
		<div className="switch-product-box" key={index}>
			<div className="switch-product-image-box">
			<img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product image" />
			<div className="switch-option-mask">
			<If condition={localStorage.getItem('userId') === productList.userId}>
               <Then>
			      <a className="view-btn" href={'/my-trade_detail/'+productList._id}>View</a>
			    </Then>
				<Else>
				<a className="view-btn" href={'/search-result/'+productList._id}>View</a>
				</Else>
			 </If>
			   <Button className="switch-btn" >
			      <ShippingTypePopup productID={productList._id} offerTrade={this.state.offerTrade}/>
			   </Button>			   
			</div>
			</div>
			<div className="switch-product-content-box">
			<h4>{productList.productName}</h4>
			<a className="catLink" href={'search-listing/'+productCategoryID}>{productList.productCategory.title}</a>
			</div>
		</div>
		)
		})
		:''}
		</Then>							
		<Else>
		  <p>No Data Available</p>
		</Else>
		</If>
		</div>
		</div>
		</div>
		</Else>
	</If>
    </div>
    )}
</Popup>
)}
}
export default viewReceivedPopup;

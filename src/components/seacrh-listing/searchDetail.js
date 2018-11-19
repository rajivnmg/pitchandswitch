import React, { Component } from 'react';
import Style from '../myTrades/myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import PitchRequests from './pitchRequests'
import detailPic from '../../images/detail-pic.png';
import createHistory from "history/createBrowserHistory";
import colorOrange from '../../images/color-orange.png';
import UserPic from '../../images/user-pic.png';
//import NewlyProducts from './newlyProducts';
import RelatedProducts from './relatedProducts';
import ThumbGallery from '../../components/seacrh-listing/Gallery';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Moment from 'moment';
import ReadMoreReact from 'read-more-react';
import { Spin, Alert} from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Button,  Card,  CardBody,  CardHeader,  Col,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
import ProductPitchPopup from './pitchProductPopup';
import ViewPitchPopup from './viewPitchPopup';
import AgainPitchPopup from './againditch';
import LastPitchPopup from './lditch'
import LoginPopup from './LoginPopup'
import LoginPopupWishList from './LoginPopupWishList'
const constant = require('../../config/constant')
var FD = require('form-data');
var fs = require('fs');

const history = createHistory();
class MyTrades extends React.Component {
  constructor(props)
    {
        super(props);
        let productId = props.match.params.id;
        this.state = {
            resultData: "",
            checkData: "",
            productId: productId,
            mainImages: "default_product_img@3x.png",
            productImagesResult:"",
            galleriesImg :[],
            condition :[],
            isAlreadyPitched : false,
            isAlreadyInWishlist : false,
			showFormSuccess : false
        };
    }

	 componentWillMount(){
	     axios.get('/product/productDetails/'+ this.state.productId).then(result => {
		    this.setState({
				resultData:result.data.result,
				mainImages:result.data.result?result.data.result.productImages[0]:"default_product_img@3x.png",
				isAlreadyPitched:result.data.pitchProduct,
				isAlreadyInWishlist:result.data.wishListProduct
			});
		})
	   axios.get('/donation/getConstant').then(result => {
		   this.setState({conditions: result.data.result});
	   });
	    const data = new FD();
			data.append('productId', this.state.productId)
			data.append('pitchUserID', localStorage.getItem('loggedInUser'))			
			axios.post('/product/checkExists/',data).then(result => {
			  this.setState({checkData:result.data.result});
		 })

       //~ if(localStorage.getItem('jwtToken') !== null){
			//~ axios.get('/user/getLoggedInUser').then(result => {
				//~ this.setState({ user:result.data.result })
				//~ localStorage.setItem('loggedInUser',result.data.result._id);
				//~ localStorage.setItem('userId',result.data.result._id);
				//~ localStorage.setItem('userName',result.data.result.userName);
				//~ localStorage.setItem('isLoggedIn',1);
				//~ this.setState({resultData:result.data.result});
			//~ })
		//~ }
    }



	 componentDidMount(){
		 const data = new FD();
			data.append('productId', this.state.productId)
			data.append('pitchUserID', localStorage.getItem('loggedInUser'))			
			axios.post('/product/checkExists/',data).then(result => {
			  this.setState({checkData:result.data.result});
		    })
        }


	addToWishList(){
		let data = {};
		data.userId = localStorage.getItem('userId');
		data.productId = this.state.productId;
		axios.post('/product/addToWishList',data).then(result => {
			this.setState({product:result.data.result,isAlreadyInWishlist:true,showFormSuccess:true})
		})
		setTimeout(() => {this.setState({showFormSuccess: false});}, 12000)
	}

	_renderSuccessMessage() {
		return (
		   <Alert message="Added Successfully in wishlist" type="success"/>
		);
  }
    render() {
		 let optionTemplate;
	     if(this.state.conditions){
			let conditionsList = this.state.conditions;
				conditionsList.map((key, index) => {  if(key.id==4){  optionTemplate = key.name;  }
			})
        }
		let img = this.state.resultData.userId ? this.state.resultData.userId.profilePic:"";
		let description = this.state.resultData.description?this.state.resultData.description:"";
		let userid = (this.state.resultData.userId)?this.state.resultData.userId._id:''
        return (
            <div>
			<div className="my-trades-container">
			<If condition={this.state.isAlreadyPitched}>
				<Then>
					<div className="topMsg">You have already pitched on this product</div>
				</Then>
			</If>
			<div className="container">
			<div className="breadcrumb">
			<ul><li><a href="/">Home</a></li><li>My Trades</li></ul>
			</div>
			<div className="detail-div">
			<If condition = {this.state.resultData.length === 0}>
			<Then><Spin /></Then>
			<Else>
				<div className="pic">
					<ThumbGallery galleriesID={this.state.productId} galleriesImg={this.state.mainImages} />
				</div>
				<div className="details">
				  <div className="linkRow">
				    <a href="#" className="back-page" onClick={history.goBack}>Back</a>
				  <div className="cl"></div>
				</div>
				<p className="tagsrow">{this.state.resultData.productCategory?this.state.resultData.productCategory.title:""}</p>
				<h1>{this.state.resultData.productName}</h1>
				<div className="productId">Product ID: <strong>{this.state.productId}</strong>
				  <span className="postedDate">Posted date:{Moment(this.state.resultData.createdAt).format('Y-M-D') }</span>
				</div>
				<div className="brdr-top no-padding "><div className="ratingRow"><p className="postedBy">Posted by:</p>
				 <div className="pic">
					<Link target="_blank" to={"/public-profile/"+userid}>
						<img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" />
				   </Link>
				</div>
				<p><Link target="_blank" to={"/public-profile/"+userid}>{this.state.resultData.userId?this.state.resultData.userId.firstName:""}</Link></p>
				  <div className="rated">4</div>
				  <div className="cl"></div></div>
				</div>
				  <div className="brdr-top">
					  <ReadMoreReact className="readmore" text={description} min={1}  ideal={15} max={15} />
					</div>
				<div className="btnRow">
				{this.state.showFormSuccess ? this._renderSuccessMessage() : null}


                   <If condition={localStorage.getItem('isLoggedIn') == "1"} >
                    <Then>
                        <If condition={this.state.checkData && this.state.checkData.length>0} >
						  <Then>
						      <a href="#" className="ditch">Already Pitched</a>
						  </Then>
						  <Else>						    
						       <LastPitchPopup offerTrade={this.state.resultData} proID = {this.state.productId}/>
						  </Else>
						 </If>
						 <If condition={this.state.isAlreadyInWishlist === false}>
						   <Then>
						     <a href="#" className="ditch add-wishlist" onClick={()=>this.addToWishList()}>Add to Wishlist</a>
						   </Then>
						   <Else>
						      <span className="ditch add-wishlist">Added in Wishlist</span>
						   </Else>
						 </If>
                      </Then>
                    <Else>
                        <LoginPopup UserID={userid} proID={this.state.productId}/> 
                    </Else>
                   </If> 
                   <div className="cl"></div>
				</div>

				<div className="productDetails">
				<h5>Product Details</h5>
				<table cellPadding="0" cellSpacing="0" width="100%">
				  <tbody>
					<tr>
					<td>Size:</td><td>{this.state.resultData.size?this.state.resultData.size.size:""} GB</td>
					</tr>
					<tr>
					<td>Color:</td><td><img src={colorOrange} />{this.state.resultData.color}</td>
					</tr>
					<tr>
					<td>Brand:</td><td>{this.state.resultData.brand?this.state.resultData.brand.brandName:""}</td>
					</tr>
					<tr>
						<td>Condition:</td><td>{optionTemplate}</td>
					</tr>
					<tr>
						<td>Age:</td><td>{this.state.resultData.productAge}</td>
					</tr>
				  </tbody>
				</table>
			  </div>
			  </div>
			</Else>
			</If>
			<div className="cl"></div>
			</div>
			<div className="cl"></div>
			<div className="my-trades ">
			<h3 className="center-text">You may be interested in</h3>
			   <RelatedProducts productID={this.state.productId}/>
			</div>
			<div className="cl"> </div>
			</div>
		   </div>
		  </div>
		);
    }
}

export default MyTrades;

import React, { Component } from 'react';
import Style from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import detailPic from '../../images/detail-pic.png'
import createHistory from "history/createBrowserHistory" 
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';
import Moment from 'moment';
const history = createHistory();
const userId =  localStorage.getItem('userId')
const constant = require('../../config/constant')
var FD = require('form-data');
var fs = require('fs');

class MyTradesDetail extends React.Component {
	
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

	 componentDidMount(){
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
       
		axios.get('/user/getLoggedInUser').then(result => {
			this.setState({ user:result.data.result })
			localStorage.setItem('loggedInUser',result.data.result._id);
			localStorage.setItem('userId',result.data.result._id);
			localStorage.setItem('userName',result.data.result.userName);
			localStorage.setItem('isLoggedIn',1);
			this.setState({resultData:result.data.result});
		})
		
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
				<div className="my-trades-container">
				<div  className="container">
				<div className="breadcrumb">
				<ul>
				<li><a href="/">Home</a></li><li>My Trades</li>
				</ul>
				</div>
				<div className="detail-div">
				<div className="pic">
				<img src={constant.BASE_IMAGE_URL+'Products/'+this.state.mainImages} />
				</div>
				<div className="details">
				<div className="linkRow">
				{/*<a href="#" className="delete-product">Delete Product</a>
				<a href="#" className="edit-product">Edit Product</a>*/}
				<a href="#" className="back-page" onClick={history.goBack}>Back</a>

				<div className="cl"></div>
				</div>            
				<p className="tagsrow">{this.state.resultData.productCategory?this.state.resultData.productCategory.title:""}</p>
				<h1>{this.state.resultData.productName}~ {description}</h1>
				<div className="productId">Product ID: <strong>{this.state.productId}</strong>
                 <span className="postedDate">Posted date: {Moment(this.state.resultData.createdAt).format('Y-M-D') }</span>
                </div>
				<div className="productDetails">
				<h5>Product Details</h5>
				<table cellPadding="0" cellSpacing="0" width="100%">
				<tbody>
				<tr>
					<td>Size:</td><td>{this.state.resultData.size?this.state.resultData.size.size:""} GB</td>
				</tr>
				<tr>
					<td>Color:</td><td>{this.state.resultData.color}</td>
				</tr>
				<tr>
					<td>Brand:</td><td>{this.state.resultData.brand?this.state.resultData.brand.brandName:""}</td>
				</tr>
				<tr>
				<td>Condition:</td><td>{optionTemplate}</td>
				</tr>
				<tr>
				<td>Age:</td><td>{this.state.resultData.productAge} Month</td>
				</tr>
				</tbody>
				</table>
				</div>                
				</div>
				<div className="cl"></div>
				</div>
				<div className="cl"></div>
				<div className="my-trades white-background">
				<h3>My Trades</h3>
				  <PitchRequests />

				  {/*<a className="more-items" href="#">More result</a>*/}
				</div>
				<div className="cl"> </div>
				</div>
				</div>
         );
    }
}

export default MyTradesDetail;

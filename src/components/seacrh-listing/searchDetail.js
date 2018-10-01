import React, { Component } from 'react';
import Style from '../myTrades/myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import PitchRequests from './pitchRequests'
import detailPic from '../../images/detail-pic.png';
import createHistory from "history/createBrowserHistory";
import colorOrange from '../../images/color-orange.png';
import UserPic from '../../images/user-pic.png';
import NewlyProducts from './newlyProducts';
import ThumbGallery from '../../components/seacrh-listing/Gallery';
import axios from 'axios';	
import Moment from 'moment';
import ReadMoreReact from 'read-more-react';
const constant = require('../../config/constant')


const history = createHistory();
class MyTrades extends React.Component {
  constructor(props)
    {
        super(props);        
        let productId = props.match.params.id; 
        this.state = {
            resultData: "",
            productId: productId,
            mainImages: ""
        };
    }
	
	 componentWillMount(){
		 console.log("called will mount")
	     axios.get('/product/productDetails/'+ this.state.productId).then(result => {			
			this.setState({resultData:result.data.result,mainImages:result.data.result.productImages[0]});
			//this.setState({mainImages:this.state.resultData.productImages[0]});
		})
		 console.log("called will mount1111",this.state.mainImages)
	     axios.get('/product/getConstant/'+ this.state.resultData.condition).then(result => {	
			this.setState({resultData:result.data.result});
		})
		
	     axios.get('/product/productImages/'+ this.state.productId).then(result => {	
			this.setState({resultData:result.data.result});
		})
     }
	
    render() {
		 //~ let products;
		  //~ if(this.state.products){
			   //~ let productList = this.state.resultData;
			   //~ 
			   //~ products = productList.map((product,index) => <Product key={product._id} onDeleteProduct={this.productDeleteHandler.bind(this)} changeStatus={(product) => this.changeStatusHandler(product)}   product={product} sequenceNumber={index+1}/>);
         //~ }
         //~ 
		
		let img = this.state.resultData.userId?this.state.resultData.userId.profilePic:"";
		let description = this.state.resultData.description?this.state.resultData.description:"";
		
        return (
			<div className="my-trades-container">
			<div className="container">
			<div className="breadcrumb">
			<ul><li><a href="/">Home</a></li><li>My Trades</li></ul>
			</div>
			<div className="detail-div">
			<div className="pic">
			  <ThumbGallery galleries={this.state.mainImages} />
			</div>
			<div className="details">
			<div className="linkRow">
			 <a href="#" className="back-page" onClick={history.goBack}>Back</a>
			<div className="cl"></div>
			</div>            
			<p className="tagsrow">{this.state.resultData.productCategory?this.state.resultData.productCategory.title:""}</p>
			<h1>{this.state.resultData.productName}</h1>
			<div className="productId">Product ID: <strong>{this.state.resultData._id}</strong> 
			  <span className="postedDate">Posted date:{Moment(this.state.resultData.createdAt).format('Y-M-D') }</span>
			</div>
			<div className="brdr-top no-padding "><div className="ratingRow"><p className="postedBy">Posted by:</p>
			 <div className="pic">
			   <img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" />
			</div>
			<p>{this.state.resultData.userId?this.state.resultData.userId.firstName:""}</p>
			  <div className="rated">4</div>
			  <div className="cl"></div></div>
			</div>
			  <div className="brdr-top">
			      <ReadMoreReact className="readmore" text={description} min={1}  ideal={2} max={2} />
				</div>
			<div className="btnRow">
			<a href="#" className="ditch">Already Pitched</a>
			<a href="#" className="ditch add-wishlist">Add to Wishlist</a>
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
						<td>Condition:</td><td>{this.state.resultData.condition}</td>
					</tr>
					<tr>
						<td>Age:</td><td>{this.state.resultData.productAge}</td>
					</tr>
				</tbody>
			</table>
			</div>
			</div>
			<div className="cl"></div>
			</div>
			<div className="cl"></div>
			<div className="my-trades ">
			<h3 className="center-text">You may be interested in</h3>
			   <NewlyProducts  />
			</div>
			<div className="cl"> </div>
			</div>
			</div>
			);
    }
}

export default MyTrades;

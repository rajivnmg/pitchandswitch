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
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Button,  Card,  CardBody,  CardHeader,  Col,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';

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
            mainImages: "",
            productImagesResult:"",
            galleriesImg :[],
            condition :[],
        };
    }
	
	    componentWillMount(){		
	       axios.get('/product/productDetails/'+ this.state.productId).then(result => {			
			this.setState({resultData:result.data.result,mainImages:result.data.result.productImages?result.data.result.productImages[0]:""});
		  })
		
	   axios.get('/donation/getConstant').then(result => {
           this.setState({conditions: result.data.result});            
       });
	     //~ axios.get('/product/productImages/'+ this.state.productId).then(results => {	
			//~ this.setState({productImagesResult:results.data.result});
			//~ console.log('productImagesResult',this.state.productImagesResult);
			//~ console.log('resultData',this.state.resultData)
		//~ })
     }
	
    render() {	
		
		 let optionTemplate;
	     if(this.state.conditions){
			let conditionsList = this.state.conditions;
				conditionsList.map((key, index) => {  if(key.id==4){     optionTemplate = key.name;  }
			})
         }
		let img = this.state.resultData.userId?this.state.resultData.userId.profilePic:"";
		let description = this.state.resultData.description?this.state.resultData.description:"";
        return (
            <div>    				
			<div className="my-trades-container">
			<div className="container">
			<div className="breadcrumb">
			<ul><li><a href="/">Home</a></li><li>My Trades</li></ul>
			</div>
			<div className="detail-div">
			<div className="pic">			
			  <ThumbGallery galleriesID={this.state.productId} galleriesImg= {this.state.mainImages} />
			</div>
			 <If condition={this.state.resultData.length === 0}>
			<Then><Spin /></Then>
			<Else>
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
					  <ReadMoreReact className="readmore" text={description} min={1}  ideal={15} max={15} />
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
					<tr>{console.log('ccccccc',this.state.resultData?this.state.resultData.condition:"")}
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
			   <NewlyProducts productID={this.state.productId}/>
			</div>
			<div className="cl"> </div>
			</div>
			</div>
			</div>
		);
    }
}

export default MyTrades;

import React, { Component } from 'react';
import Style from './myTrades.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PitchRequests from './pitchRequests'
import detailPic from '../../images/detail-pic.png'
import createHistory from "history/createBrowserHistory" 
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';
const history = createHistory();
const userId =  localStorage.getItem('userId')

class MyTrades extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
				product :[],
				isAlreadyPitched : false,
				isAlreadyInWishlist : false,
				showFormSuccess : false
			}
			
	}
	
	componentWillMount(){
		console.log("componentWillMount called")
		axios.get('product/productDetails/'+this.props.match.params.id).then(result=>{
				 this.setState({product:result.data.result,isAlreadyPitched:result.data.pitchProduct,isAlreadyInWishlist:result.data.wishListProduct})		
			})
	}
	
	addToWishList(){		
		let data = {};
		data.userId = userId;
		data.productId = this.state.product._id;
		axios.post('/product/addToWishList',data).then(result => {			
			this.setState({product:result.data.result,isAlreadyInWishlist:true,showFormSuccess:true})					
		})			
		setTimeout(() => {this.setState({showFormSuccess: false});}, 12000)
	}

	_renderSuccessMessage() {
    return (
      <Alert message="Added Successfully in wishlist" type="success" showIcon />
    );
  }
    render() {
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
                                <img src={detailPic} />
                            </div>
                            <div className="details">
                                <div className="linkRow">
                                    <a href="#" className="delete-product">Delete Product</a>
                                    <a href="#" className="edit-product">Edit Product</a>
                                    <a href="#" className="back-page" onClick={history.goBack}>Back</a>
                                    
                                    <div className="cl"></div>
                                </div>            
                                <p className="tagsrow">Sports &amp; Fitness / Cycling / Cycles / Hero Cycles</p>
                                <h1>God of War 3 ~ Download Full Version PC third-person action-adventure video game</h1>
                                <div className="productId">Product ID: <strong>PS2152436</strong></div>
                                <div className="btnRow">
									
									   {this.state.showFormSuccess ? this._renderSuccessMessage() : null}  
									<If condition={this.state.isAlreadyPitched === false}>
										<Then>
											<a href="#" className="ditch">Pitch Now</a>											
										</Then>	
										<Else>
											<a href="#" className="ditch">Already Pitched</a>											
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
									
                                    <div className="cl"></div>
                                </div>
                                <div className="productDetails">
                                    <h5>Product Details</h5>
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>Size:</td><td>16.5 GB</td>
                                            </tr>
                                            <tr>
                                                <td>Color:</td><td></td>
                                            </tr>
                                            <tr>
                                                <td>Brand:</td><td>Sony</td>
                                            </tr>
                                            <tr>
                                                <td>Condition:</td><td>Excellent</td>
                                            </tr>
                                           <tr>
                                                <td>Age:</td><td>6 Month</td>
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
                            <a className="more-items" href="#">More result</a>
                        </div>
                        <div className="cl"> </div>
                    </div>
                </div>
                );
    }
}

export default MyTrades;

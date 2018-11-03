import React, { Component } from 'react';
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';
import axios from 'axios'
import { If, Then, Else } from 'react-if-elseif-else-render';
import { Alert,Icon } from 'antd';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart);

const constant = require('../../config/constant')

const newlyAdded = [
    {label: "Newly Added", value: 1},
    {label: "A - Z", value: 2},
    {label: "Z - A", value: 3},
    {label: "Nearest", value: 4}
];

class tradeMatch extends Component {
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    constructor(props)
    {
        super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            tradeMatches : [],
            wishlistProducts:[],
            categories : [{label: "Select", value: 1}],
            currentCategory:'',
            currentshortBy:1,
            message:'',
            showFormSuccess:false,
            filterOpt : {category: "", sortBy: 1},
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                }
            ],

        };
        this.UpdateWishListProduct = this.UpdateWishListProduct.bind()
    } 
	// function to get product filter by categoory
	finterByCategory(categoryId){						
		this.setState({filterOpt:{category:categoryId,sortBy:this.state.currentshortBy},sortBy:this.state.currentshortBy},
		function(){		
		  axios.post('/product/tradeMatchFilterBy',this.state.filterOpt).then(result =>{				
				this.setState({
					tradeMatches : result.data.result
				});
		  });
	  });
	}
	// function to get product filter by data	
	sortBy(id){	
console.log(id);	
		this.setState({filterOpt:{category:this.state.currentCategory,sortBy:id},currentshortBy:id},
		function(){		
		axios.post('/product/tradeMatchFilterBy',this.state.filterOpt).then(result =>{				
			this.setState({
				tradeMatches : result.data.result
			});
		});
	});
			
	}	
	
	UpdateWishListProduct = (productid,action) => {
		let newWishlistProducts = []
		newWishlistProducts = [...this.state.wishlistProducts]; // make a separate copy of the array
		if(action =='Remove'){		  
		   var index = newWishlistProducts.indexOf(productid)
		   newWishlistProducts.splice(index, 1);
		   this.setState({wishlistProducts: newWishlistProducts});
		}else{		 
			  newWishlistProducts.push(productid)
			  this.setState({wishlistProducts: newWishlistProducts});
		}
	}
	
	addToWishList(productId){		
		let data = {};
		data.userId = localStorage.getItem('userId');
		data.productId = productId;
		axios.post('/product/addToWishList',data).then(result => {			
			this.setState({product:result.data.result,isAlreadyInWishlist:true,showFormSuccess:true,message:'Added successfully'},this.UpdateWishListProduct(productId,'Add'))					
		})			
		setTimeout(() => {this.setState({showFormSuccess: false});}, 12000)
	}			
	removeFromWishList(productId){		
		let data = {};
		data.userId = localStorage.getItem('userId');
		data.productId = productId;
		axios.post('/product/removeFromWishList',data).then(result => {			
			this.setState({product:result.data.result,isAlreadyInWishlist:true,showFormSuccess:true,message:'Removed successfully'},this.UpdateWishListProduct(productId,'Remove'))
		})			
		setTimeout(() => {this.setState({showFormSuccess: false});}, 12000)
	}
	
	componentWillMount(){
		// API to get All the product list
		axios.get('/product/tradeMatch').then(result => {		 		  
		   this.setState({tradeMatches:result.data.result})
		})
		// API to get All the category list		
		axios.get('/category/listCategory').then(result =>{			
			this.setState({
				categories : result.data.result
			});
		});
	}
	
	componentDidMount(){						
		if(localStorage.getItem('jwtToken') !== null){	
			axios.get('/user/getUserWishListProducts/'+localStorage.getItem('userId')).then(result => {					
				if(result.data.code === 200){					
					this.setState({ 
						user:result.data.result,
						wishlistProducts:result.data.wishlistProducts
					})					
				}
			})
		}else{
			 this.props.history.push('/logout');
		}
	}
	
	_renderSuccessMessage() {
		return (
		  <Alert message={this.state.message} type="success successDiv" showIcon />
		);
	}
	
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li> <li>Trade Match</li>
                            </ul>
                        </div>
                        <div className="heading-row">                        
                            <h1>Trade Match</h1>
                            <div className="cl"></div>
                        </div>
                        {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                        <div className="search-row">
                            <div className="category-left">
                                <span>Category:</span>                                 
                                <div className="categoryFilter">
                                    <div ><Select options={this.state.categories} defaultValue={this.state.categories[0]} onChange={opt => this.finterByCategory(opt.value)} /></div>
                                </div>
                            </div>
                            <div className="sort-by right">
                                <span>Sort by:</span> 
                                <div className="newly-add">
                                    <div className="search"><Select options={constant.sortBy} defaultValue={constant.sortBy[0]}   onChange={opt => this.sortBy(opt.value)/*console.log(opt.label, opt.value)*/} /></div>
                                </div>
                            </div>
                            <div className="cl"></div>
                        </div>
                        <div className="item-listing">                        
                        
                            {this.state.tradeMatches.slice(0, this.state.limit).map((tradeMatch, index) => {
									var userImage = tradeMatch.userId?tradeMatch.userId.profilePic:null
                                    return(<div className="Items" key={index}>
                                        <div className="pic">
											<div className="overlay">											
											<If condition ={this.state.wishlistProducts.indexOf(tradeMatch._id) > -1}>	
												<Then>
													<a href="#"  onClick={()=>this.removeFromWishList(tradeMatch._id)} className={(this.state.wishlistProducts.indexOf(tradeMatch._id) > -1)?"favourite active":"favourite"}>
													<FontAwesomeIcon icon="heart" title="Add to wishlist"/> fav
													</a>
												</Then>												
											   <Else>
												<a href="#"  onClick={()=>this.addToWishList(tradeMatch._id)} className="favourite">
													<FontAwesomeIcon icon="heart" title="Add to wishlist"/> fav
													</a>
											   </Else>
											 </If>
											</div>
												<img src={constant.BASE_IMAGE_URL+'Products/'+tradeMatch.productImages} alt="" />
										</div>
                                        <div className="details">
                                            <h4><a href="/my-trade-detail">{tradeMatch.productName}</a></h4>
                                            <a href="#" className="catLink"> {(tradeMatch.productCategory)?tradeMatch.productCategory.title:''}</a>
                                       </div>
                                        <div className="userdiv">
                                            <div className="user-pic"> <FontAwesomeIcon icon="heart-o" /> <img className="userProfile" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage}  /></div>
                                            <div className="user-name">{(tradeMatch.userId)?tradeMatch.userId.userName:''}</div>
                                        </div>
                                    </div>
                                            )
                            })}
                            <div className="cl"></div>
                        </div>
                         {(!this.state.tradeMatches.length) ? <div> <Alert message="No Record Found" type="success"/></div> : '' } 
                       
                        {this.state.tradeMatches.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' } 
                        
                        
                        <div>&nbsp;</div>
                
                    </div>
                </div>
                    );
    }
}
export default tradeMatch;

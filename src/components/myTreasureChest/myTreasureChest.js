import React, { Component } from 'react';
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import Select from 'react-select';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Popconfirm, message, Button,Spin, Icon, Alert } from 'antd';
import { If, Then, Else } from 'react-if-elseif-else-render';
import PayInventoryPopup from '../payInventoryPopup';
const constant = require("../../config/constant");
const text = 'Are you sure to delete this?';

class myTreasureChest extends Component {   
    constructor(props)    
    {
        super(props);
        this.state = {
			user:{
				 email:'',
				 firstName:'J',
				 lastName:'J',
				 middleName:'',
				 profilePic:'',
				 userName:'Robert',
				 totalInventory:0
			},
			newlyAdded : [],
            limit: 5,
            totalInventory:0,
            loadMore: true,
            categories : [{label: "Select", value: 1}],
            currentCategory:'',
            currentshortBy:1,
            filterOpt : {category: "", sortBy: 1},
            myTreasureChests: [],
           showFormSuccess : false
        }  
              
    }    
    
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    
   productDeleteHandler(e){		
		  axios.delete('/product/deleteProduct/' + e).then(result => {
          if(result.data.code == '200'){
            let products = this.state.myTreasureChests;
            let productIndex = products.findIndex(x => x._id === e);
            products.splice(productIndex, 1);
            this.setState({
              myTreasureChests: products,
              approveId: null,
              approve: false
            });
            this.setState({showFormSuccess: true});
			setTimeout(() => {this.setState({showFormSuccess: false});}, 12000)
          }
        });
	}
	
	componentWillMount(){
		this.setState({newlyAdded:constant.sortBy},function(){/*console.log("newlyAdded",this.state.newlyAdded[0])*/})
	}
	componentDidMount(){
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');			
			if(localStorage.getItem('jwtToken') !== null){
				axios.get('/user/getLoggedInUser').then(result => {						
					this.setState({ 
						user:result.data.result,
						notification_type:result.data.notification_type,
						notifications :result.data.notifications,
						totalNotifications:result.data.totalNotifications
					})			
				})
			}
			axios.get('/product/myTreasureChest').then(result =>{				
				this.setState({
					myTreasureChests : result.data.result,
					totalInventory:result.data.result.length
				});
			});
			axios.get('/category/listCategory').then(result =>{			
				this.setState({
					categories : result.data.result
				});
			});
			
	}
	
	finterByCategory(categoryId){						
		this.setState({filterOpt:{category:categoryId,sortBy:this.state.currentshortBy},sortBy:this.state.currentshortBy}, function(){
		  axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
				this.setState({
					myTreasureChests : result.data.result
				});
		  })});
	}
	
	sortBy(id){						
		this.setState({filterOpt:{category:this.state.currentCategory,sortBy:id},currentshortBy:id})		
		axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
			this.setState({
				myTreasureChests : result.data.result
			});
		});
			
	}
Capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
} 
 _renderSuccessMessage() {
    return (
      <div className={"alert alert-danger mt-4"} role="alert">
       <Alert
      message="Success"
      description="Product has been deleted successfully"
      type="success"
      showIcon
    />
      </div>
    );
  }
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li><li>My Trades</li>
                            </ul>
                        </div>
                        <div className="heading-row">.
							<If condition={this.state.totalInventory <= this.state.user.totalInventory }>
								<Then>
									 <Link to={'/add-new-product'} className="more-items"><span className="plus">+</span> Add New Product</Link>
								</Then>
								<Else>								
									<PayInventoryPopup />
								</Else>
							</If>
                           
                            <h1>Welcome, {this.Capitalize(this.state.user.firstName)}{' '}{this.Capitalize(this.state.user.lastName)}.</h1>
                            <div className="cl"></div>
                        </div>
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
                                    <div className="search"><Select options={this.state.newlyAdded} defaultValue={this.state.newlyAdded[0]}   onChange={opt => this.sortBy(opt.value)/*console.log(opt.label, opt.value)*/} /></div>
                                </div>
                            </div>
                            <div className="cl"></div>
                        </div>
                         {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                        <div className="item-listing">
                            {this.state.myTreasureChests.slice(0, this.state.limit).map((slide, index) => {
								var userImage = slide.userId?slide.userId.profilePic:'';
                                    return(<div className="Items" key={index}>
											<div className="pic"><div className="overlay">
											<Popconfirm placement="top" title={text} onConfirm={this.productDeleteHandler.bind(this, slide._id)} okText="Yes" cancelText="No">
														<span className="delete mousePointer">Delete</span>
											</Popconfirm>			
												<a href={'/edit-product/'+slide._id} className="edit">Edit</a>
											</div>
												<img src={constant.BASE_IMAGE_URL+'Products/'+slide.productImages} alt="" />
											</div>
											<div className="details">
												<h4><Link to={"/my-trade-detail/"+slide._id}>{slide.productName}</Link></h4>
												<a href="#" className="catLink"> {(slide.productCategory && slide.productCategory !== null)?slide.productCategory.title:'N/A'}</a>           
											</div>
											<div className="userdiv">
												<div className="user-pic"><img className="userProfile" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
												<div className="user-name">{(slide.userId)?slide.userId.userName:''}</div>
											</div>
										</div>
									)
                            })}
                            <div className="cl"></div>
                        </div>
                        {this.state.myTreasureChests.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' } 
                        <div>&nbsp;</div>                
                    </div>
                </div>
           );
    }
}
export default myTreasureChest;

import React, { Component } from 'react';
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import Select from 'react-select';
import axios from 'axios';
import { Popconfirm, message, Button } from 'antd';
//~ const categoryFilter = [
    //~ {label: "Select", value: 1},
    //~ {label: "Games", value: 2},
    //~ {label: "Toy", value: 3} 
//~ ];

const text = 'Are you sure to delete this?';

const App1 = () => ( 
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={this.state.categories} />
                </div>
            </div>
            );
const newlyAdded = [
    {label: "Newly Added", value: 1},
    {label: "A - Z", value: 2},
    {label: "Z - A", value: 3},
    {label: "Nearest", value: 4}
];
const App2 = () => (
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={newlyAdded} />
                </div>
            </div>
            );

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
				 userName:'Robert'
			},
            limit: 5,
            loadMore: true,
            categories : [{label: "Select", value: 1}],
            currentCategory:'',
            currentshortBy:1,
            filterOpt : {category: "", sortBy: 1},
            myTreasureChests: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars",
                    "userId":{
						 email:'',
						 firstName:'J',
						 lastName:'J',
						 middleName:'',
						 profilePic:'',
						 userName:'Robert'
					}
                }
            ],
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
			setTimeout(() => {this.setState({showFormSuccess: false});}, 5000)
          }
        });
	}
	
	finterByCategory(categoryId){			
			// Get the user treasure chest filter by category
			this.setState({filterOpt:{category:categoryId,sortBy:this.state.currentshortBy},sortBy:this.state.currentshortBy})
			//console.log("filterOpt",this.state.filterOpt)
			axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
				this.setState({
					myTreasureChests : result.data.result
				});
			});
			
	}
	
	sortBy(id){			
			// Get the user treasure chest filter by category			
			this.setState({filterOpt:{category:this.state.currentCategory,sortBy:id},currentshortBy:id})
			//console.log("filterOpt",this.state.filterOpt,id)
			axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
				this.setState({
					myTreasureChests : result.data.result
				});
			});
			
	}	
   
    componentDidMount(){	
			// get the loogedIn user details
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
			//console.log("jwtToken",localStorage.getItem('jwtToken'))
			if(localStorage.getItem('jwtToken') !== null){
				axios.get('/user/getLoggedInUser').then(result => {
					//console.log("result getLoggedInUser",result)
					this.setState({ 
						user:result.data.result,
						notification_type:result.data.notification_type,
						notifications :result.data.notifications,
						totalNotifications:result.data.totalNotifications
					})			
				})
			}			
			// Get the user treasure chest	
			axios.get('/product/myTreasureChest').then(result =>{
				//console.log("myTreasureChests",result.data.result)
				this.setState({
					myTreasureChests : result.data.result
				});
			});
			
			axios.get('/category/listCategory').then(result =>{
				//console.log("categories",result.data.result)
				this.setState({
					categories : result.data.result
				});
			});
	}
	
   Capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
} 

 _renderSuccessMessage() {
    return (
      <div className={"alert alert-danger mt-4"} role="alert">
       Product Has been deleted successfully!
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
                            <a href={'/add-new-product'} className="more-items"><span className="plus">+</span> Add New Product</a>
                            <h1>Welcome, {this.Capitalize(this.state.user.firstName)}{' '}{this.Capitalize(this.state.user.lastName)}.</h1>
                            <div className="cl"></div>
                        </div>
                        <div className="search-row">
                            <div className="category-left">
                                <span>Category:</span> 
                                <div className="categoryFilter">
                                    <div ><Select options={this.state.categories} defaultValue={this.state.categories[0]} onChange={opt => this.finterByCategory(opt.value)/*console.log(opt.label, opt.value)*/} /></div>
                                </div>
                            </div>
                            <div className="sort-by right">
                                <span>Sort by:</span> 
                                <div className="newly-add">
                                    <div className="search"><Select options={newlyAdded} defaultValue={newlyAdded[0]}   onChange={opt => this.sortBy(opt.value)/*console.log(opt.label, opt.value)*/} /></div>
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
												<img src={'http://localhost:3006/assets/uploads/Products/'+slide.productImages} alt="" />
											</div>
											<div className="details">
												<h4><a href="/my-trade-detail">{slide.productName}</a></h4>
												<a href="#" className="catLink"> {(slide.productCategory && slide.productCategory !== null)?slide.productCategory.title:'N/A'}</a>           
											</div>
											<div className="userdiv">
												<div className="user-pic"><img className="userProfile" src={'http://localhost:3006/assets/uploads/ProfilePic/'+userImage} /></div>
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

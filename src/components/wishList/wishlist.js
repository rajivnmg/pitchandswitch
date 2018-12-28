import React, { Component } from 'react';
import Style from './wishlist.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import Select from 'react-select';
import ClearWishListPopup from './clearWishListPopup'
import Aux from "../../hoc/Auxillary";
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';
import { Route, Redirect } from 'react-router'
const constant = require('../../config/constant')

const categoryFilter = [
    {label: "Select", value: 1},
    {label: "Games", value: 2},
    {label: "Toy", value: 3} 
];
const App1 = () => ( 
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={categoryFilter} />
                </div>
            </div>
            );
const newlyAdded = [
    {label: "Newly Added", value: 1},
    {label: "A - Z", value: 2},
    {label: "Z - A", value: 3},
    {label: "Nearest", value: 3}
];
const App2 = () => (
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={newlyAdded} />
                </div>
            </div>
            );

class wishList extends Component {

    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }

    constructor(props)
    {
	 super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            wishlists: [],
            total :10

        };
    }     
	componentWillMount(){
		axios.get('/product/wishList').then(wishlists =>{
				if(wishlists.data.code === 200){
					if(wishlists.data.result.length ===0){
						window.location = constant.PUBLIC_URL + "empty-wishlist";
					}
					this.setState({wishlists:wishlists.data.result,total:wishlists.data.result.length})
				}
			});
	}

    render() {
        return (
                <Aux><div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li><li>My Wishlist</li>
                            </ul>
                        </div>
                        <div className="heading-row">                            
                            <ClearWishListPopup />
                            <h1>My Wishlist</h1>
                            <div className="cl"></div>
                        </div>
                        <div className="search-row">
                            
                            <div className="cl"></div>
                        </div>
                        <If condition={this.state.wishlists.length === 0}>
								<Then>
									 <Spin tip="Loading...">
										<Alert
										  message="Data Loading "
										  description="Please wait..."
										  type="info"
										/>
									  </Spin>
								</Then>							
							</If>
							{/*<If condition={this.state.total === 0}>
								<Then>
									 <Redirect push to="/empty-wishlist" />
								</Then>							
							</If> */}
                        <div className="item-listing donateProducts">
                            {this.state.wishlists.slice(0, this.state.limit).map((wishlist, index) => {
								var productImages = (wishlist.productId)?wishlist.productId.productImages[0]:'';
								var userImage = (wishlist.userId)?wishlist.userId.profilePic:'';
                                    return(<div className="Items" key={index}>
                                    <div className="pic"> <img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="" /></div>
                                        <div className="details">
                                            <h4><a href="/my-trade-detail">{(wishlist.productId)?wishlist.productId.productName:''}</a></h4>
                                            <a href="#" className="catLink"> {(wishlist.productId)?wishlist.productId.productCategory.title:''}</a>           
                                        </div>
                                        <div className="userdiv">
                                            <div className="user-pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
                                            <div className="user-name">{(wishlist.userId)?wishlist.userId.userName:''}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="cl"></div>
                        </div>
                        {this.state.wishlists.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' } 
                        <div>&nbsp;</div>                
                    </div>
                </div></Aux>
                    );
    }
}
export default wishList;

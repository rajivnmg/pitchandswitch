import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import axios from 'axios';
const constant = require("../../config/constant");
class WhatOtherSwitched extends Component {
	
   constructor(props)
    {
       super(props);
        this.state = {
			limit: 5,
            loadMore: true,
            switches: [{
                    "title": "",
                    "image": "",
                    "category": ""
                }
             
            ]
        };
    }
	componentDidMount(){
	 axios.get('/product/switchTodays').then(result => {		 		 
			this.setState({switches:result.data.result});
		 })
     }
     onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 5}));
    }
    
   render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1026,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };

        return (
			<div className="popularItems">
				<h3> What others have switched today </h3>
				 <Slider {...settings}>				    
				   {this.state.switches.slice(0, this.state.limit).map(function (switched,index) {					   
				var imagePathSwitch = switched.tradeSwitchProductId?switched.tradeSwitchProductId.productImages[0]:'';
				var imagePathPitch = switched.tradePitchProductId?switched.tradePitchProductId.productImages[0]:'';	
				var imagePathPitchUser = switched.offerTradeId?switched.offerTradeId.pitchUserId.profilePic:'';
				var imagePathSwitchUser = switched.offerTradeId?switched.offerTradeId.SwitchUserId.profilePic:'';
				var userIds = switched.offerTradeId?switched.offerTradeId.SwitchUserId._id:'0';
				var proIDS = switched.tradePitchProductId?switched.tradePitchProductId._id:'0';	
				var catIDS = ((switched.tradePitchProductId && switched.tradePitchProductId.productCategory)?switched.tradePitchProductId.productCategory._id:'0');	
				var productUrl = (localStorage.getItem('isLoggedIn') == 1 && localStorage.getItem('userId') == userIds)?'/my-trade-detail/'+proIDS:'/search-result/'+proIDS															
					return (					    					
					    <div className="slides-div"  key={index}>
						<div key={index}>
						<div className="flip-container">
						<div className="flipper">
						<div className="front">
						<div className='pic'>
						  <Link to={productUrl} ><img src={constant.BASE_IMAGE_URL+'Products/'+imagePathSwitch} /></Link>
						  </div>
						<div className='details'>						
						<h4><a href={productUrl} >{switched.tradeSwitchProductId?switched.tradeSwitchProductId.productName:''}</a></h4>
						<Link className="catLink" replace to={'/search-listing/'+catIDS}>{(switched.tradePitchProductId && switched.tradePitchProductId.productCategory)?switched.tradePitchProductId.productCategory.title:"NA"}</Link>
						</div>
						<div className="userdiv">
						<div className="user-pic userProfilePic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+imagePathSwitchUser} height="20px;" width="20px;"/></div>
						<div className="user-name">{(switched.offerTradeId && switched.offerTradeId.SwitchUserId)?switched.offerTradeId.SwitchUserId.userName:''}</div>
						{/*
							switched.offerTradeId.SwitchUserId.profilePic
								switched.offerTradeId.pitchUserId.profilePic						
							 */}
						</div>
						</div>
						<div className="back">
						<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+imagePathPitch} /></div>
						<div className='details'>
						<h4>{switched.tradePitchProductId?switched.tradePitchProductId.productName:''}</h4>
						<Link className="catLink" replace to={'/search-listing/'+catIDS}>{(switched.tradePitchProductId && switched.tradePitchProductId.productCategory)?switched.tradePitchProductId.productCategory.title:'NA'}</Link>
						</div>
						<div className="userdiv">
						<div className="user-pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+imagePathPitchUser} height="20px;" width="20px;"/></div>
						<div className="user-name">{(switched.offerTradeId && switched.offerTradeId.pitchUserId)?switched.offerTradeId.pitchUserId.userName:''}</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						)
					  })
				   }
				</Slider>
					{this.state.switches.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' }              
			</div>
           );
          }
        }
        export default WhatOtherSwitched;

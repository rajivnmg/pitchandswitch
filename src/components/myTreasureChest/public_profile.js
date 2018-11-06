<<<<<<< HEAD
import React, { Component } from "react";
import PublicReviews from "./public_reviews1";
import Style from "./myTreasureChest.css";
import popularItemImg from "../../images/popular-item1.jpg";
import userPicture from "../../images/user-pic.png";
import userPictureLg from "../../images/userProfileLarge.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Select from "react-select";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

const categoryFilter = [
  { label: "Select", value: 1 },
  { label: "Games", value: 2 },
  { label: "Toy", value: 3 }
];
const App1 = () => (
  <div className="app">
    <div className="container">
      <Select value="Newly Added" options={categoryFilter} />
    </div>
  </div>
);
const newlyAdded = [
  { label: "Newly Added", value: 1 },
  { label: "A - Z", value: 2 },
  { label: "Z - A", value: 3 },
  { label: "Nearest", value: 3 }
];

const App2 = () => (
  <div className="app">
    <div className="container">
      <Select value="Newly Added" options={newlyAdded} />
    </div>
  </div>
);
=======
import React, { Component } from 'react';
import PublicReviews from './public_reviews1'
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import userPictureLg from '../../images/userProfileLarge.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);
const constant = require('../../config/constant');
var moment = require('moment');
>>>>>>> d19d486e93b489c4069ca6bdaaa6a499bdc8b54f
var mainNav = {
  "@media screen and (max-width: 767px)": {
    width: "100%",
    float: "none",
    display: "block",
    boxSizing: "border-box"
  }
};

<<<<<<< HEAD
class myTreasureChest extends Component {
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      loadMore: true,
      slides: [
        {
          title: "Call of Duty : Infinate Warfare More",
          image: popularItemImg,
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Shopkins Shoppies - Bubblesiha",
          image: "https://api.androidhive.info/json/movies/2.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Leander : Cradle, Crib, High Chair, Changing",
          image: "https://api.androidhive.info/json/movies/3.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Holy Crap! This wooden rocket has some",
          image: "https://api.androidhive.info/json/movies/4.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/5.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/6.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        }
      ]
    };
  }

  render() {
    return (
      <div className="myTreasure noMargin">
        <div className="profile_header">
          <div className="container">
            <div className="pic">
              <img src={userPictureLg} />
            </div>
            <div className="details">
              <h2>Godisable Jacob</h2>
              <p className="date">Member since: 20 May 2018</p>
              <p>
                I design experience and interfaces for humans. Let&apos;s create
                something beautiful together. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <h4>26</h4>
                  <p>Products</p>
                </li>
                <li>
                  <h4>106</h4>
                  <p>Products</p>
                </li>
                <li>
                  <h4>1252</h4>
                  <p>Products</p>
                </li>
                <li>
                  <h4>4.8</h4>
                  <p>Products</p>
                </li>
              </ul>
            </div>
            <div className="cl" />
          </div>
        </div>
        <div className="container whiteBg" style={mainNav}>
          <div className="whiteLeftBg" style={mainNav}>
            <div className="heading-row">
              <h1>Tresure chest</h1>
              <div className="cl" />
            </div>
            <div className="item-listing">
              {this.state.slides
                .slice(0, this.state.limit)
                .map((slide, index) => {
                  return (
                    <div className="Items" key={index}>
                      <div className="pic">
                        <div className="overlay">
                          <a href="#" className="favourite">
                            <FontAwesomeIcon icon="heart" /> fav
                          </a>
                        </div>
                        <img src={slide.image} alt="" />
                      </div>
                      <div className="details">
                        <h4>
                          <a href="/my-trade-detail">{slide.title}</a>
                        </h4>
                        <a href="#" className="catLink">
                          {" "}
                          {slide.category}
                        </a>
                      </div>
                      <div className="userdiv">
                        <div className="user-pic">
                          {" "}
                          <FontAwesomeIcon icon="heart-o" />{" "}
                          <img src={slide.userPic} />
                        </div>
                        <div className="user-name">{slide.userName}</div>
                      </div>
                    </div>
                  );
                })}
              <div className="cl" />
            </div>
            <a className="more-items" href="javascript:void(0)">
              More products
            </a>
          </div>
          <div className="whiteRightBg" style={mainNav}>
            <PublicReviews />
          </div>
        </div>
      </div>
    );
  }
}
export default myTreasureChest;
=======
class publicProfile extends Component {
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    
    constructor(props)
    {
        super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            
            publicProfile:{},
            products:[],
            totalTrade:0,
            totalViewUser:0,
            totalRating : 0,
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                }
            ],

        };
    }
    
    componentWillMount(){
		//get user public profile data
		axios.get('user/getPublicProfile/'+this.props.match.params.id).then(result => {
			if(result.data.code === 200){
				this.setState({publicProfile:result.data.result,products:result.data.products,totalTrade:result.data.totalTrade,totalViewUser:result.data.totalViewUser,totalRating : result.data.totalRating})
			}
		})
	}

    render() {
		
        return (    
                  
                <div className="myTreasure noMargin">
                    <div className="profile_header">
                        <div className="container">
                            <div className="pic">
                               <img src={constant.BASE_IMAGE_URL+'ProfilePic/'+this.state.publicProfile.profilePic} height="100px" width="100px"/> 
                            </div>
                            <div className="details">
                                <h2>{(this.state.publicProfile)?this.state.publicProfile.firstName:'' (this.state.publicProfile)?this.state.publicProfile.lastName:''}</h2>
                                <p className="date">Member since: {moment(this.state.publicProfile.createdAt).format('LL')}</p>
                                <p>{(this.state.publicProfile)?this.state.publicProfile.profileMessage:'NA'}</p>
                            </div>
                            <div className="right">
                                <ul>
                                    <li><h4>{this.state.products.length}</h4><p>Products</p></li>
                                    <li><h4>{this.state.totalTrade}</h4><p>Trades</p></li>
                                    <li><h4>{this.state.totalViewUser}</h4><p>Total View</p></li>
                                    <li><h4>{this.state.totalRating}</h4><p>Reviews</p></li>
                                </ul>
                            </div>
                            <div className="cl"></div>
                        </div>
                    </div>
                    <div className="container whiteBg" style={mainNav}>
                    <div className="whiteLeftBg" style={mainNav}>
                        <div className="heading-row">                         
                            <h1>Tresure chest</h1>
                            <div className="cl"></div>
                        </div>
                        <div className="item-listing">
                            {this.state.products.slice(0, this.state.limit).map((slide, index) => {
                                    return(<div className="Items" key={index}>
                                        <div className="pic"><div className="overlay"><a href="#" className="favourite"><FontAwesomeIcon icon="heart" /> fav</a></div><img src={constant.BASE_IMAGE_URL+'Products/'+slide.productImages[0]} alt="" /></div>
                                        <div className="details">
                                            <h4><a href="/my-trade-detail">{slide.productName}</a></h4>
                                            <Link to={'/search-listing/'+((slide.productCategory)?slide.productCategory._id:'')} className="catLink"> {(slide.productCategory)?slide.productCategory.title:''}</Link>           
                                        </div>
                                        <div className="userdiv">
                                            <div className="user-pic"> <FontAwesomeIcon icon="heart-o" /> <img src={constant.BASE_IMAGE_URL+'ProfilePic/'+this.state.publicProfile.profilePic} /></div>
                                            <div className="user-name">{(this.state.publicProfile)?this.state.publicProfile.userName:''}</div>
                                        </div>
                                    </div>
                                            )
                            })}
                            <div className="cl"></div>
                        </div>
                       {this.state.products.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' }
                    </div>
                    <div className="whiteRightBg" style={mainNav}>
					
                    <PublicReviews userid={this.props.match.params.id}/>
					
                     </div>
                      
                     </div>
                </div>
                
                    );
    }
}
export default publicProfile;
>>>>>>> d19d486e93b489c4069ca6bdaaa6a499bdc8b54f

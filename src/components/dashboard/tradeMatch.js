import React, { Component } from 'react';
//import ReactDOM from "react-dom";
//import Style from './dashboard.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
//import popularItemImg from '../../images/popular-item1.jpg';
//import userPicture from '../../images/user-pic.png';
import axios from 'axios';
const constant = require('../../config/constant')
const commonFunction = require('../commonFunction');
class TradeMatch extends Component {      
    constructor(props)
    {
        super(props);
        this.state = {
            tradeMatches: [{
                    "title": "",
                    "image": "",
                    "category": ""
                   }
            ]
        }
    }
	 componentWillMount(){
		axios.get('/product/listProduct').then(result => {		 
		  if(result.data.code===200){	 
				this.setState({tradeMatches:(result.data.result !== null)?result.data.result:[]})
			}
		})
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
    <div className="popularItems recently-added">
        <div className="container">
        <h3> <strong>Trade Match</strong></h3>
               <Slider {...settings}>
                    {(this.state.tradeMatches.length)? this.state.tradeMatches.map((tradeMatch) => {
						let tempLatitude = ((tradeMatch.user && (tradeMatch.user.length > 0) && tradeMatch.user[0].loct && tradeMatch.user[0].loct.length > 0 && tradeMatch.user[0].loct.coordinates && (tradeMatch.user[0].loct.coordinates.length > 0))?tradeMatch.user[0].loct.coordinates[0]:localStorage.getItem("Latitude"));
						let tempLognitude = ((tradeMatch.user && (tradeMatch.user.length > 0) && tradeMatch.user[0].loct && tradeMatch.user[0].loct.length > 0 && tradeMatch.user[0].loct.coordinates && (tradeMatch.user[0].loct.coordinates.length > 0))?tradeMatch.user[0].loct.coordinates[1]:localStorage.getItem("Longitude"));
						let dist = commonFunction.distance(localStorage.getItem("Latitude"),
						 localStorage.getItem("Longitude"),
						 tempLatitude,
						 tempLognitude, constant.DISTANCE_UNIT);
						var userImage = ((tradeMatch.user && tradeMatch.user.length > 0)?tradeMatch.user[0].profilePic:'default_user@1x.png');
						let publicProfileUrl =  ((tradeMatch.user && tradeMatch.user.length > 0)?tradeMatch.user[0]._id:'');
						let categoryUrl =  ((tradeMatch.category && tradeMatch.category.length > 0)?tradeMatch.category[0]._id:'');      
							return (
							<div className="slides-div" key={tradeMatch}>
								<div key={tradeMatch}>
									<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+tradeMatch.productImages} alt="UserImg"/></div>
									<div className='details'>
										<h4><Link to={"/search-result/"+tradeMatch._id}>{tradeMatch.productName}</Link></h4>
										<Link className="catLink" to={'/search-listing/'+categoryUrl}>{(tradeMatch.category && (tradeMatch.category.length > 0))?tradeMatch.category[0].title:''}</Link>
									</div>
									  <div className="userdiv">
										<div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} alt="UserImg"/></div>
										<div className="user-name"><Link className="alink" target="_blank" to={'/public-profile/'+publicProfileUrl}>{(tradeMatch.user && tradeMatch.user.length > 0)?tradeMatch.user[0].userName:''}</Link>
										 <p className="distance">{dist} {(constant.DISTANCE_UNIT==='M')?'Miles':'Km'}</p>
										</div>										
									</div>
								</div>
							</div>
							)
                        }):'null'
                    }
                  </Slider>
                </div>
               </div>
               );
            }
        }
export default TradeMatch;

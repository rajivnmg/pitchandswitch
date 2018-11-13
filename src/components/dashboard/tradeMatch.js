import React, { Component } from 'react';
//import ReactDOM from "react-dom";
//import Style from './dashboard.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
//import popularItemImg from '../../images/popular-item1.jpg';
//import userPicture from '../../images/user-pic.png';
import axios from 'axios'

const constant = require('../../config/constant')
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
	 componentDidMount(){
		axios.get('/product/listProduct').then(result => {		 
		   this.setState({tradeMatches:result.data.result})
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
                    {this.state.tradeMatches.map(function (tradeMatch) {
						var userImage = tradeMatch.user?tradeMatch.user[0].profilePic:null;
						let publicProfileUrl =  ((tradeMatch.user)?tradeMatch.user[0]._id:'');
						let categoryUrl =  ((tradeMatch.category)?tradeMatch.category[0]._id:'');      
							return (
							<div className="slides-div" key={tradeMatch}>
								<div key={tradeMatch}>
									<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+tradeMatch.productImages} /></div>
									<div className='details'>
										<h4>{tradeMatch.productName}</h4>
										<Link className="catLink" to={'/search-listing/'+categoryUrl}>{(tradeMatch.category && (tradeMatch.category.length > 0))?tradeMatch.category[0].title:''}</Link>
									</div>
									  <div className="userdiv">
										<div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
										<div className="user-name"><Link className="alink" target="_blank" to={'/public-profile/'+publicProfileUrl}>{(tradeMatch.user)?tradeMatch.user[0].userName:''}</Link></div>
									</div>
								</div>
							</div>
							)
                        })
                    }
                  </Slider>
                </div>
               </div>
               );
            }
        }
export default TradeMatch;

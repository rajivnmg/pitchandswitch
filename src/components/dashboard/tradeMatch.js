import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './dashboard.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
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
			 console.log("Product",result);
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
							var userImage = tradeMatch.user?tradeMatch.user[0].profilePic:null
                                        return (
                                                <div className="slides-div">
                                                    <div key={tradeMatch}>
                                                        <div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+tradeMatch.productImages} /></div>
                                                        <div className='details'>
                                                            <h4>{tradeMatch.productName}</h4>
                                                            <Link className="catLink" to='/'>{(tradeMatch.category && (tradeMatch.category.length > 0))?tradeMatch.category[0].title:''}</Link>
                                                        </div>
                                                          <div className="userdiv">
                                                            <div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
                                                            <div className="user-name">{(tradeMatch.user)?tradeMatch.user[0].userName:''}</div>
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

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const constant = require("../../config/constant");
class mostTrusted extends Component {
	
   constructor(props)
    {
        super(props);
        this.state = {           
            mosttrustedUsers: [{
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "totalRating": "4.8"
                }
            ]
        };
    }
        
	componentDidMount(){
	  axios.get('/user/mostTrustedUsers').then(result => {		 
		 console.log("most",result);
			this.setState({mosttrustedUsers:result.data.result});
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
                <div className="mostTrusted">
        <h3> Most <strong>trusted users</strong> </h3>
                    <Slider {...settings}>
                        {this.state.mosttrustedUsers.map(function (slide) {
						var userImage = slide._id?slide._id.profilePic:'';
                                        return (
                                                <div className="slides-div"  key={slide}>
                                                    <div key={slide}>
                                                    <div className='pic'> <img src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage}/> </div>
                                                        <div className='details'>
                                                        <h4><a href="/my-trade-detail" >{(slide._id)?slide._id.userName:''}</a></h4>
                                                            <div className="ratingRow">{slide.totalRating}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                        })
                        }
                    </Slider>
                     
                
                </div>
                            );
            }
        }
        export default mostTrusted;

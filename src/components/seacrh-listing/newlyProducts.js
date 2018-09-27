import React, { Component } from 'react';
import ReactDOM from "react-dom";
// import Style from './dashboard.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';

class NewlyProducts extends Component {
    constructor(props)
    {
       super(props);
       this.state = {
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": "https://api.androidhive.info/json/movies/1.jpg",
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Simon Robben"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                }
            ]
        }
        ;
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
                    <Slider {...settings}>
                        {this.state.slides.map(function (slide) {
                                        return (
                                                <div className="slides-div" key={slide}>
                                                    <div>
                                                        <div className='pic'><img src={slide.image} /></div>
                                                        <div className='details'>
                                                            <h4>{slide.title}</h4>
                                                            <Link className="catLink" to='/'>{slide.category}</Link>
                                                        </div>
                                                          <div className="userdiv">
                                                            <div className="user-pic"><img src={slide.userPic} /></div>
                                                            <div className="user-name">{slide.userName}</div>
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
        export default NewlyProducts;
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';

class mostTrusted extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slides: [{
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating": "4.8"
                },
                {
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating": "4.8"
                },
                {
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating": "4.8"
                },
                {
                 "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                   "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                  "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                   "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                   "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                   "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                   "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
                },
                {
                    "userName": "Sasha Neplokhov",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "rating" : "4.8"
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
            slidesToShow: 6,
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
                        {this.state.slides.map(function (slide) {
						return (
								<div className="slides-div"  key={slide}>
									<div key={slide}>
									<div className='pic'> <img src={slide.image} /> </div>
										<div className='details'>
										<h4><a href="/my-trade-detail" >{slide.userName}</a></h4>
											<div className="ratingRow">{slide.rating}</div>
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

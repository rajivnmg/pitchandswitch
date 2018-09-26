import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './dashboard.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';

class PopularItems extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products"
                },
                {
                    "title": "Best Pregnancy &amp; Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy"
                },
                {
                    "title": "Best Pregnancy &amp; Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products"
                },
                {
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": "https://api.androidhive.info/json/movies/1.jpg",
                    "category": "Games"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products"
                },
                {
                    "title": "Best Pregnancy &amp; Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy"
                },
                {
                    "title": "Best Pregnancy &amp; Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products"
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
            slidesToScroll: 1
        };

        return (
                <div class="popularItems">
                    <h3><strong> Popular items </strong></h3>
                    <Slider {...settings}>
                        {this.state.slides.map(function (slide) {
                                        return (
                                                <div class="slides-div">
                                                    <div key={slide}>
                                                        <div className='pic'><img src={slide.image} /></div>
                                                        <div className='details'>
                                                            <h4>{slide.title}</h4>
                                                            <Link className="catLink" to='/'>{slide.category}</Link>
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
        export default PopularItems;
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import donateBanner from '../../images/small-banner.jpg';

class Donate extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            donateImg: [{
                    "donateTxt": "Disability may be present from birth or a person may acquire it at any time in life",
                    "image": donateBanner,
                },
                {
                    "donateTxt": "Disability may be present from birth or a person may acquire it at any time in life",
                    "image": donateBanner,
                },
                {
                    "donateTxt": "Disability may be present from birth or a person may acquire it at any time in life",
                    "image": donateBanner,
                }]
        };
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };

        return (
                <div className="donateContainer">
                    <div className='container'>
                        <Slider {...settings}>
                            {this.state.donateImg.map(function (donateImgs) {
								return (
									<div key={donateImgs}>
										<div className="donate-div" key={donateImgs}>
											<div className='imgDiv'><img src={donateImgs.image} /></div>
											<div className="details">
												<h4>{donateImgs.donateTxt}</h4>
												<Link to="/donated-products">Donate </Link>
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
        export default Donate;

import React, { Component } from 'react';
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';


class publicReviews extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slides: [{
                    "title": "Jacub Gomez",
                    "rating": "3",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                    "class": "star"
                },
                {
                    "title": "Azim Islam",
                    "rating": "5",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                    "class": "star"
                },
                {
                    "title": "Max Andrey",
                    "rating": "1",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                    "class": "pink"
                },
                {
                    "title": "Robert Downey Jr.",
                    "rating": "2",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
                    "class": "yellow"
                }
            ]

        }
        ;
    }

    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        
                        <div className="heading-row"><h1>Reviews</h1><div className="cl"></div></div>
                
                
                
                        <div className="review-listings">
                            {this.state.slides.map((slide, index) => {
                                            return(<div className="review" key={index}>
                                                <div className="heading">
                                                    <div className={'star ' + slide.class } >{slide.rating}</div>
                                                    <h3 className="text">{slide.title}</h3>
                                                </div>
                                                <p>{slide.description}</p>
                                            </div>)
                            })
                            }
                            <a href="javascript:void(0)" className="more-items"> Load More </a>
                        </div>
                
                    </div>
                </div>
                            );
            }
        }
export default publicReviews;
import React, { Component } from 'react';
import Style from './myTreasureChest.css';
//import popularItemImg from '../../images/popular-item1.jpg';
//import userPicture from '../../images/user-pic.png';
import axios from 'axios';
//import {Link} from 'react-router-dom';
//import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
class publicReviews extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
			limit: 5,
            loadMore: true,
            userReviews:[],
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
	
	 onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 5}));
    }
    
    componentWillMount(){
		//get user public profile data
		axios.get('user/getReviews/'+this.props.userid).then(result => {
			if(result.data.code === 200){
				this.setState({userReviews:result.data.result})
			}
		})
	}
	
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        
                        <div className="heading-row"><h1>Reviews</h1><div className="cl"></div></div>
                
						
                
                        <div className="review-listings">
                            {this.state.userReviews.slice(0, this.state.limit).map((slide, index) => {
								let rating = Math.ceil(slide.review/10);
								let ratingsClass = 'star';
								if(rating === 1){
									ratingsClass = 'pink';
								}else if(rating === 2){
									ratingsClass = 'yellow';
								}else{
									ratingsClass = 'star';
								}
                                            return(<div className="review" key={index}>
                                                <div className="heading">													
                                                    <div className={'star ' + ratingsClass } >{(slide.review/10)}</div>
                                                    <h3 className="text"><a className="alink" href={'/public-profile/'+((slide.submitUserId)?slide.submitUserId._id:'')}>{(slide.submitUserId)?slide.submitUserId.userName:''}</a></h3>
                                                </div>
                                                <p>{slide.comment}</p>
                                            </div>)
                            })
                            }
	                            {this.state.userReviews.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href={"#/"} onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' }                            
                        </div>
                
                    </div>
                </div>
                            );
            }
        }
export default publicReviews;

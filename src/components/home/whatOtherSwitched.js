import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import axios from 'axios';

class WhatOtherSwitched extends Component {
	
   constructor(props)
    {
       super(props);
       
        this.state = {
            switches: [{
                    "title": "",
                    "image": "",
                    "category": ""
                }
             
            ]
        };
    }
	
	componentDidMount(){
	 axios.get('/product/switchTodays').then(result => {		 
		 console.log("ooooooo",result);
			this.setState({switches:result.data.result});
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
			<div className="popularItems">
				<h3> What others have switched today </h3>
				 <Slider {...settings}>
					{this.state.switches.map(function (switched,index) {
					return (					
					    <div className="slides-div"  key={index}>
						<div key={index}>
						<div className="flip-container">
						<div className="flipper">
						<div className="front">
						<div className='pic'><Link to="/my-trade-detail" >ddddddddddd</Link></div>
						<div className='details'>
						
						<h4><a href="/my-trade-detail" >{switched.tradeSwitchProductId?switched.tradeSwitchProductId.productName:''}</a></h4>
						<Link className="catLink" replace to='/'>{switched.tradeSwitchProductId}</Link>
						</div>
						<div className="userdiv">
						<div className="user-pic"><img src={index.userPic} /></div>
						<div className="user-name">{index.userName}</div>
						</div>
						</div>
						<div className="back">
						<div className='pic'><Link to="/my-trade-detail" ><img src={index.backImage} /></Link></div>
						<div className='details'>
						<h4><a href="/my-trade-detail" >{switched.tradeSwitchProductId?switched.tradeSwitchProductId.productName:''}</a></h4>
						<Link className="catLink" replace to='/'>{index.backCategory}</Link>
						</div>
						<div className="userdiv">
						<div className="user-pic"><img src={index.backUserPic} /></div>
						<div className="user-name">{index.backUserName}</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						)
					  })
				   }
				</Slider>
				<Link to='/' className='more-items'>See More</Link>                
			</div>
           );
          }
        }
        export default WhatOtherSwitched;

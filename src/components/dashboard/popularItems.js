import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './dashboard.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios'
const constant = require("../../config/constant");
class PopularItems extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games"
                }
            ],
          popularItems: []
        };
    }
    
     componentDidMount(){
	 axios.get('/product/popularItems').then(result => {		 
		 console.log("popularItems",result);
			 if(result.data.code === 200){
				this.setState({popularItems:result.data.result})
			 }
		 })
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
                <div className="popularItems">
                    <h3> Pitch and switch's <span>popular Items</span> </h3>
                    <Slider {...settings}>
                        {this.state.popularItems.map(function (item) {							
							var productImage = item._id?item._id.productImages[0]:'';	
							var userImage = item._id?item._id.userId.profilePic:'';
							return (
									<div className="slides-div" key={item}>
										<div key={item}>
										<div className='pic'>
											<Link to="/my-trade-detail" >
												<img src={constant.BASE_IMAGE_URL+'Products/'+productImage} />
											</Link>
										</div>
											<div className='details'>
											<h4><a href="/my-trade-detail" >{item._id?item._id.productName:''}{}</a></h4>
												<Link className="catLink" to={'/'}>
												{item._id?item._id.productCategory?item._id.productCategory.title:'':''}</Link>
											</div>
										<div className="userdiv">
											<div className="user-pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} height="20px;" width="20px;"/></div>
											<div className="user-name">{item._id?item._id.userId?item._id.userId.userName:'':''}</div>
										</div>
										</div>
									</div>
									)
                        })
                        }
                    </Slider>
                    <Link to='/' className='more-items'>More items</Link>
                
                </div>
                            );
            }
        }
        export default PopularItems;

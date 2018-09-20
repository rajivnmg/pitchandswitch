import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';

const constant = require("../../config/constant");
class PopularItems extends Component {
  constructor(props)
    {
       super(props);
        this.state = {
            popularItems: []
        }
       ;
    }
    
    componentDidMount(){
	 axios.get('/product/popularItems').then(result => {		 
		 console.log("popularItems",result);
			 if(result.data.code === 200){
				this.setState({popularItems:result.data.result})
			 }
		 })
     }
    
    //~ constructor(props)
    //~ {
        //~ super(props);
        //~ this.state = {
            //~ slides: [{
                    //~ "title": "Call of Duty : Infinate Warfare More",
                    //~ "image": popularItemImg,
                    //~ "category": "Games"
                //~ },
                //~ {
                    //~ "title": "Shopkins Shoppies - Bubblesiha",
                    //~ "image": "https://api.androidhive.info/json/movies/2.jpg",
                    //~ "category": "Toy"
                //~ },
                //~ {
                    //~ "title": "Leander : Cradle, Crib, High Chair, Changing",
                    //~ "image": "https://api.androidhive.info/json/movies/3.jpg",
                    //~ "category": "Baby Products"
                //~ },
                //~ {
                    //~ "title": "Holy Crap! This wooden rocket has some",
                    //~ "image": "https://api.androidhive.info/json/movies/4.jpg",
                    //~ "category": "Baby Products"
                //~ },
                //~ {
                    //~ "title": "Best Pregnancy &amp; Baby Products for babies",
                    //~ "image": "https://api.androidhive.info/json/movies/5.jpg",
                    //~ "category": "Toy"
                //~ },
                //~ {
                    //~ "title": "Best Pregnancy &amp; Baby Products for babies",
                    //~ "image": "https://api.androidhive.info/json/movies/6.jpg",
                    //~ "category": "Baby Products"
                //~ },
                //~ {
                    //~ "title": "Call of Duty : Infinate Warfare More",
                    //~ "image": "https://api.androidhive.info/json/movies/1.jpg",
                    //~ "category": "Games"
                //~ },
                //~ {
                    //~ "title": "Shopkins Shoppies - Bubblesiha",
                    //~ "image": "https://api.androidhive.info/json/movies/2.jpg",
                    //~ "category": "Toy"
                //~ },
                //~ {
                    //~ "title": "Leander : Cradle, Crib, High Chair, Changing",
                    //~ "image": "https://api.androidhive.info/json/movies/3.jpg",
                    //~ "category": "Baby Products"
                //~ },
                //~ {
                    //~ "title": "Holy Crap! This wooden rocket has some",
                    //~ "image": "https://api.androidhive.info/json/movies/4.jpg",
                    //~ "category": "Baby Products"
                //~ },
                //~ {
                    //~ "title": "Best Pregnancy &amp; Baby Products for babies",
                    //~ "image": "https://api.androidhive.info/json/movies/5.jpg",
                    //~ "category": "Toy"
                //~ },
                //~ {
                    //~ "title": "Best Pregnancy &amp; Baby Products for babies",
                    //~ "image": "https://api.androidhive.info/json/movies/6.jpg",
                    //~ "category": "Baby Products"
                //~ }
            //~ ]
        //~ }
        //~ ;
    //~ }
    
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
												<img src={constant.BASE_ADMIN_URL+'assets/uploads/Products/'+productImage} />
											</Link>
										</div>
											<div className='details'>
											<h4><a href="/my-trade-detail" >{item._id?item._id.productName:''}{}</a></h4>
												<Link className="catLink" to={'/'}>
												{item._id?item._id.productCategory?item._id.productCategory.title:'':''}</Link>
											</div>
										<div className="userdiv">
											<div className="user-pic"><img src={constant.BASE_ADMIN_URL+'assets/uploads/ProfilePic/'+userImage} height="20px;" width="20px;"/></div>
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

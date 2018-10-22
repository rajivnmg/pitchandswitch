import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import axios from 'axios';
import moreIcon from '../../images/more-icon.png'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import popularItemImg from '../../images/popular-item1.jpg';
const constant = require("../../config/constant");

class PopularItems extends Component {
  constructor(props)
    {
       super(props);
        this.state = {
            popularItems: [],
            morePopularItem:[{				
                    "title": "More products you may be intrested",
                    "image":  moreIcon,
                    "category": "",
                    "userPic" : "",
                    "userName" : "",
                    "className" : "moreItem"
                
				}]
        }
       ;
       console.log("STATE ",this.state, this.props)
    }
    
    componentWillMount(){
			console.log("isLoggedIn'",localStorage.getItem('isLoggedIn'))
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
							var productUrl = (localStorage.getItem('isLoggedIn') == 1)?'/my-trade-detail/'+item._id._id:'/search-result/'+item._id._id					
							
							return (
									<div className="slides-div" key={item}>
										<div key={item}>
										<div className='pic'>
											<Link to={productUrl} >
												<img className="popularItemImg" src={constant.BASE_IMAGE_URL+'Products/'+productImage} />
											</Link>
										</div>
											<div className='details'>
											<h4><a href={productUrl} >{item._id?item._id.productName:''}{}</a></h4>
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
                        <If condition={this.state.popularItems.length > 10}>
							<Then>                         
                        {this.state.morePopularItem.map(function (slide) {
                                        return (
                                                <div className={"slides-div " + slide.className } key={slide}>
                                                    <div key={slide}>
                                                    <div className='pic'><Link to="/my-trade-detail" ><img src={slide.image} /></Link></div>
                                                        <div className='details'>
                                                        <h4><a href="/my-trade-detail" >{slide.title}</a></h4>
                                                            <span className="catLink" >{slide.category}</span>
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
                        </Then>
                      </If>
                    </Slider>
                   {/* <Link to='/' className='more-items'>More items</Link> */}
                
                </div>
                            );
            }
        }
        export default PopularItems;

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const constant = require("../../config/constant");
class NewlyProducts extends Component {
   constructor(props)
    {
        super(props);
        this.state = {
            newlyProducts: [{
                    "title": "",
                    "image": "",
                    "category": ""
                }
            ]
        };
    }

   componentDidMount(){
	 axios.get('/product/listProduct').then(result => {		 
		 console.log("Product",result)		 ;
			this.setState({newlyProducts:result.data.result})
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
        <div className="popularItems newlyProducts">
           <div className="container">
               <h3> Newly added products</h3>
                    <Slider {...settings}>
                        {this.state.newlyProducts.map(function (newlyProduct,index) {
							
							var userImage = newlyProduct.user?newlyProduct.user[0].profilePic:null
							var productUrl = (localStorage.getItem('isLoggedIn') == 1)?'/my-trade-detail/'+newlyProduct._id:'/search-result/'+newlyProduct._id
						return (
							<div className="slides-div" key={index}>
								<div key={newlyProduct}>
								<div className='pic'><Link to={productUrl} ><img src={constant.BASE_IMAGE_URL+'Products/'+newlyProduct.productImages} /></Link></div>
									<div className='details'>
									<h4><a href={productUrl}>{newlyProduct.productName}</a></h4>
										<Link className="catLink" to='/'>{(newlyProduct.category && (newlyProduct.category.length > 0))?newlyProduct.category[0].title:''}</Link>
									</div>
									  <div className="userdiv">
										<div className="user-pic"><img className="userPicNew"src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
										<div className="user-name">{(newlyProduct.user)?newlyProduct.user[0].userName:''}</div>
									</div>
								</div>
							</div>
							)
                          })
                        }
                    </Slider>
                    <Link to='/' className='more-items'>More items</Link>
                    </div>
                </div>
              );
           }
        }
        export default NewlyProducts;

import React, { Component } from 'react';
//import ReactDOM from "react-dom";
import Style from './home.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { Link } from 'react-router-dom';
//import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios';
//import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import * as cmf from "../commonFunction";
const constant = require("../../config/constant");

class NewlyProducts extends Component {
   constructor(props)
    {
        super(props);
        this.state = {
            newlyProducts: []
        };
    }

   componentWillMount(){
	 axios.get('/product/allActiveProduct').then(result => {		 
			if(result.data.code === 200){
				this.setState({newlyProducts:(result.data.result !== null)?result.data.result:[]})
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
        <div className="popularItems newlyProducts">
           <div className="container">
               <h3> Newly added products</h3>
                    <Slider {...settings}>
                    
                        {(this.state.newlyProducts.length)?this.state.newlyProducts.map(function (newlyProduct,index) {							
							var userImage = ((newlyProduct.user && (newlyProduct.user.length > 0))?newlyProduct.user[0].profilePic:null)
							var userIds =((newlyProduct.user && (newlyProduct.user.length > 0))?newlyProduct.user[0]._id:'0');
							var productUrl = (localStorage.getItem('isLoggedIn') === 1 && localStorage.getItem('userId') === userIds)?'/my-trade-detail/'+newlyProduct._id:'/search-result/'+newlyProduct._id
						return (
							<div className="slides-div" key={index}>
								<div key={newlyProduct}>
								<div className='pic'><Link to={productUrl} ><img src={constant.BASE_IMAGE_URL+'Products/'+newlyProduct.productImages} alt={"Product Thumb"}/></Link></div>
									<div className='details'>
									<h4><a href={productUrl}>{newlyProduct.productName}</a></h4>
										<Link className="catLink" to={'/search-listing/'+newlyProduct.productCategory}>{(newlyProduct.category && (newlyProduct.category.length > 0))?cmf.SubSTR(newlyProduct.category[0].title):''}</Link>
									</div>
									  <div className="userdiv">
										<div className="user-pic"><img className="userPicNew"src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} alt={"User Thumb"}/></div>
										<div className="user-name">
										<Link className="alink" target="_blank" to={'/public-profile/'+((newlyProduct.user && (newlyProduct.user.length > 0))?newlyProduct.user[0]._id:'')}>
											{(newlyProduct.user  && (newlyProduct.user.length > 0))?cmf.letterCaps(newlyProduct.user[0].userName):''}
										</Link>
										</div>
									</div>
								</div>
							</div>
							)
                          }):null
                        }
					
                    </Slider>
                   {/* <Link to='/' className='more-items'>More items</Link> */}
                    </div>
                </div>
              );
           }
        }
        export default NewlyProducts;

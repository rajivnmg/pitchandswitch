import React, { Component } from 'react';
//import ReactDOM from "react-dom";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
//import popularItemImg from '../../images/popular-item1.jpg';
//import userPicture from '../../images/user-pic.png';
import axios from 'axios'
const constant = require('../../config/constant')

class RelatedProducts extends Component {
    constructor(props)
     {
       super(props);
         this.state = {
			productID:this.props.productID,
            relatedProduct: [{
				"title": "",
				"image": "",
				"category": "",
				"userPic":"",
				"userName":""
             }
          ]
        };
      }
     //components didMount function call just after rendering the page       
     componentDidMount(){
		 axios.get('/product/relatedCategoryProduct/'+this.props.productID).then(result => {	
			this.setState({relatedProduct:result.data.result})		
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
        <div className="popularItems recently-added">
          <div className="container">
			<Slider {...settings}>
				{   this.state.relatedProduct.map(function (products) {
					//var productIDS = products?products._id:'';
					var userImage = products.userId?products.userId.profilePic:"";					
					return (
						<div className="slides-div" key={products}>
						<div key={products}>
						<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+products.productImages} alt={"Product Thumb"}/></div>
						<div className='details'>
						<h4><a href={'/search-result/'+(products?products._id:'')}>{products?products.productName:''}</a></h4>
							<Link className="catLink" to={'/search-listing/'+(products.productCategory?products.productCategory._id:'')}>{products.productCategory?products.productCategory.title:''}</Link>
						</div>
						<div className="userdiv">
							<div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} alt={"User Thumb"} /></div>
							<div className="user-name"><Link className="alink" to={"/public-profile/"+((products.userId)?products.userId._id:'')}>{(products.userId)?products.userId.firstName:""}</Link></div>
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
export default RelatedProducts;

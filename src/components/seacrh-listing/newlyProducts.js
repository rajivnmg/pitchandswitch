import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import axios from 'axios'
const constant = require('../../config/constant')

class NewlyProducts extends Component {
    constructor(props)
     {
       super(props);
         this.state = {
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
      
     componentDidMount(){
		 axios.get('/product/relatedCategoryProduct/'+this.props.productID).then(result => {	
			this.setState({relatedProduct:result.data.result})
			console.log('pppppppppppppr',this.state.relatedProduct)
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
					var userImage = products.userId?products.userId.profilePic:"";
					console.log('products')
					return (
					<div className="slides-div" key={products}>
					<div key={products}>
					<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+products.productImages} /></div>
					<div className='details'>
					<h4>{products.productName}</h4>
					<Link className="catLink" to='/'>{products.productCategory?products.productCategory.title:''}</Link>
					</div>
					<div className="userdiv">
					<div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
					<div className="user-name">{(products.userId)?products.userId.firstName:""}</div>
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
        export default NewlyProducts;

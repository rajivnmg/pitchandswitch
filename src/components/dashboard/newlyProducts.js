import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './dashboard.css';
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css"; 
//import "~slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios';
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
        }
        
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
            slidesToScroll: 1
        };


        return (
        <div className="popularItems recently-added">
        <div className="container">
        <h3> <strong>Recently added</strong></h3>
			<Slider {...settings}>
			{this.state.newlyProducts.map(function (newlyProduct,index) {
			return (
			<div className="slides-div" key={index}>
			<div key={newlyProduct}>
			<div className='pic'><img src={'http://localhost:3006/assets/uploads/Products/'+newlyProduct.productImages} /></div>
			<div className='details'>
			<h4>{newlyProduct.productName}</h4>
			<Link className="catLink" to='/'>{(newlyProduct.category && (newlyProduct.category.length > 0))?newlyProduct.category[0].title:''}</Link>

			</div>
			</div>
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

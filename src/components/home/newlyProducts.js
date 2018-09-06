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
        ;
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
					return (
						<div className="slides-div" key={index}>
						<div key={newlyProduct}>
							<div className='pic'><Link to="/my-trade-detail" ><img src={'http://localhost:3006/assets/uploads/Products/'+newlyProduct.productImages}/></Link></div>
							<div className='details'>
							<h4><a href="/my-trade-detail">{newlyProduct.productName}</a></h4>					
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

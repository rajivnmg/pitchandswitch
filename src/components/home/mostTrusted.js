import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Style from './home.css';
import Slider from "react-slick";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class mostTrusted extends Component {
	
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
	  axios.get('/user/mostTrusted').then(result => {		 
		 console.log("most",result);
			this.setState({mosttrustedUsers:result.data.result});
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

        return (<div className="mostTrusted">
        <h3> Most <strong>trusted users</strong> </h3>
              
                </div>
               );
            }
        }
        export default mostTrusted;

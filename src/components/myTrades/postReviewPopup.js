import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import starRating from '../../images/star-rating.png'
import ReactStars from 'react-stars'
import axios from 'axios';

import {
  Badge,
  Button,
  ButtonDropdown,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input
} from 'reactstrap';
var FD = require('form-data');
var fs = require('fs');

const contentStyle = {
    maxWidth: "660px",
    width: "90%"
};
class ShippingTypePopup extends Component {
	constructor(props) {
	super(props);
	this.state = {				
		productID:this.props.productID,
		offerTrade:this.props.offerTrade,
		validation:{
        reviews: {
          rules: {
            notEmpty: {
              message: 'Reviews name can\'t be left blank',
              valid: false

            }
          },
          valid: null,
          message: ''
        },
        rating:{
          rules: {
            notEmpty: {
              message: 'Please fill reting',
              valid: false
            }
          },
          valid: null,
          message: ''
        },
      }
	}	
	
  } 
   ratingChanged = (review) => {       	  
       this.setState({review: review});
   }
  
  submitHandler(e){
	  console.log('r',this.state.review);
	  console.log('vbf',this.reviewsComments.value);
   //~ e.preventDefault();
      //~ let formSubmitFlag = true;
      //~ for(let field in this.state.validation){
        //~ let lastValidFieldFlag = true;
        //~ let addReview = this.state.validation;
        //~ addReview[field].valid = null;
        //~ for(let fieldCheck in this.state.validation[field].rules){
          //~ switch(fieldCheck){
            //~ case 'notEmpty':
              //~ break;
          //~ }
        //~ }
        //~ this.setState({ validation: addReview});
    //~ } 
    //~ 
     //~ if(formSubmitFlag){
		//~ const data = new FD();
		//~ data.append('productName', this.reviews.value);
		//~ data.append('description', this.rating.value);
        //~ axios.post('/trade/submitReview', data).then(result => {			
		  //~ console.log('result',result);
          //~ if(result.data.code === 200){
            //~ this.props.history.push("/donations");
          //~ }
        //~ });     
     //~ }
  }

render() {
let boxClass = ["active"];
    if(this.state.addClass) {
        boxClass.push('active');
    }
return(

<Popup
    trigger={ < a className = 'TradeInfobtn' > Post Review < /a>}
modal contentStyle = { contentStyle} lockScroll >
    {
close => (
	<div className="modal">
		<a className="close" onClick={close}>
			&times;
		</a>
		<div className="header">Post review
			<div className="cl"></div>
		</div>
		<div className="content">
			<div className="return-request-form">
			
				<div className="form-row"> 
					<label className="label">Write review</label>
					<textarea className="form-control textarea" name="reviewsComments" placeholder=" "></textarea>
				</div>
				<div className="form-row">
				  <ReactStars count={5} value={this.state.review} name="rating" onChange={this.ratingChanged} size={27} color2={'#dcb73f'}  />
				</div>
				 <div className="form-row">
				   <input  onClick={(e)=>this.submitHandler(e)} className="" value="Submit" type="submit" />
				</div>
			  
			</div> 
		  
		</div>
	</div>
	)
   } 
 </Popup>
)}
}

export default ShippingTypePopup;

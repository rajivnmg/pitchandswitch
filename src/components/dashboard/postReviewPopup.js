import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import starRating from '../../images/star-rating.png'
import ReactStars from 'react-stars'
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import successPic from '../../images/successful_img.png';

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
class postReviewPopup extends Component {
	constructor(props) {
	super(props);
	this.state = {
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
   commentsChanged = (comments) => { 
       this.setState({comments: comments.target.value});
   }
  
  submitHandler(e){	  
      e.preventDefault();
      let formSubmitFlag = true;
      for(let field in this.state.validation){
        let lastValidFieldFlag = true;
        let addReview = this.state.validation;
        addReview[field].valid = null;
        for(let fieldCheck in this.state.validation[field].rules){
          switch(fieldCheck){
            case 'notEmpty':
              break;
          }
        }
        this.setState({ validation: addReview});
    } 
    
     if(formSubmitFlag){
		const data = new FD();
		data.append('comment', this.state.comments);
		data.append('review', this.state.review);
		data.append('submitUserId', this.state.offerTrade.offerTradeId.SwitchUserId._id);
		data.append('userId', this.state.offerTrade.offerTradeId.pitchUserId._id);
		data.append('tradeId', this.state.offerTrade._id);
        axios.post('/trade/submitReview', data).then(result => {			
		  console.log('result',result.data.result);
          if(result.data.code === 200){
              this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			   setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});			
				window.location.href='/dashboard';
			 }, 12000);	
          }
        });     
     }
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
		 <If condition={this.state.showFormSuccess === true}>
			<Then>
				<div className="modal pitchSuccessful">
					<a className="close" onClick={close}>
					&times;
					</a>
					<div className="header centerheading"><span>Reviwed</span> Successful<div className="cl"></div></div>
					<p className="textSuccessful">
					  <span classNamne="gray">Your reviewed has been successfully submitted.</span>
					</p>
					<div class="successIcon">
						<img src={successPic} alt="" />
					</div>
				</div>
			  </Then>	
		<Else>  
		<div className="header">Post review
			<div className="cl"></div>
		</div>
		<div className="content">
			<div className="return-request-form">			
				<div className="form-row"> 
					<label className="label">Write review</label>
					<textarea className="form-control textarea" onChange={this.commentsChanged} name="reviewsComments" placeholder=" "></textarea>
				</div>
				<div className="form-row">
				  <ReactStars count={5} value={this.state.review} name="rating" onChange={this.ratingChanged} size={27} color2={'#dcb73f'}  />
				</div>
				 <div className="form-row">
				   <input onClick={(e)=>this.submitHandler(e)} className="" value="Submit" type="submit" />
				</div>
			</div> 
		</div>
		</Else>
		</If>
	</div>
	)
   } 
 </Popup>
)}
}

export default postReviewPopup;

import React, { Component } from "react";
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
//import starRating from "../../images/star-rating.png";
import ReactStars from "react-stars";
import axios from "axios";
import { If, Then, Else ,ElseIf} from "react-if-elseif-else-render";
import successPic from "../../images/successful_img.png";
//import $ from 'jquery';
//import { Badge, Button, ButtonDropdown, Form, FormGroup, FormText, FormFeedback, Input} from "reactstrap";
var FD = require("form-data");
//var fs = require("fs");

const contentStyle = {
  maxWidth: "660px",
  width: "90%"
};
class postReviewPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  reviewed : {},
      offerTrade: this.props.offerTrade,
      validation: {
        reviews: {
          rules: {
            notEmpty: {
              message: "Reviews name can't be left blank",
              valid: false
            }
          },
          valid: null,
          message: ""
        },
        rating: {
          rules: {
            notEmpty: {
              message: "Please fill reting",
              valid: false
            }
          },
          valid: null,
          message: ""
        }
      }
    };
  }	
  componentDidMount(){
	  axios.get('trade/getReview/'+this.props.offerTrade._id).then(result =>{
			if(result.data.code === 200){
				this.setState({reviewed:(result.data.result && result.data.result.length > 0 )?result.data.result[0]:[]})
			}
	  })
  }

  ratingChanged = review => {
    this.setState({ review: review });
  };
  commentsChanged = comments => {
    this.setState({ comments: comments.target.value });
  };

  submitHandler(e) {
    e.preventDefault();
    let formSubmitFlag = false;
    //~ for (let field in this.state.validation) {
      //~ //let lastValidFieldFlag = true;
      //~ let addReview = this.state.validation;
      //~ addReview[field].valid = null;
      //~ for (let fieldCheck in this.state.validation[field].rules) {
        //~ switch (fieldCheck) {
          //~ case "notEmpty":
            //~ break;
          //~ default:
			//~ break;
        //~ }
      //~ }
      //~ this.setState({ validation: addReview });
    //~ }
    //console.log("this.state.comments",formSubmitFlag,this.state.comments,this.state.review)
    if(this.state.comments ===null || this.state.comments ==='' || this.state.comments === undefined){
		alert("Please write comment for this trade");
	}else if(this.state.review === null || this.state.review ==='' || this.state.review === undefined){
		alert("Please rate this trade");
	}else{
		formSubmitFlag = true;
	}
	  console.log("formSubmitFlag",formSubmitFlag,this.state.comments,this.state.review)

    if (formSubmitFlag) {
      const data = new FD();
      data.append("comment", this.state.comments);
      data.append("review", this.state.review);
      data.append(
        "submitUserId",
        this.state.offerTrade.offerTradeId.SwitchUserId._id
      );
      data.append("userId", this.state.offerTrade.offerTradeId.pitchUserId._id);
      data.append("tradeId", this.state.offerTrade._id);
     
      axios.post("/trade/submitReview", data).then(result => {       
        if (result.data.code === 200) {
          this.setState({
            message: result.data.message,
            code: result.data.code,
            showFormSuccess: true,
            showFormError: false,
            isProcess: false
          });
          setTimeout(() => {
            this.setState({ showFormError: false, showFormSuccess: false });           
             window.location.href='/my-trades';
            //this.props.history.push("/my-trades");
          }, 3000);
        }
      });
    }
  }

  render() {
    let boxClass = ["active"];
    if (this.state.addClass) {
      boxClass.push("active");
    }
    return (
      <Popup
        trigger={<a className="TradeInfobtn"> Post Review </a>}
        modal
        contentStyle={contentStyle}
        lockScroll
      >
        {close => (
          <div className="modal">{this.state.reviewed.length}
            <a className="close"  onClick={close}>
              &times;
            </a>
            <If condition={this.state.showFormSuccess === true}>
              <Then>
                <div className="modal pitchSuccessful">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header centerheading">
                    <span>Reviwed</span> Successful<div className="cl" />
                  </div>
                  <p className="textSuccessful">
                    <span classNamne="gray">
                      Your reviewed has been successfully submitted.
                    </span>
                  </p>
                  <div class="successIcon">
                    <img src={successPic} alt="" />
                  </div>
                </div>
              </Then>
              <ElseIf condition={this.state.reviewed && this.state.reviewed._id}>
               <div className="header">
                  Post review
                  <div className="cl" />
                </div>               
               <div className="content">
                  <div className="return-request-form">
                    <div className="form-row">
                      <label className="label">Your review</label>
                      <textarea
						 className="form-control textarea"                      
                        value={this.state.reviewed.comment}
                      />
                    </div>
                    <div className="form-row">
                      <ReactStars
                        count={5}
                        value={(this.state.reviewed.review)/10}
                        name="rating"
                        onChange={this.ratingChanged}
                        size={27}
                        color2={"#dcb73f"}
                      />
                    </div>                    
                  </div>
                </div>
              </ElseIf>
              <Else>
                <div className="header">
                  Post review
                  <div className="cl" />
                </div>
                <div className="content">
                  <div className="return-request-form">
                    <div className="form-row">
                      <label className="label">Write review</label>
                      <textarea
                        className="form-control textarea"
                        onChange={this.commentsChanged}
                        name="reviewsComments"
                        placeholder=" "
                      />
                    </div>
                    <div className="form-row">
                      <ReactStars
                        count={5}
                        value={this.state.review}
                        name="rating"
                        onChange={this.ratingChanged}
                        size={27}
                        color2={"#dcb73f"}
                      />
                    </div>
                    <div className="form-row">
                      <input
                        onClick={e => this.submitHandler(e)}
                        className=""
                        value="Submit"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </Else>
            </If>
          </div>
        )}
      </Popup>
    );
  }
}

export default postReviewPopup;

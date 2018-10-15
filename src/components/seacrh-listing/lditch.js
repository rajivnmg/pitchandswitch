import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg';
import offerProduct1 from '../../images/offer-product-img1.jpg';
import offerProduct3 from '../../images/offer-product-img3.jpg';
import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const constant = require('../../config/constant')
const contentStyle = {
maxWidth: "900px",
width: "90%"
};


class viewPitchPopup extends Component {
constructor(props) {
  super(props);
	this.state = {				
		offerTrade:this.props.offerTrade,
		offerTradeProducts:[],
		checkedBoxes :[],
		optionsChecked: [],
	 }				
}  


 
changeEvent(event) {
  let checkedArray = this.state.optionsChecked;	
	let selectedValue = event.target.value;	
	   if(event.target.checked === true) {	
		 if((this.state.optionsChecked.length)<2){
			 this.setState({ disabled: false }); 
		     checkedArray.push(selectedValue);
	         this.setState({
			   optionsChecked: checkedArray
		     });
	     } else {
			 this.setState({ disabled: true });  
		 } 
	 }
	 else {
		let valueIndex = checkedArray.indexOf(selectedValue);
		checkedArray.splice(valueIndex, 1);
		this.setState({	optionsChecked: checkedArray });
		this.setState({ disabled: false }); 
	}
	 axios.post('/trade/submitPitchProduct/').then(result => {
	  if(result.data.code === 200){
		this.setState({getAllProduct:result.data.result})				
	  }
   })
}

	handleOnChange = (chosenValue) => {
	 console.log('chosenValue',chosenValue.target.value)
	   this.setState({ categoriesValues: chosenValue.target.value})
		 axios.get('/trade/getProductByCategory/'+chosenValue.target.value).then(result => {
		   if(result.data.code === 200){
			  this.setState({getAllProduct:result.data.result})	
			     console.log('getAllProduct',this.state.getAllProduct);
			}
		})
	} 


componentWillMount(){
    this.setState({offerTradeId:this.props.offerTrade._id})
    axios.get('/trade/getAllProduct/').then(result => {
	  if(result.data.code === 200){
		this.setState({getAllProduct:result.data.result})				
	}
})
axios.get('/category/categoriesActive/').then(result => {
	if(result.data.code === 200){
	  this.setState({categoryActive:result.data.result})				
   }
 })	
}

componentDidMount(){
	axios.get('/trade/offerTradeProduct/'+this.props.offerTrade._id).then(result => {
		if(result.data.code === 200){
		  this.setState({offerTradeProducts:result.data.result})
	   }
	})	
}

render() {
let optionTemplate;
 if(this.state.categoryActive){
  let conditionsList = this.state.categoryActive;
	 console.log('conditionsList',conditionsList)
	 optionTemplate = conditionsList.map(v => (<option key={v._id} value={v._id}>{v.title}</option>));
   }
let img = this.props.offerTrade.userId?this.props.offerTrade.userId.profilePic:"";
let productImg = 
this.props.offerTrade.productImages?this.props.offerTrade.productImages[0]:"";
return (
<Popup trigger={<a href='#' className= 'ditch'>Pitch Now</a>}
modal
contentStyle = {contentStyle}  lockScroll >
{ close => (
 <div className="modal">
<a className="close" onClick={close}>
	&times;
</a>
<form className="pure-form pure-form-stacked" onChange={this.onChange}>
	<div className="header">Choose products to <span className="yellow">Pitch</span> on 
	<div className="select-box top-right">
		 <select id="select" innerRef={input => (this.condition = input)} className="form-control" onChange={this.handleOnChange}>
			{optionTemplate}
		</select>
	</div>
	<div className="cl"></div>
	</div>
		<div className="content">
		<div className="received-product">
			<div className="received-product-box">
				<div className="received-product-image-box">
				<img src={constant.BASE_IMAGE_URL+'Products/'+productImg} alt="recieved-product image" />
				</div>
				<div className="received-product-content-box">
					<span>Product ID: <strong>{this.props.offerTrade._id}</strong></span>
					<h4>{this.props.offerTrade.productName}</h4>
					  <a className="catLink" href="/">{this.props.offerTrade.description}</a>
						<div className="ratingRow">
						<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" /></div>
						<p>{this.props.offerTrade.description}</p>
						<div className="rated">4</div>
						<div className="cl"></div>
					</div> 
				</div>
			</div>
			<div className="cl"></div>
			  <div className="switch-product-section choose-product-div border-top">
				<Scrollbars className="Scrollsdiv" style={{height: 585 }}>
				 <If condition={this.state.getAllProduct.length > 0}>
				   <Then>
					{ this.state.getAllProduct.map((productsListing, index) => {								
						var count = index+1;
						var productImages = (productsListing.productImages)?(productsListing.productImages[0]):'';
						return(
						<div className="switch-product-box selected">
							<div className="switch-product-image-box">
								<img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product image" />
								<div className="switch-option-mask">
								<div className="check-box">
								<input name="Apple" value={productsListing._id}  id={"pitch"+count} type="checkbox" name="productIDS" value={productsListing._id} onChange={this.changeEvent.bind(this)}  disabled={this.state.disabled}/>
								 <label htmlFor={"pitch"+count}>&nbsp;</label>
							   </div>
							 </div>
						</div>
						<div className="switch-product-content-box">
							  <h4>{productsListing.productName?productsListing.productName:""}</h4>
							   <a className="catLink" href="/">{productsListing.productCategory?productsListing.productCategory.title:""}</a>
							</div>
						</div>
						  )
						})
					  }					  
				</Then>							
				<Else>
				   <p>No Data Available</p>
				</Else>
				</If>
				 </Scrollbars>
				  <div className="btm-btns">
				   <a className="more-items" href="#">Pitch Now</a>
			   <a className="ditch cancel-ditch"> Cancel Pitch </a>
			 </div>
			</div>
		</div>
	</div>
 </form>
</div>
)}
</Popup>
)}
}

export default viewPitchPopup;
//export default Warper(CustomModal);

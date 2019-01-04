import React, { Component } from 'react';
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
//import rcvProduct from '../../images/rcv-product-img.jpg';
//import offerProduct1 from '../../images/offer-product-img1.jpg';
//import offerProduct3 from '../../images/offer-product-img3.jpg';
//import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';
import successPic from '../../images/successful_img.png';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { /*BrowserRouter as Router, Switch,*/ Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { If, Then, Else } from 'react-if-elseif-else-render';
var FD = require('form-data');
//var fs = require('fs');
const constant = require('../../config/constant')
//const modalStyle = {  maxWidth: "460px",  width: "90%"};  
const contentStyle = { maxWidth: "900px", width: "90%" };


class PitchAgainPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
		 offerTrade:this.props.offerTrade,
			proID:this.props.offerTrade.SwitchUserProductId._id,
			offerTradeProducts:[],
			productData:[],
			checkedBoxes :[],
			stateChange:[],
			optionsChecked: []
		}			
	 }  
	 
	 
	 handleFormInputChange(e) {
	    var stateChange = []
		var el = e.target.value
		var name = el.name
		//var type = el.type
		var selectedOptions = []			
		 if(el.checked){
			selectedOptions.push(el)
		  }			   
			var checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : [])
			if (el.checked) {
			  checkedBoxes.push(el.value)
			}
			else {
			  checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1)
			}
		stateChange[name] = checkedBoxes
		this.setState({stateChange:stateChange})
     }
	 
	 handleOnChange = (chosenValue) => {
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
	

changeEvent(event){
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
			 checkedArray.push(selectedValue);
			 this.setState({ disabled: true });  
		 } 
	 }
	 else {		
		this.setState({	optionsChecked: checkedArray });
		this.setState({ disabled: false }); 
	}
}

   submitHandler(e){
	    const data = new FD();
        data.append('productIDS', this.state.optionsChecked)
        data.append('offerTradeId', this.state.offerTrade._id)
	    axios.post('/trade/submitPitchAgain/',data).then(result => {
		console.log('result',result)		  
		  if(result.data.code === 200){			  			
			 this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			   setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});			
				window.location.href='/my-trades';
			 }, 5000);	
		  }
      })  
   }

	  handleOnChange = (chosenValue) => {	 
		   this.setState({ categoriesValues: chosenValue.target.value})
			 axios.get('/trade/getProductByCategory/'+chosenValue.target.value).then(result => {
			   if(result.data.code === 200){
				  this.setState({getAllProduct:result.data.result})	
					 console.log('getAllProduct',this.state.getAllProduct);
				}
			})
		} 
	
	  componentDidMount(){
		axios.get('/trade/offerTradeProduct/'+this.props.offerTrade.SwitchUserProductId._id).then(result => {
			console.log('result',result);
			if(result.data.code === 200){			
			  this.setState({offerTradeProducts:result.data.result})
		   }		  
		})
		
		axios.get('/product/viewProduct/'+this.props.offerTrade.SwitchUserProductId._id).then(result => {
			if(result.data.code === 200){
			  this.setState({productData:result.data.result})
		   }		  
		})
				
		axios.get('/trade/switchedProduct/'+this.state.offerTrade._id).then(switchedResult => {	
			if(switchedResult.data.code === 200){
			   this.setState({switchedProducts:switchedResult.data.result});				
			   console.log('switchedProducts',this.state.switchedProducts);
			}
			
			var switchedProductsDATA = [];
			for(var count = 0; count<this.state.switchedProducts.length; count++){
				const proIDS = this.state.switchedProducts?this.state.switchedProducts[count].products:"";
			    switchedProductsDATA.push(proIDS); 	
			}
			 var switchedProductsIDS = [];
			  for (var counter=0; counter < this.state.switchedProducts.length; counter++){
			     for (var counters=0; counters < switchedProductsDATA[counter].length; counters++){
				   console.log('this.state.switchedProductsDATA[counters]',switchedProductsDATA[counter][counters]._id)
					   switchedProductsIDS.push(switchedProductsDATA[counter][counters]._id);
				   }
			  }
			this.setState({switchedProductsID:switchedProductsIDS});
		 })
	  }
       
render() {
  let optionTemplate;
  if(this.state.categoryActive){
  let conditionsList = this.state.categoryActive;	  
	  optionTemplate = conditionsList.map(v => (<option key={v._id} value={v._id}>{v.title}</option>));
   }
  let img = this.state.productData.userId?this.state.productData.userId.profilePic:"";
  let productImg = 
  this.state.productData.productImages?this.state.productData.productImages[0]:"";
  
  return(
	<Popup
    trigger={<a className= 'ditch'>Last Pitch </a>}
    modal
    contentStyle = {contentStyle}
    lockScroll >
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
					<div className="header centerheading"><span>Pitch Again 
					</span> Successfully<div className="cl"></div></div>
					<p className="textSuccessful"><span classNamne="gray">You have successfully pitched Again to same Product.</span>
						{this.props.offerTrade.productName} ~ {this.props.offerTrade.productCategory?this.props.offerTrade.productCategory.description:""} 
					</p>
					<div class="successIcon">
						<img src={successPic} alt="" />
					</div>
				</div>
		 </Then>
		<Else>
        <div className="header">Choose products to <span className="yellow">pitch again</span> on 
        <div className="select-box top-right">
			<select id="select" innerRef={input => (this.condition = input)} className="form-control" onChange={this.handleOnChange}>
				   {optionTemplate}
			</select>
		</div>
		<div className="cl"></div></div>
			<div className="content">
				<div className="received-product">
					<div className="received-product-box">
						<div className="received-product-image-box">
							<img src={constant.BASE_IMAGE_URL+'Products/'+productImg} alt="recieved-product Thumb" />
						</div>
						<div className="received-product-content-box">
							<span>Product ID: <strong>{this.state.proID}</strong></span>
							<h4>{this.state.productData.productName}</h4>
							
							<a className="catLink" href={'search-listing/'+(this.state.productData.productCategory?this.state.productData.productCategory._id:0)}>{this.state.productData.productCategory.title}</a>
							<div className="ratingRow">
							
						<Link to={'public-profile/'+(this.state.productData.userId?this.state.productData.userId._id:0)}>
								<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" /></div>
								<p>{this.state.productData.userId.firstName}</p>
							</Link>
							<div className="rated">4</div>
							<div className="cl"></div>
							</div>
						</div>
					</div>
					<div className="cl"></div>
					<div className="switch-product-section choose-product-div border-top">
                      <Scrollbars className="Scrollsdiv" style={{height: 585 }}>
                       <If condition={this.state.getAllProduct && this.state.getAllProduct.length > 0}>
						<Then>
							{ this.state.getAllProduct.map((productsListing, index) => {	
							var count = index+1;
							var productImages = (productsListing.productImages)?(productsListing.productImages[0]):'';
							var className = (this.state.switchedProductsID.indexOf(productsListing._id) !== -1 )? 'rejected' : '';
							return(
								<div className={"switch-product-box " +className+" "}>
								<div className="switch-product-image-box">
								<img src={constant.BASE_IMAGE_URL+'Products/'+productImages} alt="recieved-product Thumb" />
							    <div className="switch-option-mask">
								<If condition={(this.state.switchedProductsID.indexOf(productsListing._id) !== -1 )} >
								 <Then> 
								  <img src={rejected} alt="recieved-product image" />
								 </Then>
								 <Else>
								    <div className="check-box">
										<input name="Apple" value={productsListing._id}  id={"pitch"+count} type="checkbox" name="productIDS" value={productsListing._id} onChange={this.changeEvent.bind(this)}  disabled={this.state.disabled}/>
										   <label htmlFor={"pitch"+count}>&nbsp;</label>
										</div>
								 </Else>
								</If>
								</div>
								</div>
								<div className="switch-product-content-box">
								<h4>{productsListing.productName?productsListing.productName:""}</h4>
								<a className="catLink" href={'search-listing/'+(productsListing.productCategory?productsListing.productCategory._id:0)}>{productsListing.productCategory?productsListing.productCategory.title:""}</a>
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
					<Button onClick={(e)=>this.submitHandler(e)} color="success" className="more-items">Pitch Now</Button>
					<a className="ditch cancel-ditch"  onClick={close}> Cancel </a>
                      </div>
					</div>
				</div>
			</div>
		  </Else>
		</If>
      </div>
    )}
</Popup>
)}
}

export default PitchAgainPopup;

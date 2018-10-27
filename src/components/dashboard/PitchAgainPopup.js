import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import rcvProduct from '../../images/rcv-product-img.jpg';
import offerProduct1 from '../../images/offer-product-img1.jpg';
import offerProduct3 from '../../images/offer-product-img3.jpg';
import userPic from '../../images/user-pic.png';
import rejected from '../../images/rejected.png';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Badge,
  Button
} from 'reactstrap';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
var FD = require('form-data');
var fs = require('fs');
const constant = require('../../config/constant')
const modalStyle = {  maxWidth: "460px",  width: "90%"};  
const contentStyle = { maxWidth: "900px", width: "90%" };


class PitchAgainPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade,
			proID:this.props.proID,
			offerTradeProducts:[],
			productData:[],
			checkedBoxes :[],
			stateChange:[],
			optionsChecked: []
		}	
		console.log('proIDddddddddddd',this.props.offerTrade.SwitchUserProductId._id)			
	 }  
	 
	 
	 handleFormInputChange(e) {
	    var stateChange = []
		var el = e.target.value
		var name = el.name
		var type = el.type
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
		console.log('proID',this.props.offerTrade.SwitchUserProductId._id)
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
        data.append('switchProId', this.props.offerTrade.SwitchUserProductId._id)
	    axios.post('/trade/submitPitchProduct/',data).then(result => {
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
			 }, 12000);	
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

	  componentWillMount(){
		   this.setState({offerTradeId:this.props.offerTrade.SwitchUserProductId._id})
			axios.get('/trade/getAllProduct/').then(result => {
			  if(result.data.code === 200){
				this.setState({getAllProduct:result.data.result})				
				console.log('getAllProduct',this.state.getAllProduct)
			}
	  })
	  axios.get('/category/categoriesActive/').then(result => {
		   if(result.data.code === 200){
				this.setState({categoryActive:result.data.result})				
				}
			})	
	  }
		
	  componentDidMount(){
		axios.get('/trade/offerTradeProduct/'+this.props.offerTrade.SwitchUserProductId._id).then(result => {
			if(result.data.code === 200){
				console.log('result',result.data.result);
			  this.setState({offerTradeProducts:result.data.result})
		   }
		})	
		
		axios.get('/product/viewProduct/'+this.props.offerTrade.SwitchUserProductId._id).then(result => {
			if(result.data.code === 200){
			  this.setState({productData:result.data.result})
		   }
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
	<Popup trigger={<a className= 'ditch'>Pitched Again </a>}
    modal
    contentStyle = {contentStyle}
    lockScroll >
    {
    close => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <div className="header">Choose products to <span className="yellow">Pitch again</span> on 
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
							<img src={constant.BASE_IMAGE_URL+'Products/'+productImg} alt="recieved-product image" />
						</div>
						<div className="received-product-content-box">
							<span>Product ID: <strong>{this.props.proID}</strong></span>
							<h4>{this.state.productData.productName}</h4>
							<a className="catLink" href="/">{this.state.productData.description}</a>
							<div className="ratingRow">
							<div className="pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} alt="" /></div>
							<p>{this.state.productData.description}</p>
							<div className="rated">4</div>
							<div className="cl"></div>
							</div>
						</div>
					</div>
					<div className="cl"></div>
					<div className="switch-product-section choose-product-div border-top">
                      <Scrollbars className="Scrollsdiv" style={{height: 585 }}>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
                                 <div className="switch-option-mask"> <div className="check-box"><input id="pitch1" type="checkbox" /><label for="pitch1">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box rejected">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
								<div className="switch-option-mask">
                                   <img src={rejected} alt="" />
								</div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						
						
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch2" type="checkbox" /><label for="pitch2">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box rejected">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								<div className="switch-option-mask">
                                                                <img src={rejected} alt="" />
									 
								</div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch3" type="checkbox" /><label for="pitch3">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Call of Duty: Infinite Warfare More</h4>
								<a className="catLink" href="/">Games</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct3} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch4" type="checkbox" /><label for="pitch4">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Shopkins Shoppies - Bubbleisha</h4>
								<a className="catLink" href="/">Toy</a>
							</div>
						</div>
						<div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch5" type="checkbox" /><label for="pitch5">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
                                                <div className="switch-product-box">
							<div className="switch-product-image-box">
								<img src={offerProduct1} alt="recieved-product image" />
								 <div className="switch-option-mask"> <div className="check-box"><input id="pitch6" type="checkbox" /><label for="pitch6">&nbsp;</label></div> </div>
							</div>
							<div className="switch-product-content-box">
								<h4>Leander: Cradle, Crib, High Chair, Chang...</h4>
								<a className="catLink" href="/">Baby Products</a>
							</div>
						</div>
					</Scrollbars>
					<div className="btm-btns">
					<a className="more-items" href="#">Pitch Now</a>
					<a className="ditch cancel-ditch"> Cancel Pitch </a>
                </div>
					</div>
				</div>
			</div>

      </div>
    )}
</Popup>
)}
}

export default PitchAgainPopup;

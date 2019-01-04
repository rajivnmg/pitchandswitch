import React, { Component } from 'react';
import Warper from "./common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios';
import Auxios from './Auxios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';
import { Link } from 'react-router-dom';
var FD = require('form-data');
var fs = require('fs');

const contentStyle = {
    maxWidth: "520px",
    width: "90%"
};

class Form extends Component {
  state = {
    isValidated: false
  };

  validate = () => {
    const formEl = this.formEl;
    const formLength = formEl.length;
   if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }
      return false;
    } else {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }
      return true;
    }
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.validate()) {
      this.props.submit();
    }
    this.setState({ isValidated: true });
  };
  render() {
    const props = [...this.props];
    let classNames = [];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }
    if (this.state.isValidated) {
      classNames.push("was-validated");
    }
    return (
      <form
        {...props}
        className={classNames}
        noValidate
        ref={form => (this.formEl = form)}
        onSubmit={this.submitHandler}
      >
        {this.props.children}
      </form>
    );
  }
}
class payInventoryPopup extends Component {	
	constructor(props){
    super(props);
   	localStorage.setItem('isLoggedIn',1);			
    this.state = {
		currentUser:{},
		addons:[],
		subscriptions : [],
	    isProcess : false,
	    showFormError:true,
	    showFormSuccess:false,
		message:'',
		paymentAmount:0,
		planTypeId : '',
		planType:'',
		totalInventoryAllowed:0,
		totalTradePermitted:0,		
		addPaymentForm: {
			cardHolderName:'',
			cardNumber:'',
			expiryMonth:'',
			expiryYear:'',
			cardCVV:''
		}
	}    
  }
  
  componentWillMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		 if(localStorage.getItem('jwtToken') !== null){	
			  axios.all([
				 axios.get('/user/getLoggedInUser'),
				 axios.get('/subscription/getActiveAddons'),
				 axios.get('/subscription/listingsubscription')
			   ])
			   .then(axios.spread((user, raddons,rsubscription) => {
				   if(user.data.code === 200){					 
					   this.setState({ 
							currentUser:user.data.result,
							subscriptions:rsubscription.data.result,
							addons:raddons.data.result,
							totalInventoryAllowed:(user.data.result.totalInventory === null)?0:user.data.result.totalInventory,
							totalTradePermitted:(user.data.result.totalTrade === null)?0:user.data.result.totalTrade	
						})	
				   }				 			 	
			}))			  
			.catch(error => console.log(error));			
		}	
			
  }
 
 state = {
	   isValidated: false
	};
	
	inputChangedHandler = (event, inputIdentifier) => {
		//console.log("data-ptype",event.target.getAttribute('data-ptype'))
		//console.log("event",event.target.value)
		if(event.target.getAttribute('data-ptype') !==null){
			//console.log("this.state.totalTradePermitted",this.state.totalTradePermitted);
			this.setState({
				paymentAmount:event.target.value,
				planTypeId : event.target.getAttribute('data-ptypeid'),
				planType:event.target.getAttribute('data-ptype'),
				totalInventoryAllowed:(parseInt(this.state.totalInventoryAllowed)+parseInt(event.target.getAttribute('data-inventory'))),
				totalTradePermitted:(parseInt(this.state.totalTradePermitted)+parseInt(event.target.getAttribute('data-trade'))),	
			});			
		}
			const paymentForm = {
			  ...this.state.addPaymentForm
			};
			paymentForm[inputIdentifier] = event.target.value;    
			this.setState({ addPaymentForm: paymentForm });
		};	
	submit = () => {		
		if(this.state.planTypeId ==''){					
				this.setState({showFormError: true,message: 'Please choose a plan'});				
				setTimeout(() => {this.setState({showFormError: false});}, 12000);
			return false;
		}		
		const data = this.state.addPaymentForm;
		data.userEmail = localStorage.getItem('userEmail');
		data.userId =  localStorage.getItem('userId');
		data.amount =  this.state.paymentAmount;
		data.planTypeId =  this.state.planTypeId;
		data.planType =  this.state.planType;
		data.totalInventory = this.state.totalInventoryAllowed;
		data.totalTrade = this.state.totalTradePermitted;				
		this.setState({isProcess:true})
        axios.post('/subscription/updateUserPlan', data).then(result => {        
         if(result.data.code === 200){
			  this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			  setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});
						 localStorage.removeItem('jwtToken'); 
						 window.location.href='/login';
			 }, 12000);		  
			}else{
			  this.setState({
				message: result.data.result.message,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
				isProcess:false
			  });
			}
		  })
		  .catch((error) => {
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: this.state.message });
			}
		  });    
  }
 _renderSuccessMessage() {
    return (   
      <div className={"alert alert-success mt-4"} role="alert">
      Congratulation!!! You have successfully subscribe the plan <Link to={'/login'}> Go to Login </Link> Or it will automaticaly redirect in 10 second.            
      </div>
    );
  
  }
  
 _renderErrorMessage() {
    return (
      <div align="center" className={"errorMessage alert alert-danger mt-4"} role="alert">
        {this.state.message}
      </div>
    );
  }
	
	
render() {
		return (   
			<Popup
			trigger={< a href='javascript:void(0)' className = 'more-items' ><span className="plus">+</span>  Add New Product </a>}
			modal contentStyle = {contentStyle} lockScroll>
			{close => (
					<div className="modal">
						<a className="close" onClick={close}>&times;</a>
						<div className="header">Your limit has been exceeded 
							<div className="cl"></div>
							<p className="sub-heading">Please upgrade your plan or purchase Addon to add more inventory</p>
						</div>
						<div className="content">
						<Form submit={this.submit}>
						<div className="return-request-form">
								<div className="yellow-brdr-box-div ">
											{this.state.subscriptions.map((subscription,index) => {
														if(subscription.totalInventoryAllowed ===9999){
															return(	
																<Auxios key={index}>															
																	<div className="radioBtn" >
																		<input id={"gold"} required={true} name={"plan"} type={"radio"} data-ptype={'subscription'} data-ptypeid={subscription._id} data-trade={subscription.totalTradePermitted} data-inventory={subscription.totalInventoryAllowed} value={subscription.price} onChange={(e) => this.inputChangedHandler(e, 'radio')}/><label htmlFor="gold"></label>
																	</div>
																	<div className="right-div">
																		<p>Gold Package
																		<span className="price">${subscription.price} USD/year</span></p> 
																		<span className="bold active"> </span>Unlimited Trades, Unlimited Items Stored in Treasure Chest and Wishlist    
																	</div>							
																<div className="cl"></div>	
																</Auxios>);
														}else{
															return null;
														}
											})}
										<h2 className="addOns"><strong>Add-ons</strong> (How much trades you need)</h2>  				
										{this.state.addons.map((addon,index) => {						
												return(
													<Auxios key={index}>															
													<div className="radioBtn" >
														<input id={"gold1"+index} type="radio" name="plan" onChange={(e) => this.inputChangedHandler(e, 'radio')} data-ptype={'addon'} data-ptypeid={addon._id} value={addon.price} data-trade={addon.totalTradePermitted} data-inventory={addon.totalInventoryAllowed}/>
														<label htmlFor={"gold1"+index}></label>
													</div>
													<div className="right-div">
														<p>{addon.packageName} 
														<span className="price">${addon.price} USD/year</span></p> 
														<span className="bold active"> </span>{addon.totalTradePermitted} Trade, {addon.totalInventoryAllowed} Stored in Treasure Chest and Wishlist
													</div>							
													<div className="cl"></div>	
													</Auxios>		
												)
											})
										}
									<div className="cl"></div>
								</div>
							<div className="form-row">
							 {this.state.showFormError ? this._renderErrorMessage() : null}	
							  {this.state.showFormSuccess ? this._renderSuccessMessage() : null}	
								<span className="astrik">*</span>
								<label className="label">Name</label>
								<input type="text" id={"cardHolderName"} required={true} name={"cardHolderName"} type={"cardHolderName"}  onChange={(e) => this.inputChangedHandler(e, 'cardHolderName')} placeholder="Card holder name" className="form-control textBox"/>
								
							</div>
							<div className="form-row">
								<span className="astrik">*</span>
								<label className="label">Card number</label>								
								<input type="text" id={"cardNumber"} required={true} name={"cardNumber"} type={"cardNumber"}  onChange={(e) => this.inputChangedHandler(e, 'cardNumber')} placeholder="Card Numer" className="form-control textBox"/>
							</div>
						<div className="form-row">
								<div className="colum left">
									<span className="astrik">*</span>
									<label className="label">Expiry Month</label>									
									<input type="text" id={"expiryMonth"} required={true} name={"expiryMonth"} type={"expiryMonth"}  onChange={(e) => this.inputChangedHandler(e, 'expiryMonth')} placeholder="MM" className="form-control textBox"/>
								</div>
								<div className="colum right">
									<span className="astrik">*</span>	
									<label className="label">Expiry Year</label>								
									<input type="text" id={"expiryYear"} required={true} name={"expiryYear"} type={"expiryYear"}  onChange={(e) => this.inputChangedHandler(e, 'expiryYear')} placeholder="YYYY" className="form-control textBox"/>
								</div>
							<div className="cl"></div>
						</div>
						<div className="form-row">
								<span className="astrik">*</span>
								<label className="label">Security code</label>
								<input type="text" id={"cardCVV"} required={true} name={"cardCVV"} type={"cardCVV"}  onChange={(e) => this.inputChangedHandler(e, 'cardCVV')} placeholder="CVV" className="form-control textBox"/>								
								<div className="cl"></div>
						</div>
						<div className="form-row">
								<input type="submit" className="" value={"Pay $"+this.state.paymentAmount} />
						</div>
						<div className="form-row no-padding">
								<p className="secure-img"> Secure payments</p>
								<p className="secure-btm-text">This payments use a secure 128-bit SSL encryption</p>
						</div>
					</div>
					</Form> 
				</div>			
			</div>
				)}
			</Popup>
	)}
}
export default payInventoryPopup;

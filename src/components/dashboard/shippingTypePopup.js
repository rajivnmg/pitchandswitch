import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import truckImg from '../../images/truck-img.png';
import twoType from '../../images/two-type.png';
import user from '../../images/user.png';
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import successPic from '../../images/successful_img.png';
import Form from "../common/Form";
import { Badge,Button} from 'reactstrap';
import Auxios from '../Auxios';
import { Link } from 'react-router-dom';
const constant = require('../../config/constant')
const contentStyle = {
    maxWidth: "520px",
    width: "90%"
};
const onClose = function (e) {
  console.log(e, 'I was closed.');
};

var FD = require('form-data');
var fs = require('fs');
var tempDate = new Date();
var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();

class ShippingTypePopup extends Component {
	constructor(props) {
		super(props);		
		const tradeId = this.props.offerTrade._id;
		const productID = this.props.productID;
		const pitchProduct = this.props.pitchProduct;
		const switchProduct = this.props.switchProduct;			
		this.state = {				
			productID:this.props.productID,
			offerTrade:this.props.offerTrade,
			shippingCost:[],
			pitchUserDATA:{},			
			showFormError:true,
			showFormSuccess:false,
			message:'',
			paymentAmount:0,
			shipmentId:'',			
			shipmentTypeId:'',				
			addPaymentForm: {
				cardHolderName:'',
				cardNumber:'',
				expiryMonth:'',
				expiryYear:'',
				cardCVV:''
			}
		}	
	} 
	
     submitHandler(proID){	   
		this.setState({ condition: !this.state.condition });	   
	    const data = new FD();
        data.append('offerTradeId', this.state.offerTrade._id)
        data.append('tradePitchProductId', proID)
        data.append('tradeSwitchProductId', this.state.offerTrade.SwitchUserProductId._id)
        data.append('switchDate',date)
        data.append('status', 1)
	    axios.post('/trade/submitTradeProduct/',data).then(result => {	
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
			 }, 2500);	
		  }
      })  
   }
   
     componentDidMount(){		 
		// HTTP request to get the list of cities and active product from the server			
		axios.all([
		 axios.get('/user/viewUser/'+this.props.offerTrade.pitchUserId._id),
		 axios.get('trade/getShippingCost/'+this.props.offerTrade._id+'/'+this.props.productID)
	   ])
	   .then(axios.spread((ruser, rsShippingCost) => {  		   
			this.setState({ pitchUserDATA :ruser.data.result,shippingCost:rsShippingCost.data.result})
	   }))  
	   .catch(error => console.log(error));				
	  }
	  
	 submitHandler(proID){	   
		this.setState({  condition: !this.state.condition  });
	    console.log('proID',proID);
	    const data = new FD();
        data.append('offerTradeId', this.state.offerTrade._id)
        data.append('tradePitchProductId', proID)
        data.append('tradeSwitchProductId', this.state.offerTrade.SwitchUserProductId._id)
        data.append('switchDate',date)
        data.append('status', 1)
	    axios.post('/trade/submitTradeProduct/',data).then(result => {	
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
			 }, 2500);	
		  }
      })  
   }
   
// Shipment Type event handler
 state = {
	   isValidated: false
	};
	
	inputChangedHandler = (event, inputIdentifier) => {
		//console.log("data-ptype",event.target.getAttribute('data-ptype'))
		//console.log("event",event.target.value)	
		if(event.target.getAttribute('data-stypeid') !==null){
			//console.log("this.state.totalTradePermitted",event.target.value);
			this.setState({
				paymentAmount:event.target.value,
				shipmentTypeId : event.target.getAttribute('data-stypeid'),
				shipmentId : event.target.getAttribute('data-shipmentid')											
			});			
		}
			
		const paymentForm = {
		  ...this.state.addPaymentForm
		};
		paymentForm[inputIdentifier] = event.target.value;    
		this.setState({ addPaymentForm: paymentForm });
	};	
	
	submit = () => {		
		if(this.state.shipmentTypeId ==''){		
			console.log("shipmentTypeId",this.state.shipmentTypeId)	
				this.setState({showFormError: true,message: 'Please choose shipment Type'});				
				setTimeout(() => {this.setState({showFormError: false});}, 12000);
			return false;
		}		
		const data = this.state.addPaymentForm;
		data.userEmail = localStorage.getItem('userEmail');
		data.userName = localStorage.getItem('userName');
		data.userId =  localStorage.getItem('userId');
		data.amount =  this.state.paymentAmount;
		data.shipmentTypeId =  this.state.shipmentTypeId;		
		data.tradeId = this.props.offerTrade._id;
		data.pitchProductId = this.props.pitchProduct._id;
		data.switchProductId = this.props.switchProduct._id;
		data.shipmentId = this.state.shipmentId;
		data.type = 'Switch';				
		console.log("submit",data);
		this.setState({isProcess:true})
        axios.post('/trade/payShipment', data).then(result => {        
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
      Congratulation!!! You have successfully Switch <Link to={'/dashboard'}> Go to Dashboard </Link> Or it will automaticaly redirect in 10 second.            
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
	let boxClass = ["active"];
    if(this.state.addClass) {
		boxClass.push('active');
    }
    const productIMG = this.state.pitchUserDATA?this.state.pitchUserDATA.profilePic:"";
    
  return(
<Popup  trigger={ <a className = 'TradeInfobtn' > Switch  </a>} modal
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
					<div className="header centerheading"><span>Switch</span> Successful<div className="cl"></div></div>
					<p className="textSuccessful"><span classNamne="gray">You have successfully Switch on</span>
						{this.props.offerTrade.productName} ~ {this.props.offerTrade.description} 
					</p>
					<div class="successIcon">
						<img src={successPic} alt="" />
					</div>
				</div>
			  </Then>	
		<Else> 		
	<div className="header">Choose shipping type 
	   <div className="cl"></div>
	</div>
	<div className="content">
	<Form submit={this.submit}>
	<div className="tab-outer-container new_poup">
		<Tabs>
			<TabList className="choose-shippinh-type">
				<Tab><img src={truckImg} alt="" /> Use Logistic</Tab>
				<Tab><img src={twoType} alt="" /> Meet in Persone</Tab>
			</TabList>
	      { /* first tab data */ }
	<TabPanel>
		<div className="return-request-form">
		<div className="brdr-box-div">
		<p>{this.props.pitchProduct.productName}</p>
		<span className="catLink">Switched with</span>
		<p>{this.props.switchProduct.productName}</p>                    
		</div>
		<div className="form-row">
			<span className="astrik">*</span>
			<label className="label">Available Shipping Type</label>
			<div className="yellow-brdr-box-div ">		
				{(this.state.shippingCost && (this.state.shippingCost.length > 0))?this.state.shippingCost.map((rate,index) => {														
					return(	
						<Auxios key={index}>															
							<div className="radioBtn" >
								<input id={"shippingRate"+index} required={true} name={"shippingRate"} type={"radio"} onChange={(e) => this.inputChangedHandler(e, 'radio')} value={rate.rate}  data-stypeid={rate.id} data-shipmentid={rate.shipment_id} /><label htmlFor={"shippingRate"+index}></label>
							</div>
							<div className="right-div">
								<p>${rate.rate} {rate.currency} , {rate.service} </p> 								  
							</div>							
						<div className="cl"></div>	
						</Auxios>);							
				}):'No Shipment Available'}
			</div>
		</div>
		<div className="form-row">
		 {this.state.showFormError ? this._renderErrorMessage() : null}	
		 {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
		</div>
		<div className="form-row">
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
	</TabPanel>

	{ /* second tab data */ }	

	<TabPanel>
		<div className="return-request-form">
			<div className="brdr-box-div">
				<div className="user"><img src={constant.BASE_IMAGE_URL+'Products/'+productIMG} alt="" /></div>
					<div className="user_right">
					<h2>{this.props.offerTrade.pitchUserId?this.props.offerTrade.pitchUserId.userName:""}</h2>
						<p>{this.props.offerTrade.pitchUserId?this.props.offerTrade.pitchUserId.address:""}</p>
						<p>{this.state.pitchUserDATA.city?this.state.pitchUserDATA.city.cityName:""},{this.state.pitchUserDATA.state?this.state.pitchUserDATA.state.stateName:""}</p>						
						<p>{this.state.pitchUserDATA.country?this.state.pitchUserDATA.country.countryName:""}</p>
						<p>{this.state.pitchUserDATA?this.state.pitchUserDATA.zipCode:""}</p>
						<p>{this.state.pitchUserDATA?this.state.pitchUserDATA.phoneNumber:""}</p>
				</div>
			</div>
		</div>
		<div className="form-row">
			<Button	onClick={(e)=>this.submitHandler(this.state.productID)}	 color="success" className="more-items"/>Confirm
	   </div>
	  </TabPanel>
	 </Tabs>
	</div>
	</Form>
	</div>
	</Else>
	</If>
	</div>
	)
}
</Popup>
           )}
}

export default ShippingTypePopup;

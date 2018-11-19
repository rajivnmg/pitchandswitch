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
import { Badge,Button} from 'reactstrap';
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
		console.log("ShippingTypePopup PROPS",props,productID,tradeId)
		this.state = {				
		  productID:this.props.productID,
		  offerTrade:this.props.offerTrade,
		  shippingCost:{},
		  pitchUserDATA:{}
		}	
	} 
	
    componentDidMount(){
		//get the offer trade details
		
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
		 axios.get('trade/getShippingCost/'+this.tradeId+'/'+this.productID)
	   ])
	   .then(axios.spread(function (ruser, rsShippingCost) {     
		 this.setState({ pitchUserDATA :ruser.data.result,shippingCost: rsShippingCost.data.result })
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
		<p>God of War 3 ~ Download Full Version PC third-perso...</p>
		<span className="catLink">Switched with</span>
		<p>Shopkins Shoppies - Bubbleisha</p>                    
		</div>
		<div className="yellow-brdr-box-div "><p>Shipping cost
		<span className="price">$66</span></p>                    
		</div>
		<div className="form-row">
		<span className="astrik">*</span>
		<label className="label">Name</label>
		<input type="text" placeholder="Card holder name" />
		</div>
		<div className="form-row">
		<span className="astrik">*</span>
		<label className="label">Card number</label>
		<input type="text" />
		</div>
		<div className="form-row">
		<div className="colum left">
		<span className="astrik">*</span>
		<label className="label">Expiry date</label>
		<input type="text" placeholder="7/21" />
		</div>
		<div className="colum right">
		<span className="astrik">*</span>
		<label className="label">Security code</label>
		<input type="text" placeholder="CVV" />
		</div>
		<div className="cl"></div>
		</div>
		<div className="form-row">
		<input className="" value="Pay $66.00" type="submit" />
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
		<Button	onClick={(e)=>this.submitHandler(this.state.productID)}	 color="success" className="more-items">Confirm</Button>
	   </div>
	  </TabPanel>
	 </Tabs>
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

export default ShippingTypePopup;

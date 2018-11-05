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
		this.state = {				
			productID:this.props.productID,
			offerTrade:this.props.offerTrade,
		}	
	 } 

     submitHandler(proID){	   
		this.setState({  condition: !this.state.condition  });
	   
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
  return(
<Popup  trigger={ <a className = 'TradeInfobtn' > View Pitch  </a>} modal
    contentStyle = {contentStyle}
    lockScroll >
    {
	close => (
	<div className="modal">
	  <a className="close" onClick={close}>
	&times;
	</a>
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
	<div className="user"><img src={user} alt="" /></div>

	<div className="user_right">

	<h2>Godisable Jacob</h2>

	<p>Keas 69 Str.</p>
	<p>15234, Chalandri</p>

	<p>Athens, Greece</p>

	<p>+30-2106019311 (landline)</p>
	<p>+30-6977664062 (mobile phone)</p>
	<p>+30-2106398905 (fax)</p>

	</div>


	</div>
	</div>

	<div className="form-row">
	<input className="" value="Confirm" type="submit" />
	</div>
	</TabPanel>
	</Tabs>
	</div>
	</div>
	</div>
	)
}
</Popup>
           )}
}

export default ShippingTypePopup;

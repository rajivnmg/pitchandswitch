import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import truckImg from '../../images/truck-img.png';
import twoType from '../../images/two-type.png';
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
		console.log('sssssss',this.state.offerTrade);
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
  return(
  
  <Popup trigger={ <a className = 'TradeInfobtn' > Switch </a>} modal contentStyle = {
	contentStyle}
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
		<div className="choose-shippinh-type">
		<ul>
		<li><img src={truckImg} alt="" /></li>
		<li className= { this.state.condition ? "active toggled" : "" } onClick={(e)=>this.submitHandler(this.state.productID)}><img src={twoType} alt="" /></li>
		</ul>
		</div> 
		</div>
		</Else>
	    </If>
	    </div>
		 )}
</Popup>
)}
}

export default ShippingTypePopup;

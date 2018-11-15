import React, { Component } from 'react';
import Warper from "./common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios';
import Auxios from './Auxios';


const contentStyle = {
    maxWidth: "520px",
    width: "90%"
};

class payInventoryPopup extends Component {	
	constructor(props){
    super(props);
   	localStorage.setItem('isLoggedIn',1);
    this.state = {
		currentUser:{},
		addons:[],
		subscriptions : []
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
							addons:raddons.data.result						
						})	
				   }				 			 	
			}))			  
			.catch(error => console.log(error));			
		}	
			
  }
	
	
	
render() {
   return (   
			<Popup
			trigger={< a href='javascript:void(0)' className = 'more-items' ><span className="plus">+</span>  Add New Product </a>}
			modal contentStyle = {contentStyle} lockScroll>
			{
			close => (
							<div className="modal">
								<a className="close" onClick={close}>
									&times;
								</a>
								<div className="header">Your limit has been exceeded 
									<div className="cl"></div>
									<p className="sub-heading">Please upgrade your plan or purchase Addon to add more inventory</p>
								</div>
								<div className="content">
									<div className="return-request-form">
							   
				<div className="yellow-brdr-box-div ">
			{this.state.subscriptions.map((subscription,index) => {
				if(subscription.totalInventoryAllowed ===9999){
							 return(	
							 <Auxios key={index}>															
										<div className="radioBtn" >
											<input id="gold" type="radio" name="radio" value="" /><label htmlFor="gold"></label>
										</div>
										<div className="right-div">
											<p>Gold Package
											<span className="price">$25 USD/year</span></p> 
											<span className="bold active"> </span>Unlimited Trade, Unlimited Items Storage    
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
										<input id={"gold1"+index} type="radio" name="radio" value="" />
										<label htmlFor={"gold1"+index}></label>
									</div>
									<div className="right-div">
										<p>{addon.packageName} 
										<span className="price">${addon.price} USD/year</span></p> 
										<span className="bold active"> </span>{addon.totalTradePermitted} Trade, {addon.totalInventoryAllowed} Items Storage  
									</div>							
								<div className="cl"></div>	
							</Auxios>		
							)
						})
					}
					
				<div className="cl"></div>
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
						<label className="label">Expiry Month</label>
						<input type="text" placeholder="MM" />
						</div>
						<div className="colum right">
						<span className="astrik">*</span>
						<label className="label">Expiry Year</label>
						<input type="text" placeholder="YYYY" />
					</div>
					<div className="cl"></div>
				</div>
				 <div className="form-row">
					
						<div className="colum">
							<span className="astrik">*</span>
							<label className="label">Security code</label>
							<input type="text" placeholder="CVV" />
						</div>
					<div className="cl"></div>
				</div>
				<div className="form-row">
					<input className="" value="Pay $3.00" type="submit" />
				</div>
				<div className="form-row no-padding">
					<p className="secure-img"> Secure payments</p>
					<p className="secure-btm-text">This payments use a secure 128-bit SSL encryption</p>
				</div>
			</div> 
			</div>
			</div>
				)
			}
		</Popup>
	)}
}
export default payInventoryPopup;

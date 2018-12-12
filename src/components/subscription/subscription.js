import React, { Component } from 'react';
import Style from './subscription.css';
import subscribeImg1 from '../../images/subscription-pic1.png';
import subscribeImg2 from '../../images/subscription-pic2.png';
import GetStarted from '../subscription/subscription-basic'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
class Subscription extends React.Component {
	constructor(props){
		super(props)
		this.state = {
				subscriptions : [],
				showFormError: false,
				showFormSuccess:false,
				message:''
		}
	}	
	handleSubscription(e,subscription) {		
		let data = {};			
		data.subscriptionId = e._id;
		data.totalInventory = e.totalInventoryAllowed;
		data.totalTrade = e.totalTradePermitted;
		data.userId = localStorage.getItem('userId');
		data.userName = localStorage.getItem('userName');				
		axios.post('/subscription/saveUserSubscriptionPlan',data).then(result => {
				//console.log("saveSubscriptionPlan",result.data.result)
				if(result.data.code === 200){
					this.setState({showFormError: false,showFormSuccess: true})
					 setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});
						 localStorage.removeItem('jwtToken'); 
						 window.location.href='/login';
				    }, 12000);
					
				}else{
					this.setState({showFormError: true,message:result.data.result.message},function(){						
						window.location.href='/subscription';
					},500);
					
				}
		})
		 setTimeout(() => {this.setState({showFormError: false});}, 12000);
	}
	componentWillMount(){
		axios.get('/subscription/list-subscriptions').then(result =>{			
				if(result.data.code === 200){
					this.setState({subscriptions:result.data.result})
				}
			})
	}
	
 _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
      Congratulation!!! You have successfully subscribe the plan <Link to={'/login'}> Go to login </Link> Or it will automaticaly redirect in 10 second.
        
      </div>
    );
  }
  
 _renderErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4"} role="alert">
        {this.state.message}
      </div>
    );
  }
    render() {
        return (
                <div className="subscription-container">
                           <div className="container">
                        <h3>Choose a plan that works for you    </h3>
                        <p className="subHeading">Simple, Affordable Pricing.</p>
                         {this.state.showFormError ? this._renderErrorMessage() : null}
                         {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                       <If condition={this.state.subscriptions.length === 0}>
								<Then>
									 <div className="example"><Spin /></div>
								</Then>							
							</If>
						{
						   this.state.subscriptions.map((subscription, index) => {							  
								return ( 
								
							<div className="colum-basic" key={subscription._id}>
									<div className="pic-row">
										<img src={(subscription.price === 0)?subscribeImg1:subscribeImg2} />
									</div>
								<h4>{subscription.subscriptionName}</h4>
								<div className="row-div">
									<strong> {(subscription.totalTradePermitted === 9999)?'Unlimited':subscription.totalTradePermitted}</strong> Trades
								</div>
								<div className="row-div">
									<strong>{(subscription.totalInventoryAllowed === 9999)?'Unlimited':subscription.totalInventoryAllowed} Items</strong> Stored in Treasure Chest and Wishlist 
								</div>
								{/*<div className="row-div">
									<strong>{subscription.subscriptionName} Items</strong> Wishlist
								</div> */}
									<h4 className="price">{(subscription.price === "0")?'Free':'$'+subscription.price}<sub>/y</sub></h4>
									
									{(subscription.price < 1)?<span className='getStarted-btn' onClick={this.handleSubscription.bind(this,subscription)} data-id={subscription._id}>Get Started</span>: <GetStarted  subscription={subscription}/>}
							</div>)
							})
						}
                      
                        <div className="cl"></div>
                    </div>
                </div>
                );
    }
}

export default Subscription;

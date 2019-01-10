import React, { Component } from 'react';
import statusTrack from '../../images/track-status1.png'
import ReturnInfo from './returnPopup'
import PostReview from './postReviewPopup'
import axios from 'axios'
import { If, Then, Else } from 'react-if-elseif-else-render';
import { Alert } from 'antd';
import {Link} from 'react-router-dom';
import {letterCaps} from "../commonFunction";
const moment = require('moment-timezone');

class Completed extends React.Component {
    TrackHandler = (id) => {
        let pitches = this.state.pitches;
        let index = pitches.findIndex(pitch => pitch.id === id);
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        this.setState({pitches: pitches});
    };
      constructor(props) {
        super(props);
        this.state = {
            completedPitches: []
        }
    }

    handleChange = e => {
      this.form.validateFields(e.target);
    }
        
     componentDidMount(){
		axios.get('/trade/completedTrades').then(result => {			
			  if(result.data.code === 200){
				this.setState({
					completedPitches: result.data.result,
					currentUser: result.data.currentUser				  
				});
			  }
			})
			.catch((error) => {		
			  if(error.code === 401) {
				this.props.history.push("/login");
			}
		});
	}

	render() {
	return (<div>
	 <If condition={this.state.completedPitches.length === 0}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
			</If>
	{ this.state.completedPitches.map((pitch, index) => {
		let ditchClasses = ['ditch'];
		var IDS = pitch.offerTradeId?pitch.offerTradeId._id:"";
		var send = (pitch.offerTradeId &&  pitch.offerTradeId.pitchUserId._id == this.state.currentUser)?1:0; 
		
		if((send == 1) && (pitch.pitchUserPaymentStatus==1)){
		   var paymentDate = moment(pitch.tradePitchPaymentDate).format("YYYY/MM/DD");	
		} else {
		   var paymentDate = moment(pitch.tradeSwitchPaymentDate).format("YYYY/MM/DD");	
		}
		
		let userId = ((send===1)?(pitch.offerTradeId && pitch.offerTradeId.SwitchUserId)?letterCaps(pitch.offerTradeId.SwitchUserId._id):0:(pitch.offerTradeId && pitch.offerTradeId.pitchUserId)?letterCaps(pitch.offerTradeId.pitchUserId._id):0);
		var startDate = moment().subtract(30, 'days').format('YYYY/MM/DD');
		var currentData = moment().format('YYYY/MM/DD'); 		 
		return (<div className="pitch-row" key={index}>
		  <div className="pitch-div">
			{/* (pitch.offerTradeId &&  pitch.offerTradeId.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null */}
				<div className="colum user"><Link className="alink" to={"/public-profile/"+userId}>{(send===1)?(pitch.offerTradeId && pitch.offerTradeId.SwitchUserId)?letterCaps(pitch.offerTradeId.SwitchUserId.userName):'N/A':(pitch.offerTradeId && pitch.offerTradeId.pitchUserId)?letterCaps(pitch.offerTradeId.pitchUserId.userName):'N/A'}</Link></div>
				<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Sent':'Received'}</span></div>
				<div className="colum complete-date"></div>
				<div className="colum trade-info">
				   <PostReview offerTrade={pitch}/>
				 </div>				 
				 <If condition={paymentDate > startDate && paymentDate <= currentData}>
				   <Then>
					 <div className="colum action"><ReturnInfo offerTrade={pitch}/></div>
				   </Then>
				   <Else>
				     <div className="colum action">Time Exceed</div>
				   </Else>
				</If>
			</div>
			{(pitch.trackStatus) ? <div className="statusTrack"><img src={statusTrack} /></div> : ''}
		  </div>)
		 }
	  )}
     </div>);
	}
}

export default Completed;

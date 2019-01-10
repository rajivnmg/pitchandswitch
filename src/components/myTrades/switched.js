import React, { Component } from 'react';
import statusTrack from '../../images/track-status.png'
import TradeInfo from './tradeInfo'
import SwitchTradeInfo from './switchTradeInfo'
import Messages from './message'
import axios from 'axios'
import { If, Then, Else } from 'react-if-elseif-else-render';
import {Link} from 'react-router-dom';
import {letterCaps} from "../commonFunction";
import { Spin, Icon, Alert } from 'antd';

class Switched extends React.Component {
    constructor() {
        super();
        this.state = {
            switches: []
        }
    };
    
    TrackHandler = (id) => {
        let pitches = this.state.switches;
        let index = pitches.findIndex(pitch => pitch._id === id);
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        pitches[index].messageShow = 0;
        this.setState({pitches: pitches});
    }
    messageHandler = (id) => {
        let pitches = this.state.switches;
        let index = pitches.findIndex(pitch => pitch._id === id);
        pitches[index].messageShow = 1 - parseInt(pitches[index].messageShow);
        pitches[index].trackStatus = 0;
        this.setState({pitches: pitches});

    };
    
     componentDidMount(){
		axios.get('/trade/switchTrades').then(result => {
		  if(result.data.code === 200){			  
			this.setState({
				switches: result.data.result,
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
        return (
         <div>
            <If condition={this.state.switches.length === 0}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
			</If>
            {this.state.switches.map((pitch, index) => {							
			let ditchClasses = ['ditch'];			
			var send = (pitch.offerTradeId &&  pitch.offerTradeId.pitchUserId._id == this.state.currentUser)?1:0;
			var action = 'Track';
			let userId = ((send===1)?(pitch.offerTradeId && pitch.offerTradeId.SwitchUserId)?pitch.offerTradeId.SwitchUserId._id:'0':(pitch.offerTradeId && pitch.offerTradeId.pitchUserId)?pitch.offerTradeId.pitchUserId._id:'0');			
			return (<div className="pitch-row" key={index}>
				<div className="pitch-div">
				   {/* (pitch.offerTradeId &&  pitch.offerTradeId.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New switched</div> : null */}
					<div className="colum user width1"><Link className="alink" to={"/public-profile/"+userId}>{(send===1)?(pitch.offerTradeId && pitch.offerTradeId.SwitchUserId)?letterCaps(pitch.offerTradeId.SwitchUserId.userName):'N/A':(pitch.offerTradeId && pitch.offerTradeId.pitchUserId)?letterCaps(pitch.offerTradeId.pitchUserId.userName):'N/A'}</Link></div>
					<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Sent':'Received'}</span></div>
					<div className="colum"><a href="#" className="view-pitch">
					<SwitchTradeInfo offerTrade={pitch} /></a></div>
					<div className="colum trade-info"> </div>
					<div className="colum message"> </div>
					<div className="colum action"><button onClick={(id) => this.TrackHandler(pitch._id)} className={ditchClasses.join(' ')}>{action}</button></div>
				</div>
				{(pitch.trackStatus) ? <div className="statusTrack"><img src={statusTrack} /></div> : ''}
				{(pitch.messageShow) ? <Messages /> : ''}
			   </div>)
              }
            )}
        </div>
      );
    }
}
export default Switched;

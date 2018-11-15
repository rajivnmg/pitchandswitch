import React, { Component } from 'react';
import statusTrack from '../../images/track-status1.png'
import ReturnInfo from './returnPopup'
import PostReview from './postReviewPopup'
import axios from 'axios'

class ReceivedCompleted extends React.Component {
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
		{ this.state.completedPitches.map((pitch, index) => {
		
			let ditchClasses = ['ditch'];
			var IDS = pitch.offerTradeId?pitch.offerTradeId._id:"";
			var send = (pitch.offerTradeId &&  pitch.offerTradeId.pitchUserId._id == this.state.currentUser)?1:0;          
				return (<div className="pitch-row" key={index}>
					<div className="pitch-div">
						{ (pitch.offerTradeId &&  pitch.offerTradeId.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
						<div className="colum user"><span>{(send===1)?(pitch.offerTradeId)?pitch.offerTradeId.SwitchUserId.userName:'N/A':(pitch.offerTradeId)?pitch.offerTradeId.pitchUserId.userName:'N/A'}</span></div>
						<div className="colum status"><span className={(send===1)?'send':'received'}>{(send===1)?'Sent':'Received'}</span></div>
						<div className="colum complete-date"></div>
						<div className="colum trade-info">
						{console.log('IDS',pitch)}
						   <PostReview offerTrade={pitch}/>
						 </div>  
						<div className="colum action"><ReturnInfo offerTrade={pitch}/> </div>
					</div>
					{(pitch.trackStatus) ? <div className="statusTrack"><img src={statusTrack} /></div> : ''}
				</div>)
			   }
		     
		  )}
	   </div>);
	}
}

export default ReceivedCompleted;

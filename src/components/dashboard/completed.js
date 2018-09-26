import React, { Component } from 'react';
import statusTrack from '../../images/track-status1.png'
import ReturnInfo from './returnPopup'
import PostReview from './postReviewPopup'
import axios from 'axios'
import Moment from 'moment'
class Switched extends React.Component {
	TrackHandler = (id) => {
		let pitches = this.state.pitches;
		let index = pitches.findIndex(pitch => pitch.id === id);
		pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
		this.setState({pitches: pitches});
	};
	  constructor(props) {
        super(props);

        this.state = {
            completedPitches: [{
                    id: 1,
                    pitchType: true,
                    user: "Oleksandr Pid",
                    status: "received",
                    action: "Return",
                    trackStatus: 0,
                    messageType: false,
                    isMessage: true,
                    message: [{username: "213496"},
                        {message: "Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs."}
                    ]

                }
            ]
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
					{this.state.completedPitches.map((pitch, index) => {
						let ditchClasses = ['ditch'];
						//ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());
						var send = (pitch.offerTradeId &&  pitch.offerTradeId.pitchUserId._id == this.state.currentUser)?1:0; 
						return (<div className="pitch-row" key={index}>
							<div className="pitch-div">
							{ (pitch.offerTradeId &&  pitch.offerTradeId.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
							<div className="colum user"><span>{(send===1)?(pitch.offerTradeId)?pitch.offerTradeId.SwitchUserId.userName:'N/A':(pitch.offerTradeId)?pitch.offerTradeId.pitchUserId.userName:'N/A'}</span></div>
							<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
							<div className="colum complete-date">{Moment(pitch.updatedAt).format('LL')} </div>
							<div className="colum trade-info"><PostReview /> </div>  
							<div className="colum action"><ReturnInfo /> </div>

							</div>

							{(pitch.trackStatus) ? <div className="statusTrack"><img src={statusTrack} /></div> : ''}
							</div>)
							}
					)}


	</div>);
    }
}

export default Switched;

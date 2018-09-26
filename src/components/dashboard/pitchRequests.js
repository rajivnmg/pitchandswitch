import React, { Component } from 'react';
import msgSent from '../../images/msg-img.png'
import Messages from './message'
import DitchPopup from './ditchPopup'
import CancelPitchPopup from './cancelPitch'
import LastPitchPopup from './lditch'
import axios from 'axios'


class PitchRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			currentUser:'',
            pitches: [{
                    id: 1,
                    pitchType: true,
                    user: "Chritstina Morilio",
                    status: "received",
                    action: "Ditch",
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: [{username: "213496"},
                        {message: "Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs."}
                    ]

                }
            ]
        }
    };
    
    TrackHandler = (id) => {
		let pitches = this.state.pitches;
		let index = pitches.findIndex(pitch => pitch.id === id);
		pitches[index].messageShow = 1 - parseInt(pitches[index].messageShow);
		this.setState({pitches: pitches});
	};
    
    componentDidMount(){
		axios.get('/trade/offerTrades').then(result => {
			  if(result.data.code === 200){				  
				this.setState({
					pitches: result.data.result,
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
       
            {this.state.pitches.map((pitch, index) => {
				var send = (pitch.pitchUserId &&  pitch.pitchUserId._id == this.state.currentUser)?1:0;
                            let ditchClasses = ['ditch'];                                                       
                            var ditch = 'Ditch';
                            if(send===1 && pitch.ditchCount <= 3){
								var ditch = 'Cancel Pitch';
							}else if(send===0 && pitch.ditchCount > 3){
								var ditch = 'Last Ditch';
							} 
                            //~ let ditchClasses = ['ditch'];
                            //~ ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user width1"> <span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
                                    <div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
                                    <div className="colum message"></div>  
                                    <div className="colum action">{send == 0? <DitchPopup /> :<CancelPitchPopup />}</div>
                                </div>
                                {(pitch.messageShow) ? <Messages /> : ''}
                                        
                            </div>)
            }
            )}
        
        
        </div>
                    );
    }
}

export default PitchRequests;

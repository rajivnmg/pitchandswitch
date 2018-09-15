import React, { Component } from 'react';
import msgSent from '../../images/msg-img.png'
import Messages from './message'
import DitchPopup from './ditchPopup'
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

                },
                
                {
                    id: 3,
                    pitchType: false,
                    user: "Lisa Fotois",
                    status: "sent",
                    action: "Cancel Pitch",
                    messageShow: 0,
                    messageType: true,
                    isMessage: true,
                    message: []
                },
                {
                    id: 4,
                    pitchType: false,
                    user: "Chritstina Morilio",
                    status: "received",
                    action: "Ditch",
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 5,
                    pitchType: false,
                    user: "Min An",
                    status: "received",
                    action: "Last Pitch",
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: []
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
                            if(send===0){
								var ditch = 'Pitch Again';
							}else if(send===1 && pitch.ditchCount <= 3){
								var ditch = 'Cancel Pitch';
							}else if(send===1 && pitch.ditchCount > 3){
								var ditch = 'Last Pitch';
							}         
							console.log("send",send,this.state.currentUser,pitch.pitchUserId)              
                           // ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());
                            return (<div className="pitch-row" key={index}>
									<div className="pitch-div">
										{ (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
										<div className="colum user"> <span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
										<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
										<div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
										<div className="colum"> </div>
										<div className="colum message"></div>  
										<div className="colum action">{(send===0) ? <DitchPopup />  : <a href="#" className={ditchClasses.join(' ')}>{ditch}</a> }</div>
								   
									</div>
									                                     
                            </div>)
					}
            )}
        </div>
       );
    }
}

export default PitchRequests;

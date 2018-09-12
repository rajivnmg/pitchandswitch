import React, { Component } from 'react';
import msgSent from '../../images/msg-img.png'
import Messages from './message'
import DitchPopup from './ditchPopup'




class PitchRequests extends React.Component {
    constructor() {
        super();

        this.state = {
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
                    id: 2,
                    pitchType: false,
                    user: "Min An",
                    status: "sent",
                    action: "Cancel Pitch",
                    messageShow: 0,
                    messageType: false,
                    isMessage: false,
                    message: []
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
                },
                {
                    id: 6,
                    pitchType: false,
                    user: "Lisa Fotois",
                    status: "received",
                    action: "Ditch",
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: []
                }
            ]
        }
    }
    ;
        TrackHandler = (id) => {
        let pitches = this.state.pitches;
        let index = pitches.findIndex(pitch => pitch.id === id);
        pitches[index].messageShow = 1 - parseInt(pitches[index].messageShow);
        this.setState({pitches: pitches});
        
    }
    ;
            render() {

        return (<div>
            {this.state.pitches.map((pitch, index) => {
                            let ditchClasses = ['ditch'];
                            ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { pitch.pitchType == true ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user"> <span>{pitch.user}</span></div>
                                    <div className="colum status"><span className={pitch.status}>{pitch.status}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
                                    <div className="colum"> </div>
                                    <div className="colum message"></div>  
                                    <div className="colum action">{pitch.action== "Ditch" ? <DitchPopup />  : <a href="#" className={ditchClasses.join(' ')}>{pitch.action}</a> }</div>
                               
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
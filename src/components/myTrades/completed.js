import React, { Component } from 'react';
import statusTrack from '../../images/track-status1.png'
import ReturnInfo from './returnPopup'

class Switched extends Component {
    TrackHandler = (id) => {
        let pitches = this.state.pitches;
        let index = pitches.findIndex(pitch => pitch.id === id);
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        this.setState({pitches: pitches});
    };
    constructor() {
        super();

        this.state = {
            pitches: [{
                    id: 1,
                    pitchType: true,
                    user: "241154",
                    status: "received",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: false,
                    isMessage: true,
                    message: [{username: "213496"},
                        {message: "Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs."}
                    ]

                },
                {
                    id: 2,
                    pitchType: false,
                    user: "241154",
                    status: "sent",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: false,
                    isMessage: false,
                    message: []
                },
                {
                    id: 3,
                    pitchType: false,
                    user: "241154",
                    status: "sent",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: true,
                    isMessage: true,
                    message: []
                },
                {
                    id: 4,
                    pitchType: false,
                    user: "241154",
                    status: "received",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 5,
                    pitchType: false,
                    user: "241154",
                    status: "received",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 6,
                    pitchType: false,
                    user: "241154",
                    status: "received",
                    action: "Return",
                    trackStatus: 0, 
                    messageType: false,
                    isMessage: true,
                    message: []
                }
            ]
        }
    }
    render() {
        return (<div>
            {this.state.pitches.map((pitch, index) => {
                let ditchClasses = ['ditch'];
                    ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { pitch.pitchType == true ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user">User:  <span>{pitch.user}</span></div>
                                    <div className="colum status"><span className={pitch.status}>{pitch.status}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
                                    <div className="colum trade-info">Trade info </div>
                                    { pitch.isMessage == true ? <div className="colum message"> {pitch.messageType == true ? <a href="#" className="message new">Message</a> : <a href="#" className="message">Message</a> }</div> : <div className="colum message"> </div>  }
                                     <div className="colum action"><ReturnInfo /> </div>
                                            
                                </div>
                                
                                {(pitch.trackStatus)?<div className="statusTrack"><img src={statusTrack} /></div>:''}
                            </div>)
            }
            )}
        
        
        </div>
                    );
    }
}

export default Switched;

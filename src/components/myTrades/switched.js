import React, { Component } from 'react';
import statusTrack from '../../images/track-status.png'
import TradeInfo from './tradeInfo'
import Messages from './message'
        
class Switched extends Component {
    constructor() {
        super();
        this.state = {
            pitches: [{
                    id: 1,
                    pitchType: true,
                    user: "213496",
                    status: "received",
                    action: "Track",
                    trackStatus: 0,
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
                    user: "213496",
                    status: "sent",
                    action: "Track",
                    trackStatus: 0,
                    messageShow: 0,
                    messageType: false,
                    isMessage: false,
                    message: []
                },
                {
                    id: 3,
                    pitchType: false,
                    user: "213496",
                    status: "sent",
                    action: "Track",
                    trackStatus: 0,
                    messageShow: 0,
                    messageType: true,
                    isMessage: true,
                    message: []
                },
                {
                    id: 4,
                    pitchType: false,
                    user: "213496",
                    status: "received",
                    action: "Track",
                    trackStatus: 0,
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 5,
                    pitchType: false,
                    user: "213496",
                    status: "received",
                    action: "Track",
                    trackStatus: 0,
                    messageShow: 0,
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 6,
                    pitchType: false,
                    user: "213496",
                    status: "received",
                    action: "Track",
                    trackStatus: 0,
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
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        pitches[index].messageShow = 0;
        this.setState({pitches: pitches});
    }
    messageHandler = (id) => {
        let pitches = this.state.pitches;
        let index = pitches.findIndex(pitch => pitch.id === id);
        pitches[index].messageShow = 1 - parseInt(pitches[index].messageShow);
        pitches[index].trackStatus = 0;
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
                                    <div className="colum user">User:  <span>{pitch.user}</span></div>
                                    <div className="colum status"><span className={pitch.status}>{pitch.status}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
                                    <div className="colum trade-info"><TradeInfo /> </div>
                                    { pitch.isMessage == true ? <div className="colum message"> {pitch.messageType == true ?  <button onClick={(id) => this.messageHandler(pitch.id)} className="message new">Message</button> : <button onClick={(id) => this.messageHandler(pitch.id)} className="message">Message</button> }</div> : <div className="colum message"> </div>  }
                                    <div className="colum action"><button onClick={(id) => this.TrackHandler(pitch.id)} className={ditchClasses.join(' ')}>{pitch.action}</button></div>
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

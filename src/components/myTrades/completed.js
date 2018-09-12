import React, { Component } from 'react';
import statusTrack from '../../images/track-status1.png'
        import ReturnInfo from './returnPopup'

        class Switched extends React.Component {
    TrackHandler = (id) => {
        let pitches = this.state.pitches;
        let index = pitches.findIndex(pitch => pitch.id === id);
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        this.setState({pitches: pitches});
    }
    ;
            constructor() {
        super();

        this.state = {
            pitches: [{
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

                },
                {
                    id: 2,
                    pitchType: false,
                    user: "Oleksandr Pid",
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
                    user: "Oleksandr Pid",
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
                    user: "Oleksandr Pid",
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
                    user: "Oleksandr Pid",
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
                    user: "Oleksandr Pid",
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
        <div className="colum user"><span>{pitch.user}</span></div>
        <div className="colum status"><span className={pitch.status}>{pitch.status}</span></div>
        <div className="colum complete-date">20/May/2018 </div>
        <div className="colum trade-info"><a href="#" className="TradeInfobtn">Post Review</a> </div>  
        <div className="colum action"><ReturnInfo /> </div>

    </div>

    {(pitch.trackStatus) ? <div className="statusTrack"><img src={statusTrack} /></div> : ''}
</div>)
    }
    )}


</div>
                    );
    }
}

export default Switched;
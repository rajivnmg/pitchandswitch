import React, { Component } from 'react';
class Ditch extends React.Component {
    constructor() {
        super();

        this.state = {
            pitches: [{
                    id: 1,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "received",
                    action: "Ditched",
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
                    action: "Pitch Again",
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 3,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "sent",
                    action: "Ditched",
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 4,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "received",
                    action: "Ditched",
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 5,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "received",
                    action: "Pitch Again",
                    messageType: false,
                    isMessage: false,
                    message: []
                },
                {
                    id: 6,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "received",
                    action: "Pitch Again",
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 7,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "sent",
                    action: "Pitch Again",
                    messageType: false,
                    isMessage: true,
                    message: []
                },
                {
                    id: 8,
                    pitchType: false,
                    user: "Oleksandr Pid",
                    status: "sent",
                    action: "Pitch Again",
                    messageType: false,
                    isMessage: true,
                    message: [],
                    blocked: true
                }
            ]
        }
    }
    render() {
        return (<div>
            {this.state.pitches.map(function (pitch, index) {
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { pitch.pitchType == true ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user"><span>{pitch.user}</span></div>
                                    <div className="colum status"><span className={pitch.status}>{pitch.status}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch">View Pitch</a></div>
                                    <div className="colum"> </div>
                                     <div className="colum message"> </div> 
                                    <div className="colum action">{pitch.blocked == true ? <a href="#" className={'ditch blocked ' + pitch.action.replace(/\s/g, '').toLowerCase() }>{pitch.action}</a> : <a href="#" className={'ditch ' + pitch.action.replace(/\s/g, '').toLowerCase() }>{pitch.action}</a>}</div>
                                </div>
                        
                            </div>)
            }
            )}
        
        
        </div>
                    );
    }
}

export default Ditch;
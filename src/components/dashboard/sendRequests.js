import React, { Component } from 'react';
import msgSent from '../../images/msg-img.png'
import Messages from './message'
import DitchPopup from './ditchPopup'
import CancelPitchPopup from './cancelPitch'
import LastPitchPopup from './lditch'
import ViewPitchPopup from './viewPitchPopup'
import axios from 'axios'
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class SendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			currentUser:'',
            pitches: []
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
        <If condition={this.state.pitches.length == 0}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
		    <Else>
			{ this.state.pitches.map((pitch, index) => {
				
				   if(pitch.pitchUserId &&  pitch.pitchUserId._id == this.state.currentUser){	
					var send = (pitch.pitchUserId &&  pitch.pitchUserId._id == this.state.currentUser)?1:0;
					let ditchClasses = ['ditch'];                                                       
					var ditch = 'Ditch';
					if(send===1 && pitch.ditchCount <= 3){
						var ditch = 'Cancel Pitch';
					} else if(send===0 && pitch.ditchCount > 3){
						var ditch = 'Last Ditch';
					}         					
					return (
					<div className="pitch-row" key={index}>
						<div className="pitch-div">
							{ (pitch.pitchUserId &&  pitch.pitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
							<div className="colum user"> <span>{pitch.SwitchUserId?pitch.SwitchUserId.userName:'N/A'}</span>
							</div>
							<div className="colum status"><span className='sent'>Send</span></div>
							<div className="colum"><a href="#" className="view-pitch">
								<ViewPitchPopup offerTrade={pitch}/></a></div>
							<div className="colum"></div>
							<div className="colum message"></div>  
							<div className="colum action">										
							{send == 0? <DitchPopup offerTrade={pitch}/> :<CancelPitchPopup offerTrade={pitch}/>}
							</div>								   
						</div>									                                     
					</div>)
				  } 
				}
             )}
             </Else>
            </If>
        </div>
       );
    }
}

export default SendRequests;

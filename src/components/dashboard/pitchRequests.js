import React, { Component } from 'react';
import msgSent from '../../images/msg-img.png'
import Messages from './message'
import DitchPopup from './ditchPopup'
import CancelPitch from './cancelPitch'
import CancelPitchPopup from './cancelPitchPopup'
import ViewPitchPopup from './viewPitchPopup'
import LastPitchPopup from './lditch'
import ViewReceivedPitch from './viewReceivedPitch'
import PitchAgainPopup from './PitchAgainPopup'
import axios from 'axios'
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';


class PitchRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			currentUser:'',
            pitches: [],
            showLoader :  true
        }
    };
    componentWillMount(){		
		axios.get('/trade/offerTrades').then(result => {
		  if(result.data.code === 200){				  
			this.setState({
				pitches: result.data.result,
				currentUser: result.data.currentUser,
				showLoader : false			  
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
		 let countSend = 0;
		 let countReceived = 0;
        return (<div>
			<If condition={this.state.pitches.length === 0 && this.state.showLoader === true}>
				<Then>
					<Spin tip="Loading...">
					<Alert
						message="Data Loading "
						description="Please wait..."
						type="info"
					/>
					</Spin>
				</Then>	
			</If>
			<If condition={this.state.pitches.length === 0 && this.state.showLoader === false}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
			</If>
            {this.state.pitches.map((pitch, index) => {
				var send = (pitch.pitchUserId &&  pitch.pitchUserId._id == this.state.currentUser)?1:0;
					let ditchClasses = ['ditch'];                                                       
					var ditch = 'Ditch';
					if(send===1 && pitch.ditchCount <= 3){
						var ditch = 'Cancel Pitch';
					} else if(send===0 && pitch.ditchCount > 3){
						var ditch = 'Last Ditch';
					} 
					
					if(send==1 && (pitch.status=="0" || pitch.status=="3")){
						countSend = countSend +1;
					}else{
						countReceived = countReceived +1;	
					}
					
					return (<div>
					<If condition={send==1 && (pitch.status=="0" || pitch.status=="3")}>
						<Then>			
						<div className="pitch-row" key={index}>	
						<div className="pitch-div">
							{ (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
							<div className="colum user width1"> <span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
							<div className="colum status"><span className={'sent'}>{'Send'}</span></div>			
							<div className="colum action"><span className="view-pitch pointer cursorPointer">
							<ViewPitchPopup offerTrade={pitch} pitchAgain={(pitch.status =="3")?"1":"0"}/>
							</span></div> 
							<div className="colum message"></div>  
							<div className="colum action">
							 
							 {send == 0 && pitch.status=="0"? <DitchPopup offerTrade={pitch}/> : (pitch.status =="3")?<div class="colum action"><a href="#" class="ditch ditched">Cancelled</a></div>:<CancelPitchPopup offerTrade={pitch}/>}
							</div>
						</div>
						</div>
					</Then>
					<ElseIf condition={send===0 && (pitch.status=="0")}>
					    <div className="pitch-row" key={index}>				
						<div className="pitch-div">
							{ (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
							<div className="colum user width1"> <span>{(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
							<div className="colum status"><span className={'received'}>{'Received'}</span></div>
							<div className="colum action"><span className="view-pitch pointer cursorPointer">
							<ViewReceivedPitch offerTrade={pitch} pitchAgain={(pitch.status =="3")?"1":"0"}/>
							</span></div> 
							<div className="colum message"></div>  
							<div className="colum action">
							 
							 {pitch.status=="0"? <DitchPopup offerTrade={pitch}/> : (pitch.status =="3")?<div class="colum action"><a href="#" class="ditch ditched">Cancelled</a></div>:<CancelPitchPopup offerTrade={pitch}/>}
							</div>
						</div>
						</div>				
					</ElseIf>
					<ElseIf condition={countReceived == 0 && countSend == 0}>					
						No Record Found
					</ElseIf>
				</If>
				</div>)
                  }
            )}
        </div>
           );
    }
}

export default PitchRequests;

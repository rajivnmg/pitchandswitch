import React, { Component } from 'react';
import axios from 'axios';
import PitchAgainPopup from './PitchAgainPopup'
import LastPitchtedPopup from './lastPitchPopup'
import ViewDitchPopup from './viewDitchPopup'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';

class Ditch extends React.Component {
    state = {	
		currentUser:'',		
		ditchedPitches: []
	};
	
    componentDidMount(){
		axios.get('/trade/ditchTrades').then(result => {
			if(result.data.code === 200){
				 
				  this.setState({
					ditchedPitches:result.data.result,
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
        return (
         <div>
           <If condition={this.state.ditchedPitches.length === 0}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
			</If>
			{this.state.ditchedPitches.map((pitch, index) => {
				var send = (pitch.pitchUserId && pitch.pitchUserId._id == this.state.currentUser)?1:0;	
				let ditchClasses = ['ditch'];                                                       
				var ditch = 'Ditched';
				if(send ==1 && pitch.ditchCount > 0 && pitch.ditchCount < 2){
				   var ditch = 'Pitch Again';
				}  else if(send ==1 && pitch.ditchCount == 2){
				   var ditch = 'Last Ditch';
				}
				{console.log('pitch.ditchCount',pitch.ditchCount)}
				return (<div className="pitch-row" key={index}>
				<div className="pitch-div">
				{(pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
				<div className="colum user"><span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
				<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
				<div className="colum"><ViewDitchPopup offerTrade={pitch} proID = {pitch.SwitchUserProductId?pitch.SwitchUserProductId._id:""}/> </div>
				<div className="colum message"> </div>
				 <div className="colum action">
				 {console.log('pfffffffffffitch',pitch)}
				   <If condition={send == 0}>
				     <Then>
				       <a href="#" className={'ditch '}>Ditch</a>
				     </Then>
				   <Else>   
					 {pitch.ditchCount > 2 ? 
						 <a href="#" className={'ditch blocked '}>{ditch}</a> : 
						 
						  <If condition={send ==1 && pitch.ditchCount > 0 && pitch.ditchCount < 2}>
						   <Then>
								<a href="#" className={'ditch '}><PitchAgainPopup offerTrade={pitch} proID = {pitch.SwitchUserProductId?pitch.SwitchUserProductId._id:""}/></a>
						   </Then>
						   <Else If condition={send ==1 && pitch.ditchCount == 2}>
							  <Then>
								 <a href="#" className={'ditch'}><LastPitchtedPopup offerTrade={pitch} proID = {pitch.SwitchUserProductId?pitch.SwitchUserProductId._id:""}/></a>
							  </Then>
						   </Else>
						  </If>
						}
					</Else>
				   </If>
				  </div>
				</div>
				</div>)
			   }
			)}
        </div>
       );
    }
}

export default Ditch;

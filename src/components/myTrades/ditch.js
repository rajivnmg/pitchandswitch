import React, { Component } from 'react';
import axios from 'axios';
import PitchAgainPopup from './PitchAgainPopup'
import ViewDitchPopup from './viewDitchPopup'



class Ditch extends React.Component {
    state = {	
		currentUser:'',		
		ditchedPitches: []
	};
	
    componentDidMount(){
		axios.get('/trade/ditchTrades').then(result => {
			if(result.data.code === 200){
				  console.log("result.data.result",result.data.result)
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
        return (<div>
			{ this.state.ditchedPitches.map((pitch, index) => {
				console.log('ccccccccccccccccccc',pitch)
				var send = (pitch.pitchUserId && pitch.pitchUserId._id == this.state.currentUser)?1:0;	
				let ditchClasses = ['ditch'];                                                       
				var ditch = 'Ditched';
				if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
				   var ditch = 'Pitch Again';
				}  else if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
				   var ditch = 'Last Ditch';
				}
				return (<div className="pitch-row" key={index}>
				<div className="pitch-div">
				{(pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
				<div className="colum user"><span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
				<div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
				<div className="colum">						
				   <ViewDitchPopup offerTrade={pitch}/>	
				</div>
				<div className="colum"> </div>
				<div className="colum message"> </div> 
				<div className="colum action"><PitchAgainPopup offerTrade={pitch}/>	
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

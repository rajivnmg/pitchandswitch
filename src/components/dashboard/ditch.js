import React, { Component } from 'react';
import DitchPopup from './shippingTypePopup'
import axios from 'axios';
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
class Ditch extends React.Component {
    constructor() {
        super();		
        this.state = {
           currentUser:'',
           showLoader :  true,		
			ditchedPitches: []
        }
    }
    
    componentDidMount(){
		axios.get('/trade/ditchTrades').then(result => {
		  if(result.data.code === 200){
			  console.log("result.data.result",result.data.result)
			this.setState({
				ditchedPitches:result.data.result,
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
        return (<div>
			<If condition={this.state.ditchedPitches.length === 0 && this.state.showLoader === true}>
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
			<If condition={this.state.ditchedPitches.length === 0 && this.state.showLoader === false}>
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
							var send = (pitch.pitchUserId && pitch.pitchUserId._id == this.state.currentUser)?1:0;		let ditchClasses = ['ditch'];                                                       
                            var ditch = 'Ditched';
                            if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
								var ditch = 'Pitch Again';
							}else if(send===1 && pitch.ditchCount > 0 && pitch.ditchCount < 3){
								var ditch = 'Last Ditch';
							}
							
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
                                    { (pitch.SwitchUserId &&  pitch.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New Pitch</div> : null }
                                    <div className="colum user width1"><span>{(send===1)?(pitch.SwitchUserId)?pitch.SwitchUserId.userName:'N/A':(pitch.pitchUserId)?pitch.pitchUserId.userName:'N/A'}</span></div>
                                    <div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
                                    <div className="colum">  <DitchPopup /> </div>
                                    <div className="colum message"> </div> 
                                    <div className="colum action">{pitch.status === 4 ? <a href="#" className={'ditch blocked '}>{ditch}</a> : <a href="#" className={'ditch '}>{ditch}</a>}</div>
                                </div>
                        
                            </div>)
					}
            )}
        
        
        </div>
                    );
    }
}

export default Ditch;

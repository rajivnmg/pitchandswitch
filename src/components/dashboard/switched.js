import React, { Component } from 'react';
import statusTrack from '../../images/track-status.png'
import TradeInfo from './tradeInfo'
import Messages from './message'
import axios from 'axios'
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
class Switched extends React.Component {
     constructor() {
        super();
        this.state = {
			showLoader :  true,
            switches: [
            //~ {
                    //~ id: 1,
                    //~ pitchType: true,
                    //~ user: "Christana Marlio",
                    //~ status: "received",
                    //~ action: "Track",
                    //~ trackStatus: 0,
                    //~ messageShow: 0,
                    //~ messageType: false,
                    //~ isMessage: true,
                    //~ message: [{username: "213496"},
                        //~ {message: "Pitch and Switch connects thoughtful consumers around the world with creative entrepreneurs."}
                    //~ ]
				//~ }
            ]
        }
    };
    TrackHandler = (id) => {
        let pitches = this.state.switches;
        let index = pitches.findIndex(pitch => pitch._id === id);
        pitches[index].trackStatus = 1 - parseInt(pitches[index].trackStatus);
        pitches[index].messageShow = 0;
        this.setState({pitches: pitches});
    }
    messageHandler = (id) => {
        let pitches = this.state.switches;
        let index = pitches.findIndex(pitch => pitch._id === id);
        pitches[index].messageShow = 1 - parseInt(pitches[index].messageShow);
        pitches[index].trackStatus = 0;
        this.setState({pitches: pitches});

    };
    
     componentDidMount(){
		axios.get('/trade/switchTrades').then(result => {
			  if(result.data.code === 200){
				  console.log("SWITCH RESPONCE",result.data.result)
				this.setState({
					switches: result.data.result,
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
					<If condition={this.state.switches.length === 0 && this.state.showLoader === true}>
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
			<If condition={this.state.switches.length === 0 && this.state.showLoader === false}>
				<Then>					
					<Alert
					  message="Data Status"
					  description="No Record Found."
					  type="info"
					  showIcon
					/>				
				</Then>								
			</If>
							
            {this.state.switches.map((pitch, index) => {
                            let ditchClasses = ['ditch'];
                            //ditchClasses.push(pitch.action.replace(/\s/g, '').toLowerCase());                            
                            var send = (pitch.offerTradeId &&  pitch.offerTradeId.pitchUserId._id == this.state.currentUser)?1:0;                           
                            var action = 'Track';
                            
                            return (<div className="pitch-row" key={index}>
                                <div className="pitch-div">
									{ (pitch.offerTradeId &&  pitch.offerTradeId.SwitchUserId._id === this.state.currentUser) ? <div className="newPitch">New switched</div> : null }
                                    <div className="colum user width1"><span>{(send===1)?(pitch.offerTradeId)?pitch.offerTradeId.SwitchUserId.userName:'N/A':(pitch.offerTradeId)?pitch.offerTradeId.pitchUserId.userName:'N/A'}</span></div>
                                    <div className="colum status"><span className={(send===1)?'sent':'received'}>{(send===1)?'Send':'Received'}</span></div>
                                    <div className="colum"><a href="#" className="view-pitch"><TradeInfo /></a></div>
                                    
                                    <div className="colum message"> </div>
                                    <div className="colum action">
                                    
                                    <button onClick={(id) => this.TrackHandler(pitch._id)} className={ditchClasses.join(' ')}>{action}</button>
                                    
                                    </div>
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

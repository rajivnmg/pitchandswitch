import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios'
import jquery from 'jquery'
const contentStyle = {
    maxWidth: "560px",
    width: "90%"
};

class cancelPitchPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade
		}
		
		console.log("cancelOfferTrade POPUP props", this.props)
	}
	
	componentDidMount(){
			this.setState({offerTradeId:this.state.offerTrade._id})
	}
	
	cancelPitch(offerTrade){
		let data = {}
		data._id = offerTrade._id	
		data.ditchCount = parseInt(offerTrade.ditchCount)+1
		console.log("data",data)
		axios.post('trade/cancelOfferTrade',data).then(result => {
			if(result.data.code === 200){
				console.log("cancelOfferTrade result",result)	
				jquery('.cancel-btn').click();	
				window.location.href='/my-trades';			
			}else{
				
			}
		})
		
	}

render() {
   return (
	<Popup trigger={ <a className = 'ditch cancel-ditch' > Cancel Pitch </a>} modal contentStyle = {contentStyle} lockScroll>
		{
		close => (
			<div className="modal">
				<a className="close" onClick={close}>
					&times;
				</a>
				<div className="header center-align marginTop">Are you sure you want to Canel this Pitch Request?
					<div className="cl"></div>
				</div>
				<div className="content">
					<div className="return-request-form">
						<div className="form-row btn-row">
							<button className="ditch ditch" onClick={()=>this.cancelPitch(this.state.offerTrade)}>Yes</button>
							<button className="cancel-btn" onClick={close}>No</button>
						</div>
					</div> 
				</div>
			</div>
			)
		}
	</Popup>
	)}
}

export default cancelPitchPopup;

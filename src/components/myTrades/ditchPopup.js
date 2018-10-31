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

class DitchPopup extends Component {	
	constructor(props) {
		super(props);
		this.state = {				
			offerTrade:this.props.offerTrade
		}
		console.log("DITCH POPUP props",this.props.offerTrade)
	}
	
	componentDidMount(){
		this.setState({offerTradeId:this.props.offerTrade?this.props.offerTrade._id:""})
	}
	
	ditchPitch(offerTrade){
		let data = {}
		data._id = offerTrade._id	
		data.ditchCount = parseInt(offerTrade.ditchCount)+1
		axios.post('trade/ditchOfferTrade',data).then(result => {
			if(result.data.code === 200){
				this.setState({
				message: result.data.message,
			  });	
			    setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});			
				window.location.href='/my-trades';
			    }, 4000);	
				jquery('.cancel-btn').click();				
			} else{
				
			}
		})
		
	}

render() {
   return (			   
			<Popup trigger={ <a className = 'ditch' > Ditch </a>} modal contentStyle = {contentStyle} lockScroll >
				{
					close => (
						<div className="modal">
							<a className="close" onClick={close}>
								&times;
							</a>
							<div className="header center-align marginTop">Are you sure you want to ditch?
								<div className="cl"></div>
							</div>
							<div className="content">
								<div className="return-request-form">
									<div className="form-row btn-row">
										<button className="ditch ditch" onClick={()=>this.ditchPitch(this.state.offerTrade)}>Ditch</button>
										<button className="cancel-btn" onClick={close}>Cancel</button>
									</div>
								</div> 
							</div>
						</div>
					)
				}
			</Popup>
	)}
}
export default DitchPopup;

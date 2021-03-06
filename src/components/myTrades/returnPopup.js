import React, { Component }
from 'react';
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios'
import { If, Then, Else,ElseIf} from 'react-if-elseif-else-render';
import successPic from '../../images/successful_img.png';
var FD = require('form-data');
//var fs = require('fs');
//const constant = require('../../config/constant')
const contentStyle = {
  maxWidth: "660px",
  width: "90%"
};


class ReturnPopup extends Component {
	constructor(props) {
	  super(props);
		this.state = {				
			offerTradeProducts:[],
			reportProblem:{},
			offerTrade:this.props.offerTrade,				
		}		
	}
	
	componentWillMount(){		
		if(localStorage.getItem('jwtToken') !== null){	
			axios.get('/user/getLoggedInUser').then(result => {						
				if(result.data.code === 200){					
					this.setState({ 
						user:result.data.result,
					})				
				}else {
					 this.props.history.push('/login');
				}
			})
		}
		
		axios.all([
			axios.get('/donation/getReturnOption'),
			axios.get('/trade/getReportedProblem/'+this.props.offerTrade._id)
		]).then(axios.spread((returnOption, reportedProblem) => {
          if (returnOption.data.code === 200) {
            this.setState({conditions: returnOption.data.result});
          }
          if (reportedProblem.data.code === 200) {
            this.setState({ reportProblem: (reportedProblem.data.result && reportedProblem.data.result.length > 0 )?reportedProblem.data.result[0]:[]},()=>{console.log("reportedProblem",this.state.reportProblem)});
          }
        })
      )
      .catch(error => console.log(error));      
	}
	
	 conditionsChange=(option)=>{
	   this.setState({returnOption: option.target.value});
	 }
	 
     chngtexarea = (textarea) => { 
       this.setState({comments: textarea.target.value});
     }
     
     proposedSolution = (proposedSolution) => { 
       this.setState({proposedSolutions: proposedSolution.target.value});
     }
     
      submitHandler(e){	 
		const data = new FD();		
		data.append('TradeId', this.state.offerTrade._id);
		data.append('UserId', this.state.user._id);
		data.append('ReturnOption', this.state.returnOption);
		data.append('Description', this.state.comments);
		data.append('ProposedSolution', this.state.proposedSolutions);
		data.append('status', 1);		
        axios.post('/trade/returnTrade', data).then(result => {					
          if(result.data.code === 200){
              this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });	
			   setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});			
				window.location.href='/dashboard';
			 }, 5000);	
           }
        });     
     }
	
    render() {
	 let optionTemplate;
	    if(this.state.conditions){
			let conditionsList = this.state.conditions;
		    optionTemplate = conditionsList.map(v => (<option key={v.id} value={v.id}>{v.name}</option>));
     }
     
   return (
    <Popup trigger={ < a className = 'ditch' > Report a Problem < /a>} modal contentStyle = { contentStyle }
    lockScroll >
    {
     close => (
	 <div className="modal">
		<a className="close" onClick={close}>&times;</a>
		 <If condition={this.state.showFormSuccess === true}>
			<Then>
				<div className="modal pitchSuccessful">
					<a className="close" onClick={close}>
					&times;
					</a>
					<div className="header centerheading"><span>Return Messages</span> Successfully saved.<div className="cl"></div></div>
					<p className="textSuccessful">
					  <span classNamne="gray">Your feedback has been saved. Our team will contact you soon.</span>
					</p>
					<div class="successIcon">
						<img src={successPic} alt="" />
					</div>
				</div>
			  </Then>
	    <ElseIf condition={this.state.reportProblem && this.state.reportProblem._id}>
		<div className="header">Report a problem
			<div className="cl"></div>
		</div>
		<div className="content">
			<div className="return-request-form">
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Issue</label>
					<div className="select-box">
					   <select id="select" className="form-control" value={(this.state.reportProblem && this.state.reportProblem.ReturnOption)?this.state.reportProblem.ReturnOption:1}>
						{optionTemplate}
					   </select>
					</div>
				</div>
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Description</label>
					<textarea className="form-control textarea"  onChange={this.chngtexarea} placeholder=" ">{(this.state.reportProblem && this.state.reportProblem._id)?this.state.reportProblem.Description:''}</textarea>
				</div>
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Proposed Solution</label>
					<textarea className="form-control textarea"  placeholder="">{(this.state.reportProblem && this.state.reportProblem._id)?this.state.reportProblem.ProposedSolution:''}</textarea>
				</div>
			</div> 
		</div>
	    </ElseIf>	
		<Else>  
		<div className="header">Report a problem
			<div className="cl"></div>
		</div>
		<div className="content">
			<div className="return-request-form">
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Issue</label>
					<div className="select-box">
					   <select id="select" className="form-control" onChange={this.conditionsChange}>
						{optionTemplate}
					   </select>
					</div>
				</div>
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Description</label>
					<textarea className="form-control textarea"  onChange={this.chngtexarea} placeholder=" "></textarea>
				</div>
				<div className="form-row">
					<span className="astrik">*</span>
					<label className="label">Proposed Solution</label>
					<textarea className="form-control textarea" onChange={this.proposedSolution} placeholder=""></textarea>
				</div>
				<div className="form-row" >
					 <input onClick={(e)=>this.submitHandler(e)} value="submit" type="submit" />
				</div>
			</div> 
		</div>
		</Else>
		</If>
	 </div>
     )
   }  
 </Popup>
)}
}
export default ReturnPopup;

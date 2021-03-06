import React, { Component } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

// a select with dynamically created options

class StateSelectBox extends Component {
	constructor(props) {	
	console.log('PROPS', props); 
    super(props);    
    this.state = { value: 'Select a state'};         
    this.state = {
      states : []     
	};    
  }
  
  componentDidMount(){
    axios.get('/location/getState/'+this.props.countryId).then(result => {
      if(result.data.code === 200){				 
        this.setState({
          states: result.data.result,          
        }, ()=>{
			if(this.props.stateID){
				this.props.onSelectState(this.props.stateID);
				this.props.reference = this.props.stateID;
			}
		});
      }
      
    })
   .catch((error) => {
    console.log('error', error)
      if(error.code === 401) {
        this.props.history.push("/login");
      }
    });
  }
  render() {	  
    return (
      <div className="form-group">        
       <Input type="select" innerRef={this.props.reference} className="form-control">
		<option value="0" >Select a State</option>
        {this.state.states.map(option => {
          return <option value={option._id} key={option.stateName}>{option.stateName.toUpperCase()}</option>
        })}
	  </Input>
      </div>
      
    )
  }
}
export default StateSelectBox;

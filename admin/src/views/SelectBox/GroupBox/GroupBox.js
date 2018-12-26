import React, { Component } from 'react';
import { FormGroup, FormFeedback, Label } from "reactstrap";
import axios from 'axios';
import InputElement from "../../InputElement/InputElement";
import Aux from "../../Auxillary";
class GroupBox extends Component {
  constructor(props) {
		super(props);    
		this.state = {
		  countryLoaded: false,
		  countries : [],
		  states: [],
		  cities: []
		};    
  }
  
  componentDidMount(){
	//getting all countries active
    axios.get('/location/listActiveCountry').then(result => {
      if(result.data.code === 200){	
        this.setState({
          countries: result.data.result,    
          countryLoaded: true        
        }, ()=>{
			if(this.props.countryID){
				this.onChangeGetStates(this.props.countryID);
			}
		});
      }
    })
    .catch((error) => {    
      if(error.code === 401) {
        this.props.history.push("/login");
      }
    });
  }
  
  onChangeGetStates = (event) => {
	  const countryId = event.target.value;
	  this.props.inputChangedHandler(event, 'country');
	  if(countryId === null) return null;
	  axios.get('/location/getState/'+countryId).then(result => {
		  if(result.data.code === 200){				 
			this.setState({
			  states: result.data.result,	
			  countryLoaded: true   		          
			}, ()=>{	
				console.log('STATE', this.state.states);			
				//~ if(this.props.stateID){
					//~ this.props.onSelectState(this.props.stateID);
					//~ this.props.reference = this.props.stateID;
				//~ }
			});
		  }
		  
		})
	   .catch((error) => {
		console.log('error', error)
		  if(error.code === 401) {
			this.props.history.push("/login");
		  }
		});
  };
  
  onChangeGetCities = (stateId) => {
	  if(stateId === null) return null;
	  axios.get('/location/getCity/'+stateId).then(result => {
		  if(result.data.code === 200){	
			this.setState({
			  cities: result.data.result,   
			  countryLoaded: true          
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
	  let countryElement = null;
	  if(this.state.countryLoaded){
		  countryElement = <Aux>
		{(this.props.countryId) ?
       <InputElement
					label={"Country"}
					elementType={"group-box"}
					elementConfig={{options: this.state.countries, reference: this.props.countryRef}}
					changed={event => 
						this.onChangeGetStates(event)					  
					}
					title={"countryName"}
					value={this.props.countryID}                
				  />: null}
		{(this.props.stateId) ? 
       <FormGroup>
      <Label htmlFor={this.props.label}>{this.props.label}</Label>
      <select
          key={this.props.key}
          onChange={event => 
			this.onChangeGetStates(event)					  
		  }
          value={this.props.value}
          ref={this.props.elementConfig.reference}
        >
          <option value="0" key="0">
            --Select--
          </option>
          {console.log('IN RENDER STATES', this.state.states)}
          
          {this.state.states.map(option1 => { console.log('option1', option1);
			  return <option value={option1._id} key={option1._id}>
				{option1[this.props.title]}
			  </option>
		  })}
        </select></FormGroup>: null}
		{(this.props.cityId) ? 
       <InputElement
					label={"City"}
					elementType={"group-box"}
					elementConfig={{options: this.state.cities, reference: this.props.cityRef}}
					changed={event =>
					  this.props.inputChangedHandler(event, 'city')
					}
					value={this.props.cityId}                
				  />: null}
		</Aux>
		  
	  }
	  
    return (countryElement)
  }
}
export default GroupBox;

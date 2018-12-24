import React, { Component } from 'react';
import {Input} from 'reactstrap';
import axios from 'axios';
import InputElement from "../../InputElement/InputElement";
import Aux from "../../Auxillary";
class GroupBox extends Component {
  constructor(props) {		 
		super(props);    
		console.log('in group box', this.props);      
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
  
  onChangeGetStates = (countryId) => {
	  if(countryId === null) return null;
	  axios.get('/location/getState/'+countryId).then(result => {
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
  };
  
  onChangeGetCities = (stateId) => {
	  if(stateId === null) return null;
	  axios.get('/location/getCity/'+stateId).then(result => {
		  if(result.data.code === 200){	
			this.setState({
			  cities: result.data.result,          
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
					  this.props.inputChangedHandler(event, 'country')
					}
					title={"countryName"}
					value={this.props.countryID}                
				  />: null}
		{(this.props.stateId) ? 
       <InputElement
					label={"State"}
					elementType={"group-box"}
					elementConfig={{options: this.state.states, reference: this.props.stateRef}}
					changed={event =>
					  this.props.inputChangedHandler(event, 'state')
					}
					value={this.props.stateId}                
				  />: null}
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

import React, { Component } from 'react';
import {Input} from 'reactstrap';
import axios from 'axios';

class CountrySelectBox extends Component {
  constructor(props) {		 
		super(props);    
		this.state = { value: 'Select a country'};         
		this.state = {
		  countries : []     
		};    
  }
  
  componentDidMount(){
	//getting all countries active
    axios.get('/location/listActiveCountry').then(result => {
      if(result.data.code === 200){	
        this.setState({
          countries: result.data.result,          
        }, ()=>{
			if(this.props.countryID){
				this.props.onSelectCountry(this.props.countryID);
				this.props.reference = this.props.countryID;
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
  render() {	  
    return (
       
       <Input type="select" 
		onChange={(e) => this.props.onSelectCountry(e.target.value)}
		innerRef={this.props.reference} className="form-control"
		defaultValue={this.props.countryID}
		required>
		<option value="0" >Select a Country</option>
        {this.state.countries.map(option => {
          return <option value={option._id} key={option._id}>{option.countryName.toUpperCase()}</option>
        })}
	  </Input>      
    )
  }
}
export default CountrySelectBox;

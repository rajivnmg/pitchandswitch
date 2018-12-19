import React, { Component } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

// a select with dynamically created options
var options = []

class CitySelectBox extends Component {
  constructor(props) {	
    super(props);    
    this.state = { value: 'Select a City'};         
    this.state = {
      cities : []     
	};    
  }
  
  componentDidMount(){
	//getting all countries
    axios.get('/location/listingcities').then(result => {
      if(result.data.code === 200){	
        this.setState({
          cities: result.data.result,          
        }, ()=>{
			if(this.props.countryID){
				this.props.onSelectCity(this.props.cityID);
				this.props.reference = this.props.cityID;
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
      <div className="form-group">{this.props.cityID}  
        <Input type="select" 
		onChange={(e) => this.props.onSelectCity(e.target.value)}
		innerRef={this.props.reference} className="form-control">
		<option value="0" >Select a City</option>
        {this.state.cities.map(option => {
          return <option value={option._id} key={option.cityName}>{option.cityName.toUpperCase()}</option>
        })}
	  </Input>
      </div>
      
    )
  }
}
export default CitySelectBox;

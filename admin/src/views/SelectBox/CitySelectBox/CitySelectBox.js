import React, { Component } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';

class CitySelectBox extends Component {
  constructor(props) {	
    super(props);    
    this.state = { value: 'Select a City'};         
    this.state = {
      cities : []     
	};    
	console.log("props CitySelectBox",props)
  }
  
  componentDidMount(){
	//getting all countries
	if(this.props.stateId){
    axios.get('/location/getCity/'+this.props.stateId).then(result => {
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
	}else{
		axios.get('/location/listingCity').then(result => {
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
  }
  render() {	  
    return (
       <Input type="select" 
		onChange={(e) => this.props.onSelectCity(e.target.value)}
		innerRef={this.props.reference} defaultValue={this.props.cityID} className="form-control">
		<option value="0" >Select a City</option>
        {this.state.cities.map(option => {
          return <option value={option._id} key={option._id} >{option.cityName.toUpperCase()}</option>
        })}
	  </Input>
    )
  }
}
export default CitySelectBox;

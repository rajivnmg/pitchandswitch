import React, { Component } from 'react';
//import { Alert, Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import Select from 'react-styled-select'

// a select with dynamically created options
var options = []
class SizeSelectBox extends Component {
  constructor(props) {
    super(props);    
    this.state = { value: 'Select Size'};         
    this.state = {
			size : ''
	}   
  }
  onChange(e) {
	var size = e;	  
	this.setState({value: e});
    this.props.onSelectSize(size); 
  }
  
  componentDidMount(){	
    axios.put('/size/listingsize').then(result => {		
      if(result.data.code === 200){
		  this.setState({
            options: result.data.result,           
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
	let optionsLists;
      if(this.state.options){
        let optionsList = this.state.options;                
         optionsLists = optionsList.map(option => ({ label: option.size, value: option._id }));          
     }	
    return (
		<Select options={optionsLists}	value={this.state.value} onChange={this.onChange.bind(this)} innerRef={this.props.reference}
		classes={{  selectValue: 'my-custom-value',	 selectArrow: 'my-custom-arrow'	}}
		/>
    )
  }
}
export default SizeSelectBox;

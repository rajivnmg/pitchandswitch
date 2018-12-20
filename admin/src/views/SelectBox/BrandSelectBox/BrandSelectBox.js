import React, { Component } from 'react';
//import { Alert, Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Select } from 'antd';
const Option = Select.Option;
class BrandSelectBox extends Component {
	constructor(props) {
		super(props);        
		this.state = {
				brand : '',
				options:[]
		}  
	}
	handleChange = (value) => {
		this.props.onSelectBrand(value);
	} 
  
  componentDidMount(){	
    axios.get('/brand/listingbrand').then(result => {				
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
  Capitalize(str){
		if(str)	return str.charAt(0).toUpperCase() + str.slice(1);
		return str;
	}
	
  render(){
  return (		
		<Select
		showSearch
		style={{ width: 200 }}
		placeholder="Select a Brand"
		optionFilterProp="children"
		onChange={this.handleChange}   
		filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
		defaultValue={this.props.value}		
	  >
		{this.state.options.map((opt,i) => 
			<Option value={opt._id} key={i}>{this.Capitalize(opt.brandName)}</Option>
		)}
	</Select>
    )
  }
}
export default BrandSelectBox;

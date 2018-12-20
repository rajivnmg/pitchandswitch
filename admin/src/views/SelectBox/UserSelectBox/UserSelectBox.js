import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
const Option = Select.Option;

// a select with dynamically created options
class UserSelectBox extends Component {
  constructor(props) {
    super(props);    
    this.state = {
		options: []
	}; 	
  }
  
handleChange = (value) => {
	this.props.onSelectUser(value);
}
   
  componentDidMount(){
	if(this.state.options.length === 0){
		axios.get('/user/listUser').then(result => {
		  if(result.data.code === 200){		  
			 this.setState({
				options: result.data.result          
			  });
		   }      
		})
		.catch((error) => {
		  console.log('error UserSelectBox', error)			
		 });
	 }
  }
	Capitalize(str){
		if(str)	return str.charAt(0).toUpperCase() + str.slice(1);
		return str;
	}

  render() {	  
    return (		
		<Select
		showSearch
		style={{ width: 200 }}
		placeholder="Select a person"
		optionFilterProp="children"
		onChange={this.handleChange}   
		filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
		defaultValue={this.props.value}		
	  >
		{this.state.options.map((opt,k) => 
			<Option value={opt._id} key={k}>{this.Capitalize(opt.userName)}</Option>
		)}
	</Select>
    )
  }
}
export default UserSelectBox;

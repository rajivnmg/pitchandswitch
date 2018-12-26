import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
const Option = Select.Option;

// a select with dynamically created options
class SizeSelectBox extends Component {
	constructor(props) {
		super(props);    
		this.state = {
				size : '',
				options:[]
		}   
	}  

	handleChange = (value) => {
		this.props.onSelectSize(value);
	}
		
  componentDidMount(){	
    axios.get('/size/listingsize').then(result => {		
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
	return (		
		<Select
		showSearch
		style={{ width: 200 }}
		placeholder="Select a Size"
		optionFilterProp="children"
		onChange={this.handleChange}   
		filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
		defaultValue={this.props.value}		
	  >
		{this.state.options.map((opt,i) => 
			<Option value={opt._id} key={i}>{opt.size}</Option>
		)}
	</Select>
    )
  }
}
export default SizeSelectBox;

import React, { Component } from 'react';
//import { Alert, Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
//import Select from 'react-styled-select'
//import DropdownTreeSelect from 'react-dropdown-tree-select'
//import 'react-dropdown-tree-select/dist/styles.css'
import 'antd/dist/antd.css';

import { TreeSelect } from 'antd';
//const TreeNode = TreeSelect.TreeNode;

class CategorySelectBox extends Component {
  constructor(props) {
    super(props);    
    this.state = { 
		value:props.value, 
		category : '',
		data:[]
	};
  }

 onChange = (value) => {
    this.setState({value});        
    this.props.onSelectCategory(value);
    this.setState({category:value});
  }

  onDefaultValues = (value) => {
    this.props.onDefaultValuesSet(value);
  }

  componentDidMount(){
    axios.get('/category/allCategories').then(result => {
      if(result.data.code === 200){
		//  console.log("allCategories",result.data.result)
        this.setState({
          data: result.data.result,
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
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
        treeData={this.state.data}
        placeholder="Select a Category"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );

  }
}
export default CategorySelectBox;

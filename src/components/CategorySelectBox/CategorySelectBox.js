import React, { Component } from 'react';
import axios from 'axios';
//import Select from 'react-styled-select'
//import DropdownTreeSelect from 'react-dropdown-tree-select'
//import 'react-dropdown-tree-select/dist/styles.css'
//import 'antd/dist/antd.css';

import { TreeSelect } from 'antd';
//const TreeNode = TreeSelect.TreeNode;

class CategorySelectBox extends Component {
  state = { value: 'Select Category', category : '',	data:[]};   
  onChange = (value) => {
   this.setState({value});
    this.setState({category:value});
    this.props.onSelectCategory(value);
  }
  componentDidMount(){	  
	  console.log('PROPS', this.props);
    axios.get('/category/allCategories').then(result => {
      if(result.data.code === 200){		  
		 // console.log("allCategories",result.data.result)
        this.setState({
          data: result.data.result
        });
      }
    })
   .catch((error) => {
    //console.log('error', error)
      if(error.code === 401) {
        this.props.history.push("/login");
      }
    });
  }
  componentWillMount(){
	  setTimeout(()=>{
		  console.log('HERE', this.props.value);
		  this.setState({value: this.props.value});
	  }, 100);
  }
  render() {
     //~ let data;
      //~ if(this.state.data){
        //~ //let data = this.state.data;
       //~ const  data = this.state.data.map(option => ({ label: option.title, value: option.title,children: {...option.children}}));
       //~ }	  	  
    //~ return (
       //~ <DropdownTreeSelect data={this.state.data} clearSearchOnChange={true} onChange={this.onChange} placeholderText="Search" />
 
    //~ )    
    return (
      <TreeSelect        
        style={{ width: 475 }}
        defaultValue={this.props.value}
        value={this.state.value}       
        dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
        treeData={this.state.data}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
         
  }
}
export default CategorySelectBox;

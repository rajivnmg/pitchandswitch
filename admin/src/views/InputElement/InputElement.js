import React, {Component} from "react";
import { FormGroup, FormFeedback, Label } from "reactstrap";
import TreeView from "react-simple-jstree";
import SearchTree from "./SearchTree"
import moment from "moment";
import { DatePicker } from 'antd';

class InputElement extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			...props
		};
	}
	
	componentWillReceiveProps(nextProps){
		console.log('InputElement componentWillReceiveProps', nextProps);
		this.setState({...this.state, ...nextProps});
		//return true;
	}
	
	//~ componentShouldUpdate(prevProps, nextProps){
		//~ if(this.state.key === nextProps.key) return true;
		//~ return false;
	//~ }
	render(){
		let inputElement = null;
		let inputClasses = ["form-control"];
		if (this.state.touched && !this.state.valid) {
			inputClasses.push("is-invalid");
		}
		switch (this.state.elementType) {
			case "input":
			  inputElement = (
				<input
				  {...this.state.elementConfig}
				  onChange={this.state.changed}
				  className={inputClasses.join(" ")}
				  value={this.state.value}
				/>
			  );
			  break;
			case "password":
			  inputElement = (
				<input
				  {...this.state.elementConfig}
				  onChange={this.state.changed}
				  className={inputClasses.join(" ")}
				  value={this.state.value}
				/>
			  );
			  break;
			case "textarea":
			  inputElement = (
				<textarea
				  {...this.state.elementConfig}
				  onChange={this.state.changed}
				  className={inputClasses.join(" ")}
				  value={this.state.value}
				/>
			  );
			  break;
			case "date":
			  //~ inputElement = (
				//~ <input
				  //~ {...props.elementConfig}
				  //~ onChange={props.changed}
				  //~ className={inputClasses.join(" ")}
				  //~ value={props.value}
				//~ /> 
			  //~ );
			  inputElement = ( <DatePicker {...this.state.elementConfig}
				onChange={(value) => this.state.changed({target: {value}})} className={inputClasses.join(" ")} 
				defaultValue={moment(this.state.value, this.state.elementConfig.format)} 
				format={this.state.elementConfig.format} />)
			  break;
			  
			case "select-simple":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={this.state.changed}
				  value={this.state.value}
				>
				  <option value="">
					--Select--
				  </option>
				  {this.state.elementConfig.options.map(option => {
					  return <option value={option._id} key={option._id}>
						{option[this.state.elementConfig.title]}
					  </option>
				  })}
				</select>
			  );
			  break;
			case "group-box":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={this.state.changed}
				  value={this.state.value}
				  ref={this.state.elementConfig.reference}
				>
				  <option value="0" key="0">
					--Select--
				  </option>
				  {this.state.elementConfig.options.map(option => {
					  return <option value={option._id} key={option._id}>
						{option[this.state.title]}
					  </option>
				  })}
				</select>
			  );
			  break;
			//~ case "group-box-multiple":
			  //~ inputElement = (
				//~ <select
				  //~ key={props.key}
				  //~ className={inputClasses.join(" ")}
				  //~ onChange={props.changed}
				  //~ value={props.value}
				  //~ ref={props.elementConfig.reference}
				//~ >
				  //~ <option value="0" key="0">
					//~ --Select--
				  //~ </option>
				  //~ {props.elementConfig.options.map(option => {
					  //~ return <option value={option._id} key={option._id}>
						//~ {option[props.elementConfig.title]}
					  //~ </option>
				  //~ })}
				//~ </select>
			  //~ );
			  //~ break;
			case "select-status":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={this.state.changed}
				  value={this.state.value}
				>
				 
				  {this.state.elementConfig.options.map(option => {
					  return <option value={option._id} key={option._id}>
						{option.title}
					  </option>
				  })}
				</select>
			  );
			  break;
		   case "search-tree":
			  inputElement = (
				<SearchTree categorydata={this.state.elementConfig.options} 
				handleOnChange={this.state.elementConfig.handleCategorySelect} selected={this.state.elementConfig.selected}/>
			  );
			  break;
			  
			  
			case "tree":
			  inputElement = (
				<TreeView
				  treeData={{ core: { data: this.state.elementConfig.options } }}
				  onChange={(e, data) => this.state.treechanged(e, data)}
				/>
			  );
			  break;
			default:
			  inputElement = (
				<input
				  className={inputClasses.join(" ")}
				  onChange={this.state.changed}
				  {...this.state.elementConfig}
				  value={this.state.value}
				/>
			  );
		  }
		return (
			<FormGroup>
			  <Label htmlFor={this.state.label}>{this.state.label}</Label>
			  {inputElement}
			  <FormFeedback className={!this.state.valid ? "invalid-feedback" : ""}>
				{this.state.message}
			  </FormFeedback>
			</FormGroup>
		);
	}
	
}
export default InputElement;

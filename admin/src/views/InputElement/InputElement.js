import React, {Component} from "react";
import { FormGroup, FormFeedback, Label } from "reactstrap";
import TreeView from "react-simple-jstree";
import SearchTree from "./SearchTree"
import moment from "moment";
import { DatePicker } from 'antd';
import axios from 'axios';
class InputElement extends Component{
	
	constructor(props){
		super(props);	
		this.state = {
			...props,
			countries:[],
			states: [],
			cities: []
		};
		console.log('PPPPP', props);
	}
	getCountry = () => {
	  return axios.get('/location/listActiveCountry');
	};

	getState = (countryId) => {
	  return axios.get('/location/getState/'+countryId);
	};

	getCity = (stateId) => {
	  return axios.get('/location/getCity/'+stateId);
	};
	  
	componentWillReceiveProps(nextProps){
		console.log('InputElement componentWillReceiveProps', nextProps);
		this.setState({...this.state, ...nextProps});
		//return true;
	}
	
	//~ componentShouldUpdate(prevProps, nextProps){
		//~ if(this.state.key === nextProps.key) return true;
		//~ return false;
	//~ }
	 componentDidMount(){
		if(this.state.countries.length === 0){
			  this.getCountry().then((data) => { 
				  if(data.data.code === 200) this.setState({countries: data.data.result})
			  });
		  }
	  }
	  onDropdownChange = (event, key) => {
		  let value = event.target.value;	
		  if(value != ''){
			  switch(key){
				  case 'stateName':
					  this.state.changed(event, 'state');
					  this.getCity(value).then((data) => {
						  if(data.data.code === 200) this.setState({cities: data.data.result})
					  });break;
				  default:
					  this.state.changed(event, 'country');
					  this.getState(value).then((data) => {console.log('Here in onDropdownChange country', data);
						  if(data.data.code === 200) this.setState({states: data.data.result}, () => {
							console.log('HHHHHHHH', this.state);  
						  })
					  });
				  
			  }
		  }
	  }
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
				  <option value="">
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
			case "group-box-country":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={(e) => this.onDropdownChange(e, this.state.elementConfig.title)}
				  value={this.state.value}
				  ref={this.state.elementConfig.reference}
				>
				  <option value="">
					--Select--
				  </option>
				  {this.state.countries.map(option => {
					  return <option value={option._id} key={option._id}>
						{option[this.state.elementConfig.title]}
					  </option>
				  })}
				</select>
			  );
			  break;
			case "group-box-state":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={(e) => this.onDropdownChange(e, this.state.elementConfig.title)}
				  value={this.state.value}
				  ref={this.state.elementConfig.reference}
				>
				  <option value="">
					--Select--
				  </option>
				  {this.state.states.map(option => {
					  return <option value={option._id} key={option._id}>
						{option[this.state.elementConfig.title]}
					  </option>
				  })}
				</select>
			  );
			  break;
			 case "group-box-city":
			  inputElement = (
				<select
				  key={this.state.key}
				  className={inputClasses.join(" ")}
				  onChange={(e) => this.onDropdownChange(e, this.state.elementConfig.title)}
				  value={this.state.value}
				  ref={this.state.elementConfig.reference}
				>
				  <option value="">
					--Select--
				  </option>
				  {this.state.cities.map(option => {
					  return <option value={option._id} key={option._id}>
						{option[this.state.elementConfig.title]}
					  </option>
				  })}
				</select>
			  );
			  break;
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

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
//import CategorySelectBox from '../SelectBox/CategorySelectBox/CategorySelectBox'
import InputElement from "../InputElement/InputElement";

import {  
  Button,  
  Card,
  CardBody,  
  CardHeader,
  Col, 
  Form,
  Row,
} from 'reactstrap';
//var FD = require('form-data');
//var fs = require('fs');

// import PropTypes from 'prop-types';
class BrandEdit extends Component {
  constructor(props){
    super(props);
    this.brandName = React.createRef();
    this.category = React.createRef();
    let brandId = this.props.match.params.id;
	this.state = {			
		brandId: brandId,
		requestStatus:false,
		brandForm: {
			brandName: {
			  elementType: "input",
			  elementConfig: {
				type: "text",
				placeholder: "Brand Name"
			  },
			  value: "",
			  label: "Brand Name",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false
			},
			category: {
			  elementType: "search-tree",
			  elementConfig: {
				options: [],
				selected: [],
				handleCategorySelect: this.handleCategorySelect
			  },
			  value: "",
			  label: "Category",
			  validation: {
				required: false
			  },
			  valid: true,
			  touched: false
			}			
		}
	}		
}
  
  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !=="" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  
  
   inputChangedHandler = (event, inputIdentifier) => {
	let targetValue = null;
	let selected = [];	
	if(inputIdentifier === 'category'){
		targetValue = event;
		selected = [event];
	}else{
		targetValue = event.target.value;
	}
	
    const updatedBrand = {
      ...this.state.brandForm
    };
    const updatedFormElement = {
      ...updatedBrand[inputIdentifier]
    };
    
    updatedFormElement.value = targetValue;
    //updatedFormElement.value = event.target.value;
    
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
     if(inputIdentifier === 'category'){
		updatedFormElement.elementConfig.selected = selected;
		alert(selected.join(','));
	}
    updatedFormElement.touched = true;
    updatedBrand[inputIdentifier] = updatedFormElement;
    this.setState({ brandForm: updatedBrand }, () => {
			console.log('data value for category', this.state.brandForm);
	});
    
  }; 

  cancelHandler(){
    this.props.history.push("/brand");
  }
  
  submitHandler(e){
      e.preventDefault();
      let formSubmitFlag = true;
      if(formSubmitFlag){                
		let brandObj = {_id: this.state.brandId};
		for (let key in this.state.brandForm) {
			brandObj[key] = this.state.brandForm[key].value;
		}
		axios.put('/brand/updatebrand', brandObj).then(result => {
			if(result.data.code ===200){
				this.props.history.push("/brand");
			}
		});
      }
  }
  
	handleCategorySelect = (category) => {
	  this.inputChangedHandler(category, 'category');	  
	}
  componentDidMount() {            
   axios.all([
   axios.get('/brand/viewBrand/' + this.props.match.params.id),
     axios.get("/category/allCategories")     
   ])
   .then(axios.spread((resBrand,allcategories) => {	   
	   if(resBrand.data.code === 200){ 			      
          let brandForm = {...this.state.brandForm};         
          for (let key in brandForm) {			 
			  if (key === "category") {				
					console.log("resBrand",resBrand.data.result[key])  
					brandForm[key].value = resBrand.data.result[key];
					brandForm[key].elementConfig.selected = [resBrand.data.result[key]];
				} else {
					brandForm[key].value = resBrand.data.result[key];
				}
		  }			  
		  this.setState({brandForm: brandForm},function(){
					console.log("brandForm",this.state.brandForm);
			  });
        }
        
		if (allcategories.data.code === 200) {
          let oldState = this.state.brandForm;
          oldState.category.elementConfig.options = allcategories.data.result.filter((cat)=> (cat._id !== this.state.category));
          this.setState(
            {
              brandForm: oldState,
              requestStatus: true
            }, () => {
				console.log('HHHHHHHHHHHHHH', this.state.brandForm);
			}
          );
        }
        
        
   }))
   //.then(response => this.setState({ vehicles: response.data }))
   .catch(error => console.log(error));	
  }
  render() {
	  if(this.state.requestStatus){
		const formElementsArray = [];
		for (let key in this.state.brandForm) {
		  formElementsArray.push({
			id: key,
			config: this.state.brandForm[key]
		  });
		}   
		let form = (
		  <Form noValidate>
			{formElementsArray.map(formElement => (
			  <Row key={formElement.id}>
				<Col xs="4" sm="12">
				  <InputElement
					key={formElement.id}
					label={formElement.config.label}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					changed={event =>
					  this.inputChangedHandler(event, formElement.id)
					}
					treechanged={(event, data) => {
					  return this.handleTreeChange(event, data, formElement.id);
					}}
					value={formElement.config.value}
				  />
				</Col>
			  </Row>
			))}
			<Row>
			  <Col xs="6" className="text-right">
				<Button
				  onClick={e => this.submitHandler(e)}
				  color="success"
				  className="px-4"
				>
				  Submit
				</Button>
			  </Col>
			  <Col xs="6">
				<Button
				  onClick={() => this.cancelHandler()}
				  color="primary"
				  className="px-4"
				>
				  Cancel
				</Button>
			  </Col>
			</Row>
		  </Form>
		);
		
		return (
		  <div className="animated fadeIn">
			<Row>
			  <Col xs="12" sm="12">
				<Card>
				  <CardHeader>
					<strong>Brand</strong>
					<small> Edit</small>
					<Link to="/brand" className="btn btn-success btn-sm pull-right">Back</Link>
				  </CardHeader>
				  <CardBody>
					<Row>
					   <CardBody>{form}</CardBody>
					</Row>                
				   </CardBody>
				</Card>
			  </Col>
			</Row>
			</div>
		);
	}else{
		return null;
	}
  }
}
// ProjectItem.propTypes = {
//   project: PropTypes.object
// };
export default BrandEdit;

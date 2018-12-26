import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import CountrySelectBox from '../SelectBox/CountrySelectBox/CountrySelectBox';
import StateAllSelectBox from '../SelectBox/StateSelectBox/StateAllSelectBox';
import StateSelectBox from '../SelectBox/StateSelectBox/StateSelectBox';
import CitySelectBox from '../SelectBox/CitySelectBox/CitySelectBox';
import SubscriptionSelectBox from '../SelectBox/SubscriptionSelectBox/SubscriptionSelectBox';
import InputElement from "../InputElement/InputElement";
import GroupBox from '../SelectBox/GroupBox/GroupBox';

import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
var FD = require('form-data');
var fs = require('fs');
// import PropTypes from 'prop-types';
class UserEdit extends Component {
  constructor(props){
    super(props);
    //~ this.firstName = React.createRef();
    //~ this.middleName = React.createRef();
    //~ this.lastName = React.createRef();
    //~ this.username = React.createRef();
    //~ this.userType = React.createRef();
    //~ this.email = React.createRef();
    //~ this.phoneNumber = React.createRef();
    //~ this.dob = React.createRef();
    //~ this.address = React.createRef();
    //~ this.city = React.createRef();
    //~ this.state = React.createRef();
    //~ this.country = React.createRef();
    //~ this.zipCode = React.createRef();
    //~ this.subscriptionPlan = React.createRef();
    this.profilePic = React.createRef();

    let userId = this.props.match.params.id;
    
    this.state = {
      editUser: {
        firstName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "First Name"
          },
          value: "",
          label: "First Name",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        middleName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "First Name"
          },
          value: "",
          label: "Middle Name",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        lastName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "First Name"
          },
          value: "",
          label: "Last Name",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        userName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "User Name"
          },
          value: "",
          label: "Username",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        userType: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "User Type",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "First Name"
          },
          value: "",
          label: "Email",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        phoneNumber: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "First Name"
          },
          value: "",
          label: "Phone Number",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        dob: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "DOB"
          },
          value: "",
          label: "DOB",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        address: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "DOB"
          },
          value: "",
          label: "Address",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        city: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "DOB",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        state: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "State",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "Country",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
      
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "Zip Code",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        subscriptionPlan: {
          elementType: "input",
          elementConfig: {
            type: "text",
          },
          value: "",
          label: "Subscription Plan",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
      },
      userId: userId,
      loadedData:false,
      selectedFile:''
    };
  }
  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() != "" && isValid;
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
	let targetValue = event.target.value;
    const updatedUser = {
      ...this.state.editUser
    };
    const updatedFormElement = {
      ...updatedUser[inputIdentifier]
    };
    updatedFormElement.value = targetValue;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedUser[inputIdentifier] = updatedFormElement;
    this.setState({ editUser: updatedUser }, () => {
			//console.log('data value for category', this.state.categoryForm);
	});
  };
  
   fileChangedHandler = (event) => {
	  this.setState({selectedFile: event.target.files[0]}, function(){
		  console.log('Current state', this.state.selectedFile)
		});
   }
   handleCountry = (country) => {
     this.setState({country: country});
   }
   handleState = (state) => {
      this.setState({state: state}, function(){
		  console.log('Current state', this.state.state)
		});
   }
   handleCity = (city) => {
      this.setState({city: city});
   }
   handleSubscription = (subscriptions) => {
       this.setState({subscriptions: subscriptions});
   }

  cancelHandler(){
    this.props.history.push("/users");
  }
  
  submitHandler(e){
      e.preventDefault();
      let formSubmitFlag = true;
      for(let field in this.state.validation) {
        let lastValidFieldFlag = true;
        let addUser = this.state.validation;
        addUser[field].valid = null;
        for(let fieldCheck in this.state.validation[field].rules){
          switch(fieldCheck){
            case 'notEmpty':
              if(lastValidFieldFlag === true && this[field].value.length === 0){
                  lastValidFieldFlag = false;
                  formSubmitFlag = false;
                  addUser[field].valid = false;
                  addUser[field].message = addUser[field].rules[fieldCheck].message;

               }
              break;
            case 'emailCheck':
              if(lastValidFieldFlag === true && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this[field].value)){
                lastValidFieldFlag = false;
                formSubmitFlag = false;
                addUser[field].valid = false;
                addUser[field].message = addUser[field].rules[fieldCheck].message;
              }
              break;
            case 'minLength':
              if(lastValidFieldFlag === true && this[field].value.length < parseInt(this.state.validation[field].rules[fieldCheck].length)){
                lastValidFieldFlag = false;
                formSubmitFlag = false;
                addUser[field].valid = false;
                addUser[field].message = addUser[field].rules[fieldCheck].message;
              }
              break;
            case 'matchWith':
              if(lastValidFieldFlag === true && this[field].value !== this[this.state.validation[field].rules[fieldCheck].matchWithField].value){
                lastValidFieldFlag = false;
                formSubmitFlag = false;
                addUser[field].valid = false;
                addUser[field].message = addUser[field].rules[fieldCheck].message;
              }
              break;
          }
        }
        this.setState({ validation: addUser});
      }

      if(formSubmitFlag){
        const data = new FD()
        data.append('_id', this.props.match.params.id)
        data.append('firstName', this.firstName.value)
        data.append('middleName', this.middleName.value)
        data.append('lastName', this.lastName.value)
        data.append('userName', this.userName.value)
        data.append('userType', this.userType.value)
        data.append('email', this.email.value)
        data.append('phoneNumber', this.phoneNumber.value)
        data.append('dob', this.dob.value)
        data.append('address', this.address.value)
        data.append('city', this.city.value)
        data.append('state',this.state.value)
        data.append('country',this.country.value)
        data.append('zipCode', this.zipCode.value)
        data.append('subscriptionPlan',this.subscriptionPlan.value)
        if(this.state.selectedFile){
          data.append('profilePic', this.state.selectedFile)
        }
        axios.post('/user/updateUser', data).then(result => {
          if(result.data.code == '200'){
            this.props.history.push("/users");
          }
        });
      }
  }

  componentWillMount(){	
	  //if(localStorage.getItem('jwtToken') != null)
      //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/user/viewUser/' + this.state.userId).then(result => {
        if(result.data.code == 200){
          this.setState({ editUser: result.data.result,loadedData:true},function(){
          //  console.log("editUser",this.state.editUser.country._id)
          });
          //~ this.firstName.value = result.data.result.firstName;
          //~ this.middleName.value = result.data.result.middleName;
          //~ this.lastName.value = result.data.result.lastName;
          //~ this.userName.value = result.data.result.userName;
          //~ this.email.value = result.data.result.email;
          //~ this.userType.value = result.data.result.userType;         
          //~ this.phoneNumber.value = result.data.result.phoneNumber
          //~ this.dob.value = result.data.result.dob
          //~ this.address.value = result.data.result.address
          //~ this.city.value = result.data.result.city._id
          //~ this.state.value = result.data.result.state._id
          //~ this.country.value = result.data.result.country._id
          //~ this.zipCode.value = result.data.result.zipCode
          //~ this.subscriptionPlan.value = result.data.result.subscriptionPlan
          //this.profilePic.value = result.data.result.profilePic

        }
      })
      //~ .catch((error) => {
        //~ if(error.status === 401) {
          //~ this.props.history.push("/login");
        //~ }
      //~ });
  }
  
  render() {
	  const formElementsArray = [];
    for (let key in this.state.editUser) {
      formElementsArray.push({
        id: key,
        config: this.state.editUser[key]
      });
    }
    let formData = null;
	  formData = formElementsArray.map(formElement => <Row key={formElement.id}>
            <Col xs="4" sm="12">
			  <InputElement
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                changed={event =>
                  this.inputChangedHandler(event, formElement.id)
                }                
                value={formElement.config.value}
              />
            </Col>
          </Row>);
	  
	  
	  if(this.state.loadedData){
		return (
		  <div className="animated fadeIn">
			<Row>
			  <Col xs="12" sm="12">
				<Card>
				  <CardHeader>
					<strong>User Edit</strong>
					<small> </small>
				  </CardHeader>
				  <CardBody>
				  <Form noValidate>
				  {/*<Row>
                  <Col xs="4" sm="12">
                    <FormGroup>
                      <Label htmlFor="company">First name</Label><span className="required">*</span>
                      <Input type="text" invalid={this.state.validation.firstName.valid === false} innerRef={input => (this.firstName = input)} placeholder="First name" />
                       <FormFeedback invalid={this.state.validation.firstName.valid === false}>{this.state.validation.firstName.message}</FormFeedback>

                    </FormGroup>
                    </Col>
                    <Col xs="4" sm="12">
                    <FormGroup>
                      <Label htmlFor="middlename">Middle name</Label>
                      <Input type="text" innerRef={input => (this.middleName = input)} placeholder="Middle name" />
                    </FormGroup>
                    </Col>
                    <Col xs="4" sm="12">
                    <FormGroup>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input type="text" innerRef={input => (this.lastName = input)} placeholder="Last name" />
                    </FormGroup>
                  </Col>
                </Row>*/}
						{formData}
				  <GroupBox 
					countryId={(this.state.editUser.country)?this.state.editUser.country._id:''}
					stateId={(this.state.editUser.state)?this.state.editUser.state._id:''}
					cityId={this.state.editUser.city} 
					countryRef={(country)=> this.country=country}
					stateRef={(state)=> this.state=state} 
					cityRef={(city)=> this.city=city}					
					/>
				  {/*
					  <FormGroup>
				   <Label>Country</Label>
				   <CountrySelectBox onSelectCountry={this.handleCountry} reference={(country)=> this.country=country} value={(this.state.editUser.country)?this.state.editUser.country._id:''} />
				  </FormGroup>

				  <FormGroup>
				   <Label>State</Label>
				   <StateSelectBox onSelectState={this.handleState} reference={(state)=> this.state=state} countryId={(this.state.editUser && this.state.editUser.country)?this.state.editUser.country._id:'0'} value ={(this.state.editUser.state)?this.state.editUser.state._id:''}/>
				  </FormGroup>
				   <FormGroup>
				   <Label>City</Label>
				   <CitySelectBox onSelectCity={this.handleCity} reference={(city)=> this.city=city} value ={this.state.editUser.city} stateId={(this.state.editUser && this.state.editUser.state)?this.state.editUser.state._id:'0'}/>
				  </FormGroup>
					  
					  */}
					{/*<FormGroup>
					 <Label htmlFor="brand">Profile Image</Label>
					  <Input type="file" innerRef={input => (this.profilePic = input)} onChange={this.fileChangedHandler} placeholder="Advertisement Image" />
					  <img src={'assets/uploads/ProfilePic/'+this.state.editUser.profilePic} width="60"/>
					</FormGroup>*/}
					<Row>
					  <Col xs="6" className="text-right">
						<Button onClick={(e)=>this.submitHandler(e)} color="success" className="px-4">Submit</Button>
					  </Col>
					  <Col xs="6">
						<Button onClick={()=>this.cancelHandler()} color="primary" className="px-4">Cancel</Button>
					  </Col>
					</Row>
					</Form>
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
export default UserEdit;

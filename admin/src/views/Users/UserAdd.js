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
import moment from "moment";
import { 
  Button,  
  Card,
  CardBody,  
  CardHeader,
  Col,        
  Form,
  FormGroup, 
  FormFeedback,
  Input, 
  Label,
  Row,
} from 'reactstrap';
var FD = require('form-data');
var fs = require('fs');
const constant = require("../../config/constant");
// import PropTypes from 'prop-types';
class UserEdit extends Component {
  constructor(props){
    super(props);    
    this.profilePic = React.createRef();
    this.state = {
		subscriptions: [],
		countries:[],
		states: [],
		cities: [],
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
				placeholder: "Middle Name"
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
			password: {
			  elementType: "input",
			  elementConfig: {
				type: "password",
				placeholder: "Password"
			  },
			  value: "",
			  label: "Password",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false
			},	
			confirmPassword: {
			  elementType: "input",
			  elementConfig: {
				type: "password",
				placeholder: "Confirm Password"
			  },
			  value: "",
			  label: "Confirm Password",
			  validation: {
				required: true,
				validWith: 'password'
			  },
			  valid: false,
			  touched: false
			},			
			userType: {
			  elementType: "select-simple",
			  elementConfig: {
				type: "select",
				options: [],
				title: 'name'		
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
			  elementType: "date",
			  elementConfig: {
				type: "date",
				placeholder: "DOB",
				format: "DD/MM/YYYY"
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
				placeholder: "Address"
			  },
			  value: "",
			  label: "Address",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false
			},
			country: {
			  elementType: "group-box-country",
			  elementConfig: {
				type: "select",
				options: [],
				title:'countryName'
			  },
			  value: "",
			  label: "Country",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false,
			  countryId: true
			}, 
			state: {
			  elementType: "group-box-state",
			  elementConfig: {
				type: "select",
				options: [],
				title:'stateName'
			  },
			  value: "",
			  label: "State",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false,
			  stateId: true
			},
			city: {
			  elementType: "group-box-city",
			  elementConfig: {
				type: "select",
				options: [],
				title:'cityName'
			  },
			  value: "",
			  label: "City",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false,
			  cityId: true
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
			  elementType: "select-simple",
			  elementConfig: {
				type: "select",
				options: [],
				title: 'subscriptionName'		
			  },
			  value: "",
			  label: "Subscription Plan",
			  validation: {
				required: true
			  },
			  valid: false,
			  touched: false
			}
		},		  
		  loadedData:false,
		  selectedFile:''
    };
  }
  checkValidity(value, rules) {
    let isValid = true;
	console.log('Validity', value);
    if (rules.required) {
      isValid = typeof(value) === 'string' && value.trim() != "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.validWith){
		const editUser = {...this.state.editUser};		
		isValid = value ===  editUser[rules.validWith].value && isValid;
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
      targetValue,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedUser[inputIdentifier] = updatedFormElement;
    this.setState({ editUser: updatedUser }, () => {
		console.log('data USER : ' + inputIdentifier, this.state.editUser);
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
      const updatedUser = {...this.state.editUser};		
      for (let key in this.state.editUser) {
		const updatedFormElement = {
			...updatedUser[key]
		};
		updatedFormElement.valid = this.checkValidity(
		  updatedFormElement.value,
		  updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedUser[key] = updatedFormElement;
		formSubmitFlag = updatedFormElement.valid && formSubmitFlag;
	  }
	  this.setState({editUser:updatedUser});
      console.log('FORM Data', this.state.editUser);
      if(formSubmitFlag){
		e.preventDefault();
		const data = new FD()
		for (let key in this.state.editUser) {
		  //userObj[key] = this.state.editUser[key].value;
		  data.append(key, this.state.editUser[key].value);
		}
		data.append('_id', this.props.match.params.id);
		if(this.state.selectedFile){
          data.append('profilePic', this.state.selectedFile)
        }
		
        axios.post('/user/signup', data).then(result => {
          if(result.data.code == '200'){
            this.props.history.push("/users");
          }
        });
      }
  }

  componentWillMount(){	
	  //if(localStorage.getItem('jwtToken') != null)
      //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	  axios.get('/subscription/listingsubscription').then(result => {
		  if(result.data.code === 200){	
			 const editUser = {...this.state.editUser};
			  editUser['subscriptionPlan'].elementConfig.options = result.data.result;
			  editUser['userType'].elementConfig.options = constant.userType;
			this.setState({ editUser,loadedData:true},()=>{
				console.log('userType subscription', editUser, constant.userType);
				});
		  }
	  })
      //~ axios.get('/user/viewUser/' + this.state.userId).then(result => {
        //~ if(result.data.code == 200){
			
		 //~ let editUser = {...this.state.editUser};
		 //~ for(let key in editUser){
			//~ if(result.data.result[key]){
				//~ if(key === 'dob')
				  //~ editUser[key].value = moment(result.data.result[key], "YYYY-MM-DD").format("DD/MM/YYYY");
				//~ else if(key === 'country')	
				  //~ editUser[key].value = result.data.result[key]._id;
				//~ else if(key === 'state')	
				  //~ editUser[key].value = result.data.result[key]._id;
				//~ else if(key === 'city')	
				  //~ editUser[key].value = result.data.result[key]._id;
				//~ else
				  //~ editUser[key].value = result.data.result[key];
			//~ }
		 //~ }
		
          //~ this.setState({ loadedData:true, editUser}, () => {
			//~ if(this.state.editUser.country){
				//~ let e = {target: {value: this.state.editUser.country.value}};
				//~ this.onDropdownChange(e, 'country');
			//~ }  
		  //~ });
         
        //~ }
      //~ });
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
    let groupFlag = false;
    let formData = null;
    if(this.state.editUser.subscriptionPlan.elementConfig.options.length){
		  formData = formElementsArray.map(formElement => {
			//if(formElement.config.elementType !== 'group-box-multiple'){
			return <Row key={formElement.id}>
					<Col xs="4" sm="12">
					  <InputElement
						key={formElement.id}
						label={formElement.config.label}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						changed={event =>
						  this.inputChangedHandler(event, formElement.id)
						}
						valid={formElement.config.valid}            
						touched={formElement.config.touched}
						value={formElement.config.value}
					  />
					</Col>
				  </Row>;
		   //~ }else{		   
			 //~ switch(formElement.id){
			  //~ case 'country':
			  //~ return <Row key={formElement.id}>
					//~ <Col xs="4" sm="12"><FormGroup>
					  //~ <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  //~ <select
						  //~ key={formElement.id}
						  //~ className="form-control"
						  //~ onChange={event => 
							//~ this.onDropdownChange(event, 'country')					  
						  //~ }
						  //~ value={formElement.config.value}
						  //~ ref={formElement.config.elementConfig.reference}
						//~ >
						  //~ <option value="" >
							//~ --Select--
						  //~ </option>
						  //~ {this.state.countries.map(option => {
							  //~ return <option value={option._id} key={option._id}>
								//~ {option[formElement.config.elementConfig.title]}
							  //~ </option>
						  //~ })}
						//~ </select></FormGroup></Col>
							  //~ </Row>;
			 //~ case 'state':
			  //~ return <Row key={formElement.id}>
					//~ <Col xs="4" sm="12"><FormGroup>
					  //~ <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  //~ <select
						  //~ key={formElement.id}
						  //~ className="form-control"
						  //~ onChange={event => 
							//~ this.onDropdownChange(event, 'state')					  
						  //~ }
						  //~ value={formElement.config.value}
						  //~ ref={formElement.config.elementConfig.reference}
						//~ >
						  //~ <option value="">
							//~ --Select--
						  //~ </option>
						  
						  //~ {this.state.states.map(option => {
							  //~ return <option value={option._id} key={option._id}>
								//~ {option[formElement.config.elementConfig.title]}
							  //~ </option>
						  //~ })}
						//~ </select></FormGroup></Col>
					 //~ </Row>;
				//~ default:
					//~ return <Row key={formElement.id}>
					//~ <Col xs="4" sm="12">
					//~ <FormGroup>
					  //~ <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  //~ <select
						  //~ key={formElement.id}
						  //~ className="form-control"
						  //~ onChange={event => 
							//~ this.inputChangedHandler(event, 'city')					  
						  //~ }
						  //~ value={formElement.config.value}
						  //~ ref={formElement.config.elementConfig.reference}
						//~ >
						  //~ <option value="" >
							//~ --Select--
						  //~ </option>
						  
						  //~ {this.state.cities.map(option => {
							  //~ return <option value={option._id} key={option._id}>
								//~ {option[formElement.config.elementConfig.title]}
							  //~ </option>
						  //~ })}
						//~ </select>
					//~ </FormGroup>
					//~ </Col>
				//~ </Row>;
				//~ }
		   //~ }
		 });
	  }
	  
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
						{formData}				 
					<FormGroup>
					 <Label htmlFor="brand">Profile Image</Label>
					  <Input type="file" innerRef={input => (this.profilePic = input)} onChange={this.fileChangedHandler} placeholder="Advertisement Image" />
					  <img src={'assets/uploads/ProfilePic/'+this.state.editUser.profilePic} width="60"/>
					</FormGroup>
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
export default UserEdit;

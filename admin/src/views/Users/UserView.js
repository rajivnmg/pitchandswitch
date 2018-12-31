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
class UserView extends Component {
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
				placeholder: "Last Name"
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
				placeholder: "Email"
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
				placeholder: "Phone Number"
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
			  elementType: "group-box-multiple",
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
			  elementType: "group-box-multiple",
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
			  elementType: "group-box-multiple",
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
		  userId: userId,
		  loadedData:false,
		  selectedFile:''
    };
  }
  checkValidity(value, rules) {
    let isValid = false;
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
		console.log('data value for category', this.state.editUser);
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
  
  getCountry = () => {
	  return axios.get('/location/listActiveCountry');
  };
  
  getState = (countryId) => {
	  return axios.get('/location/getState/'+countryId);
  };
  
  getCity = (stateId) => {
	  return axios.get('/location/getCity/'+stateId);
  };
  submitHandler(e){
      e.preventDefault();
      let formSubmitFlag = true;      
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
		
        //~ const data = new FD()
        //~ data.append('_id', this.props.match.params.id)
        //~ data.append('firstName', this.firstName.value)
        //~ data.append('middleName', this.middleName.value)
        //~ data.append('lastName', this.lastName.value)
        //~ data.append('userName', this.userName.value)
        //~ data.append('userType', this.userType.value)
        //~ data.append('email', this.email.value)
        //~ data.append('phoneNumber', this.phoneNumber.value)
        //~ data.append('dob', this.dob.value)
        //~ data.append('address', this.address.value)
        //~ data.append('city', this.city.value)
        //~ data.append('state',this.state.value)
        //~ data.append('country',this.country.value)
        //~ data.append('zipCode', this.zipCode.value)
        //~ data.append('subscriptionPlan',this.subscriptionPlan.value)
        //~ if(this.state.selectedFile){
          //~ data.append('profilePic', this.state.selectedFile)
        //~ }
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
	  axios.get('/subscription/listingsubscription').then(result => {
		  if(result.data.code === 200){	
			 const editUser = {...this.state.editUser};
			  editUser['subscriptionPlan'].elementConfig.options = result.data.result;
			  editUser['userType'].elementConfig.options = constant.userType;
			this.setState({ editUser},()=>{
				console.log('userType subscription', editUser, constant.userType);
				});
		  }
	  })
      axios.get('/user/viewUser/' + this.state.userId).then(result => {
        if(result.data.code == 200){
			//~ editUser: result.data.result,
		 let editUser = {...this.state.editUser};
		 for(let key in editUser){
			if(result.data.result[key]){
				if(key === 'dob')
				  editUser[key].value = moment(result.data.result[key], "YYYY-MM-DD").format("DD/MM/YYYY");
				else if(key === 'country')	
				  editUser[key].value = result.data.result[key]._id;
				else if(key === 'state')	
				  editUser[key].value = result.data.result[key]._id;
				else if(key === 'city')	
				  editUser[key].value = result.data.result[key]._id;
				else
				  editUser[key].value = result.data.result[key];
			}
		 }
		
          this.setState({ loadedData:true, editUser}, () => {
			if(this.state.editUser.country){
				let e = {target: {value: this.state.editUser.country.value}};
				this.onDropdownChange(e, 'country');
			}  
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
      });
      //~ .catch((error) => {
        //~ if(error.status === 401) {
          //~ this.props.history.push("/login");
        //~ }
      //~ });
  }
  
  componentDidMount(){
	  if(this.state.countries.length === 0){
		  this.getCountry().then((data) => { 
			  if(data.data.code === 200) this.setState({countries: data.data.result}, () => {
				  console.log('componentDidMount', this.state.editUser);
				
			  })
		  });
	  }
  }
  onDropdownChange = (event, key) => {
	  let value = event.target.value;
	 // console.log('HHHHHHHHHHH onDropdownChange', event)
	  if(value != ''){
		  switch(key){
			  case 'state':
				  this.inputChangedHandler(event, 'state');
				  this.getCity(value).then((data) => {
					  if(data.data.code === 200) this.setState({cities: data.data.result})
				  });break;
			  default:
				  this.inputChangedHandler(event, 'country');
				  this.getState(value).then((data) => {console.log('Here in onDropdownChange country', data);
					  if(data.data.code === 200) this.setState({states: data.data.result}, () => {
						  let e = {target: {value: this.state.editUser.state.value}};
						  this.onDropdownChange(e, 'state');
					  })
				  });
			  
		  }
	  }
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
			if(formElement.config.elementType !== 'group-box-multiple'){
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
						value={formElement.config.value}
					  />
					</Col>
				  </Row>;
		   }else{		   
			 switch(formElement.id){
			  case 'country':
			  return <Row key={formElement.id}>
					<Col xs="4" sm="12"><FormGroup>
					  <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  <select
						  key={formElement.id}
						  className="form-control"
						  onChange={event => 
							this.onDropdownChange(event, 'country')					  
						  }
						  value={formElement.config.value}
						  ref={formElement.config.elementConfig.reference}
						>
						  <option value="0" key="0">
							--Select--
						  </option>
						  {this.state.countries.map(option => {
							  return <option value={option._id} key={option._id}>
								{option[formElement.config.elementConfig.title]}
							  </option>
						  })}
						</select></FormGroup></Col>
							  </Row>;
			 case 'state':
			  return <Row key={formElement.id}>
					<Col xs="4" sm="12"><FormGroup>
					  <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  <select
						  key={formElement.id}
						  className="form-control"
						  onChange={event => 
							this.onDropdownChange(event, 'state')					  
						  }
						  value={formElement.config.value}
						  ref={formElement.config.elementConfig.reference}
						>
						  <option value="0" key="0">
							--Select--
						  </option>
						  
						  {this.state.states.map(option => {
							  return <option value={option._id} key={option._id}>
								{option[formElement.config.elementConfig.title]}
							  </option>
						  })}
						</select></FormGroup></Col>
					 </Row>;
				default:
					return <Row key={formElement.id}>
					<Col xs="4" sm="12">
					<FormGroup>
					  <Label htmlFor={formElement.config.label}>{formElement.config.label}</Label>
					  <select
						  key={formElement.id}
						  className="form-control"
						  onChange={event => 
							this.inputChangedHandler(event, 'city')					  
						  }
						  value={formElement.config.value}
						  ref={formElement.config.elementConfig.reference}
						>
						  <option value="0" key="0">
							--Select--
						  </option>
						  
						  {this.state.cities.map(option => {
							  return <option value={option._id} key={option._id}>
								{option[formElement.config.elementConfig.title]}
							  </option>
						  })}
						</select>
					</FormGroup>
					</Col>
				</Row>;
				}
		   }
		 });
	  }
	  
	  if(this.state.loadedData){
		return (
		  <div className="animated fadeIn">
			<Row>
			  <Col xs="12" sm="12">
				<Card>
				  <CardHeader>
					<strong>View User</strong>
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
export default UserView;

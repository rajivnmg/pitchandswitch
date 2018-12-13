import React, { Component } from 'react';
import Style from './register.css';
import registerIcon from '../../images/register-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { Label, Input } from 'reactstrap';
const TEST_SITE_KEY = "6LcCA34UAAAAAMW_poPblvTfPh6IuCMfqKfpdN_k";
var FD = require('form-data');
var fs = require('fs');
/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/
class Form extends Component {
    
    
  state = {
    isValidated: false
  };
 
  validate = () => {
    const formEl = this.formEl;
    const formLength = formEl.length;
   if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }
      return false;
    } else {
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }
      return true;
    }
  };
  submitHandler = event => {
    event.preventDefault();
    if (this.validate()) {
      this.props.submit();
    }
    this.setState({ isValidated: true });
  };
  render() {
    const props = [...this.props];
    let classNames = [];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }
    if (this.state.isValidated) {
      classNames.push("was-validated");
    }
    return (
      <form
        {...props}
        className={classNames}
        noValidate
        ref={form => (this.formEl = form)}
        onSubmit={this.submitHandler}
      >
        {this.props.children}
      </form>
    );
  }
}


class Register extends React.Component {
       constructor(props){
    super(props);
       
		this.state = {
		  type: 'password',
          address: '' ,
		  score: 'null',
		  countryId :'',
		  stateId :'',
		  cityId : '',
		  countries:[{_id:'',countryName:''}],
		  states:[{_id:'',stateName:''}],
		  cities:[{_id:'0',cityName:'Select City'}],
		  registerForm: {
			name: '',
			email:'',
			phone: '',
			password:'', 
			C_password:'',
			//address:'',
			address1:'',
			latitude:'',
			longitude:'',
			country:'',
			state:'',
			city:'',
			zipCode:''			
		  },
		 gmapsLoaded: false
		}
		this.showHide = this.showHide.bind(this);
	    this.handleChangeCountry = this.handleChangeCountry.bind(this);
	    this.handleChangeState = this.handleChangeState.bind(this);
	    this.handleChangeCity = this.handleChangeCity.bind(this);
	    this.recaptchaRef = React.createRef();	    
	}
	
 initMap = () => {
		this.setState({
		  gmapsLoaded: true
		});
  };

	handleChange = address => {
		const regForm = {...this.state.registerForm};
		regForm.latitude = "";
		regForm.longitude = "";

		this.setState({registerForm:regForm});
		this.setState({ address });
	};
	
	handleSelect = address => {
      
   const registForm = {...this.state.registerForm};
    registForm.address = address;
    this.setState({registerForm:registForm});
    this.setState({address:address});
    
    
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const regForm = {...this.state.registerForm};
        
        regForm.latitude = latLng['lat'];
        regForm.longitude = latLng['lng'];
        console.log('HERE',  latLng['short_name'])
        this.setState({registerForm:regForm});
    })
      .catch(error => console.error('Error', error));
  };
	
	handleChangeCountry(event) {
	
    //console.log("handleChangeCountry",event.target.value)
    this.setState({countryId:event.target.value})
    if(event.target.value !== "0"){
     axios.get('/location/getState/'+event.target.value).then(result =>{
		// console.log("state",result.data.result)
			this.setState({states:result.data.result,cities:[{_id:'',cityName:''}]})		 
		 })
	 }
    //this.setState({value: event.target.value});
  }
	handleChangeState(event) {
	this.setState({stateId:event.target.value})
    //console.log("handleChangeState",event.target.value)
    if(event.target.value !== "0"){
		axios.get('/location/getCity/'+event.target.value).then(result =>{
			 //console.log("city",result.data.result)
				this.setState({cities:result.data.result,})
				if(result.data.result.length){
					this.setState({state:result.data.result[0]._id})
					this.setState({cityId:result.data.result[0]._id})
				}
			 })
		//this.setState({value: event.target.value});
	}
  }
	handleChangeCity(event) {
    //console.log("handleChangeCity",event.target.value)
    this.setState({cityId:event.target.value})
    this.setState({state: event.target.value});
  }
  componentDidMount(){		
		window.initMap = this.initMap
		//console.log("COmponentDIDmaount")
		axios.get('/location/listActiveCountry').then(result => {
			//	console.log("result", result)
				this.setState({countries:result.data.result})
		})		
		  
	}
  showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })  
  }
  state = {
    showFormSuccess: false
  };
  
  inputChangedHandler = (event, inputIdentifier) => {
    const NewUserForm = {
      ...this.state.registerForm
    };
    const updatedFormElement = {
      ...NewUserForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    NewUserForm[inputIdentifier] = updatedFormElement;    
    this.setState({ registerForm: NewUserForm }, function(){
		//console.log(this.state.registerForm)
		});
  };
  
  submit = () => {	
	const recaptchaValue = this.recaptchaRef.current.getValue();
	if(!recaptchaValue){
		this.setState({
			message: "Captcha is not valid",
			showFormError: true
		});
		window.scrollTo(0, 0);
		return ;
	}	
	 const data =new FD()
	// console.log("this.firstName.value",this.state.registerForm.name.value)
        data.append('firstName', (this.state.registerForm.name)?this.state.registerForm.name.value:''),
        data.append('middleName', ''),
        data.append('lastName',(this.state.registerForm.lastName)?this.state.registerForm.lastName.value:''),
        data.append('userName', (this.state.registerForm.name)?this.state.registerForm.name.value:''),
        data.append('password',(this.state.registerForm.password)?this.state.registerForm.password.value:''),
        data.append('email', (this.state.registerForm.email)?this.state.registerForm.email.value:''),
        data.append('profilePic', ''),
        data.append('phoneNumber',(this.state.registerForm.phoneNumber)?this.state.registerForm.phoneNumber.value:''),
        data.append('dob', ''), 
        data.append('address',(this.state.registerForm.address)?this.state.registerForm.address:''),
        data.append('address1',(this.state.registerForm.address1)?this.state.registerForm.address1:''),
		data.append('latitude',(this.state.registerForm.latitude)?this.state.registerForm.latitude:''),
		data.append('longitude',(this.state.registerForm.longitude)?this.state.registerForm.longitude:''),
        data.append('city', this.state.cityId),
		// data.append('address', this.state.address),
        data.append('state', this.state.stateId),
        data.append('country', this.state.countryId),
        data.append('zipCode', (this.state.registerForm.zipCode)?this.state.registerForm.zipCode.value:''),
       // data.append('subscriptionPlan','')
        data.append('userStatus','1')
        //console.log("data",data,this.state)
        axios.post('/user/userSignup', data).then(result => {
         // console.log('USER DATA', data)
         if(result.data.code ==200){			    
			  this.setState({
				message: result.data.message,
				code :result.data.code, 
				showFormSuccess: true,
				showFormError: false
			  });
			  window.scrollTo(0, 0)
			}else{
			  this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
			  });
			}
		  })
		  .catch((error) => {
			//console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: 'Login failed. Username or Email not match' });
				// network error
			}
		  });   
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000);
  }   
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
      Congratulation!!! You have successfully registerd, A verification link has been sent to your registed email, Please verify to access your account.
        
      </div>
    );
  }
  
  formatEndpoint = () => {
    const form = [...this.state.registerForm];
	let endpoint = this.state.registerForm.longitude;
	//alert(endpoint)
	if(endpoint==""){
		this.setState({address:""});
	}
	
    
  };
    _renderErrorMessage() {
    return (
      <div align="center" className={"errorMessage alert alert-danger mt-4"} role="alert">
       {this.state.message}
      </div>
    );
  }
  render() {
    return (
            <div className="login-container">
        <div  className="container">
           <a href="/" className="backBtn">&nbsp;</a>
        <div className="cl"></div>
          <div className="login">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row login-row">
				<img className='login-icon' src={registerIcon} alt="" />
				<h3>Register</h3>
				<p>Fill your details and start swapping</p>
            </div>
          
              <Form submit={this.submit}>
                 {this.state.showFormError ? this._renderErrorMessage() : null}
                 
        
               <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"name"}>Name</label>
                  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} onChange={(e) => this.inputChangedHandler(e, 'name')} type={"name"} placeholder="Enter your name" />
                </div>
                 <div className="form-row">
                  <div className="invalid-feedback validation"> </div>   
                    <span className="astrik">*</span>
                     <label className="label" htmlFor={"name"}>Name</label>
                    <input id={"lastName"} className={"form-control textBox"} required={true} name={"lastName"} onChange={(e) => this.inputChangedHandler(e, 'lastName')} type={"name"} placeholder="Enter your name" />
                </div>
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>
                   <span className="astrik">*</span>
                      <label className="label" htmlFor={"email"}>
                    Email Address
                  </label>
                  <input
                    id={"email"}
                    className={"form-control textBox"}
                    required={true}
                    name={"email"}
                    type={"email"}
                    onChange={(e) => this.inputChangedHandler(e, 'email')}
                    placeholder="Enter your email address"
                    />
                  
                </div>
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"phoneNumber"}>Phone Number</label>
                  <input id={"phoneNumber"} className={"form-control textBox"} onChange={(e) => this.inputChangedHandler(e, 'phoneNumber')} required={true} name={"phoneNumber"} type={"tel"} placeholder="Enter your phone number" />
                </div>
                <div className="form-row  password-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"password"} >Password</label>
                  <input id={"password"} className={"form-control textBox"} required={true} name={"password"} type={"password"} onChange={(e) => this.inputChangedHandler(e, 'password')} minLength={6} pattern="(?=.*\d)(?=.*[a-z]).{6,}" type={this.state.type} placeholder="Password"  />
                  <span className={this.state.type === 'input' ? 'password_show Hide' : 'password_show'} onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                  <small className="small-instruction">Must be at least 6 characters long, contain letters and numbers</small>
                  
                </div>
                <div className="form-row  password-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"C_password"} >Retype Password</label>
                  <input id={"C_password"} className={"form-control textBox"} onChange={(e) => this.inputChangedHandler(e, 'C_password')} required={true} name={"C_password"} type={"password"} minLength={6} pattern="(?=.*\d)(?=.*[a-z]).{6,}" type={this.state.type} placeholder="Password"   />
                  <span className={this.state.type === 'input' ? 'password_show Hide' : 'password_show'} onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                  <small className="small-instruction">Must be at least 6 characters long, contain letters and numbers</small>
                  
                </div>
				{/*<div className="form-row">
                 <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"addressss"}>Address Line Geo</label>
                  <input id={"address"} className={"form-control textBox"} onChange={(e) => this.inputChangedHandler(e, 'addressss')} required={true} name={"address"} type={"text"} placeholder="" />
                </div>*/}
				<input className={"form-control textBox hide2"} value={this.state.registerForm.latitude} name={"latitude"} type={"text"} placeholder="" />
                 <input className={"form-control textBox hide2"} value={this.state.registerForm.longitude}  name={"longitude"} type={"text"} placeholder="" />
				<div className="form-row">
				<div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"addressss"}>Address Line1</label>
					  {this.state.gmapsLoaded && (
						  <PlacesAutocomplete
							value={this.state.address} 
							onChange={this.handleChange}
							onSelect={this.handleSelect}
							name={"address"}
						>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

								<div>
								<input 
								  {...getInputProps({
									placeholder: 'Search Places ...',
									className: 'location-search-input form-control'			
									})}
									onBlur={this.formatEndpoint}
									required={true}
								/>
								<div className="autocomplete-dropdown-container">
								  {loading && <div>Loading...</div>}
								  {suggestions.map(suggestion => {
									const className = suggestion.active
									  ? 'suggestion-item--active'
									  : 'suggestion-item';
									// inline style for demonstration purpose
									const style = suggestion.active
									  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
									  : { backgroundColor: '#ffffff', cursor: 'pointer' };
									return (
									  <div
										{...getSuggestionItemProps(suggestion, {
										  className,
										  style,
										})}
									  >
										<span>{suggestion.description}</span>
									  </div>
									);
								  })}
								</div>
								</div>
								)}
								</PlacesAutocomplete>        
						   )}
        </div>
            <div className="form-row">
                <label className="label" htmlFor={"address1"}>Address Line 2</label>
                  <input id={"address1"} className={"form-control textBox"}   name={"address1"} type={"text"} placeholder="" />
                  <input className={"form-control textBox hide2"} value={this.state.registerForm.address1} name={"address1"} type={"text"} placeholder="" onChange={(e) => this.inputChangedHandler(e, 'address1')}/>
                  
                  </div> 
                  <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>             
                  <span className="astrik">*</span>
                  <Label className="label" htmlFor={"country"}>Country</Label>
				  <Input type="select" name="country" id="country" className={"form-control textBox"} onChange={this.handleChangeCountry}>
					<option value="0">Select Country</option>
					{
						this.state.countries.map( function(country,index) { 
						return(<option key={index} value={country._id}>{country.countryName}</option>);
					})
					}
				  </Input>
				  {/* <label className="label" htmlFor={"country"}>Country</label>
                  <input id={"country"} className={"form-control textBox"} required={true} name={"country"} type="select" placeholder="" /> */}
                  </div>
                  <div className="colum right">
					<div className="invalid-feedback validation"> </div>             
					<span className="astrik">*</span>
                  <label className="label" htmlFor={"state"}>State</label>
                   <Input type="select" name="state" id="state" className={"form-control textBox"} onChange={this.handleChangeState}>
					<option value="0">Select State</option>
					{
						this.state.states.map( function(state,index){ 
						return(<option key={index} value={state._id}>{state.stateName}</option>);
					})
					}
				  </Input>
                  
                  {/*<input id={"state"} className={"form-control textBox"} required={true} name={"state"} type={"text"} placeholder="" /> */}
                  
                  </div>
                  <div className="cl"></div>
                  
        </div>
				<div className="form-row">
				  <div className="colum">
				  <div className="invalid-feedback validation"> </div>   
				  <span className="astrik">*</span>

					<label className="label" htmlFor={"city"}>City</label>
					 <Input type="select" name="city" id="city" className={"form-control textBox"} onChange={this.handleChangeCity}>					
					{
						this.state.cities.map( function(city,index) { 
						return(<option key={index} value={city._id}>{city.cityName}</option>);
					})
					}
				  </Input>
				 {/* <input id={"city"} className={"form-control textBox"} required={true} name={"city"} type={"text"} placeholder="" />*/}
				  </div>
				  <div className="colum right">
				<div className="invalid-feedback validation"> </div>          
				<span className="astrik">*</span>

				  <label className="label" htmlFor={"zipCode"}>ZIP / Postal Code</label>
				  <input id={"zipCode"} className={"form-control textBox"} required={true} name={"zipCode"} onChange={(e) => this.inputChangedHandler(e, 'zipCode')} type={"text"} placeholder="" />
				 </div>
				  <div className="cl"></div>
				  
				</div>
                
			<div className="form-row">
				<ReCAPTCHA
				  style={{ display: "inline-block" }}
				  ref={this.recaptchaRef}
				  size="normal"
				  sitekey={TEST_SITE_KEY}
				  badge={"inline"}
				/>				
				<div className="cl"></div>
			</div>
                 <div className="form-row">
                    <button
                      type={"submit"}
                      className={"submitBtn"}
                      >
                     Register
                    </button>
                  </div>
                 <div className="form-row no-padding">
                   <div className="colum">
					<p className="no-account center-text"><Link to={"/"}>Home</Link></p>
				   </div>
				   <div className="colum right">
                    <p className="no-account center-text">Already have an account? <Link to="/Login"> Login</Link></p>
                   </div>
                 </div>
              </Form>
            </div>
            <div className="cl"> </div>
          </div>
      </div>
    );
  }
}
 
export default Register;

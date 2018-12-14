import React, { Component } from 'react';
import forgetIcon from '../../images/forget-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/
class Form extends React.Component {
	constructor() {
    super();
    this.email = React.createRef();    
    this.state = {
	forgotForm: {
			email : ''
		},        
      message: '',
      code:9999,
      showFormSuccess : false,
	  showFormError : false,
    };
  }
  
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
class Forget extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      type: 'password',
      score: 'null'
    }
    this.showHide = this.showHide.bind(this);
  
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
    const updatedForm = {
      ...this.state.forgotForm
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;    
    this.setState({ forgotForm: updatedForm }, function(){console.log(this.state.forgotForm)});
  };
  
  
  submit = () => {	
		const email = this.state.forgotForm.email.value;
		axios.post('/user/forgotPasswordWeb', { email: email, userType: '0'})
		  .then((result) => {
			console.log('Forget password result', result)
			if(result.data.code ==200){
			  localStorage.setItem('jwtToken', result.data.result.accessToken);         
			  this.setState({
				message: result.data.message,
				code :result.data.code, 
				showFormSuccess: true,
				showFormError: false
			  });
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
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: 'Login failed. Username or Email not match' });
				// network error
			}
		  });   
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000)
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
		Reset Password link has been sent successfully to your registered email address,! Please Check Your Mail To Reset Password     
      </div>
    );
  }
   _renderErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4"} role="alert">
        Oops! Something Went wrong!!!
      </div>
    );
  }
  render() {
    return (
            <div className="login-container">
        <div  className="container">
           <p className="Backs"><Link to={"/"} className="backBtn">Back to Home </Link></p>
        <div className="cl"></div>
          <div className="login">          
          
            <div className="form-row login-row">
                                <img className='login-icon' src={forgetIcon} alt="" />
                                <h3>Forget</h3>
                                <p>Provide your registered email address</p>
                            </div>
             
              <Form submit={this.submit}>
					{this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                   {this.state.showFormError ? this._renderErrorMessage() : null}
                <div className="form-row">
                <div className="invalid-feedback validation" > </div><span className="astrik">*</span>
                  <label className="label" htmlFor={"email"} >Email Address </label>
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
                    <button
                      type={"submit"}
                      className={"submitBtn"}
                      >
                   Submit
                    </button>
                  </div>
					
              </Form>
            
          
        </div>
        <div className="cl"></div>
      </div>
      </div>
      
    );
  }
}
 
export default Forget;

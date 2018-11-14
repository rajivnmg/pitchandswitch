import React, { Component } from 'react';
import Warper from "../common/Warper";
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import axios from 'axios'
import jquery from 'jquery'

const contentStyle = {
    maxWidth: "460px",
    width: "90%"
};


class LoginPopup extends Component {
  constructor(props){
		super(props);
		this.email = React.createRef();
		this.password = React.createRef();
		this.state = {
 		  userID :this.props.UserID,
 		  proID :this.props.proID, 		 
		  loginForm: {
				email : '',
				password : '',
				type: 'password',
				score: 'null'
		  },
			email: '',
			password: '',
			showFormSuccess : false,
			showFormError : false,
			showEmailVerification :false,
			showInactiveError :false,
			message:''
		}
		this.showHide = this.showHide.bind(this);		
	}
	
	
	state = {
       showFormSuccess: false
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
  
  
  showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })  
  }
 
	 inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = {
		  ...this.state.loginForm
		};
		const updatedFormElement = {
		  ...updatedForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.touched = true;
		updatedForm[inputIdentifier] = updatedFormElement;    
		this.setState({ loginForm: updatedForm }, function(){
	   });
      }; 
  
  
   submitHandler = event => {
    event.preventDefault();
    if (this.validate()) {
      this.props.submit();
    }
    this.setState({ isValidated: true });
  };
  
   submit = () => {	  	
	const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    axios.post('/user/login', { email: email, password:password, userType: '0'})
      .then((result) => {	
		  console.log("result",result)	  
         if(result.data.code === 200){		  
          localStorage.setItem('jwtToken', result.data.token);
          this.setState({ message: '' });          
				
			if(result.data.result.subscriptionStatus === '0'){
				window.location.href='/subscription';
			} else if(this.state.userID == (result.data.result?result.data.result._id:'')) {
				window.location.href='/my-trade-detail/'+this.state.proID;
			} else  {
			    window.location.reload();	
			}
					
        } else if(result.data.code === 403){
			this.setState({showInactiveError: true});
			this.setState({ message: result.data.message });			
		} else{			
          this.setState({
            showFormError: true
          });          
        }
      })
      .catch((error) => {
        if(!error.status) {
			this.setState({showFormError: true});
			this.setState({ message: 'Login failed. Username or password not match' });			
		}
      });	  
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError:false,showEmailVerification:false,showInactiveError:false});}, 12000)
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4 "} role="alert">
			Form was successfully submitted!
      </div>
    );
  }
  _renderErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4 inactiveUserError"} role="alert">
        Oops! Something Went wrong!!!
      </div>
    );
  }
  _renderRespErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4 inactiveUserError"} role="alert">
        {this.state.message}
      </div>
    );
  }
   _renderEmailVerificationSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Your email has been successfully verified! Please Login.
      </div>
    );
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Form was successfully validated and is ready to be submitted!
      </div>
    );
  }
  render() {
	  
    return (
       <Popup
       trigger={ <a href="#" className = 'ditch' > Pitch Now </a>}
       modal contentStyle = { contentStyle}
         lockScroll  >
          {
		   close => (
			<div className="modal">
			  <a className="close" onClick={close}>&times;</a>
			<div className="header ">Welcome, Please login
			<div className="cl"></div>
			</div>
			
    
    
        <div>
        <div >
        <div className="cl"></div>
          <div className="login">
            {this.state.showEmailVerification ? this._renderEmailVerificationSuccessMessage() : null}
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null} 
         
            <div>
              <Form submit={this.submit}>
               {this.state.showFormError ? this._renderErrorMessage() : null}
                 {this.state.showInactiveError ? this._renderRespErrorMessage() : null}
                <div>
                <div className="form-row">
                <div className="invalid-feedback validation" /> <span className="astrik">*</span>
                  <label className="label"
                    htmlFor={"email"}
                    >
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
                </div>
                <div className="form-row password-row">
                <div className="invalid-feedback validation" /> <span className="astrik">*</span>
                  <label className="label"
                    htmlFor={"password"}
                    >
                    Password
                  </label>
                  <input
                    id={"password"}
                    className={"form-control textBox"}
                    required={true}
                    name={"password"}
                    type={"password"}
                    minLength={6}
                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
					onChange={(e) => this.inputChangedHandler(e, 'password')}
                      type={this.state.type} 
                    />
                    <span className={this.state.type === 'input' ? 'password_show Hide' : 'password_show'} onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                     <small className="small-instruction">Must be at least 6 characters long, contain letters and numbers</small>
                  
                </div>
                 <div className="form-row">
                <button
                     type={"submit"}
                      className={"submitBtn"}
                      >
                     Login
                    </button> 
                  </div>
                 <div className="form-row no-padding">
                    <p className="no-account">Don't have an account? <Link to="/register">Register now</Link></p>
                     <Link to="/forget">Forgot password?</Link>
                     </div>
              </Form>
            </div>
          </div>
          <div className="cl"> </div>
        </div>
        </div>       
		  </div>
		)
     }
   </Popup>
    );
  }
}
class Form extends React.Component {
  state = {
    isValidated: false
  }; 
  validate = () => {
    const formEl = this.formEl;
    const formLength = formEl.length;
    if(formEl.checkValidity() === false) {
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

export default LoginPopup;

import React, { Component } from 'react';
import Style from './login.css';
import loginIcon from '../../images/login-page-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/
class Form extends Component {	
	constructor(){
			super();
			this.email = React.createRef();
			this.password = React.createRef();
			this.state = {
				loginForm: {
					email : '',
					password : ''
					
				},
		    email: '',
			password: '',
			showFormSuccess : false,
			showFormError : false,
			showEmailVerification :false,
			showInactiveError :false,
			message:''
			}
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
  
  componentDidMount(){
		if(this.props.match.params.id){
			axios.get('/user/verifyUserEmail/'+this.props.match.params.id).then(result => {
				 if(result.data.code === 200){
					this.setState({user:result.data.result})
					this.setState({
						showEmailVerification: true
					});
				}
			})		
		}
		setTimeout(() => {this.setState({showFormSuccess: false,showFormError:false,showEmailVerification:false});}, 12000)
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
		//console.log(this.state.loginForm)
		});
  };
  
  submit = () => {	  	
	const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    axios.post('/user/login', { email: email, password:password, userType: '0'})
      .then((result) => {		  
         if(result.data.code === 200){		  
          localStorage.setItem('jwtToken', result.data.token);
          this.setState({ message: '' });          
			//console.log("result",result.data.result)
			if(result.data.result.subscriptionStatus === '0'){
				window.location.href='/subscription';
			}else{
				window.location.href='/dashboard';
			}			
			//this.props.history.push('/dashboard');
        }else if(result.data.code === 403){
			this.setState({showInactiveError: true});
			this.setState({ message: result.data.message });			
		}else{			
          this.setState({
            showFormError: true,
            message: result.data.message
          });          
        }
      })
      .catch((error) => {
        if(!error.status) {
			this.setState({showFormError: true});
			this.setState({ message: 'Login failed. Username or password not match' });			
		}
      });	  
    //this.setState({showFormSuccess: true});
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
         {this.state.message}
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
  render() {
	   const { email, password, message } = this.state;
    return (
       <div className="login-container">
        <div  className="container">        	
         <a href="/" className="backBtn">&nbsp;</a>
          <div className="cl"></div>
          <div className="login">
           {this.state.showEmailVerification ? this._renderEmailVerificationSuccessMessage() : null}
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}          
            <div className="form-row login-row">
				<img className='login-icon' src={loginIcon} alt="" />
				<h3>Login</h3>
				<p>Please login to your Pitch and Switch account</p>
				</div>
            <div>
              <Form submit={this.submit}>
                <div>
                 {this.state.showFormError ? this._renderErrorMessage() : null}
                 {this.state.showInactiveError ? this._renderRespErrorMessage() : null}
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
                <button type={"submit"} className={"submitBtn"}>
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
    );
  }
}
 
export default Register;

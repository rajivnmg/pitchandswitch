import React, { Component } from 'react';
import resetIcon from '../../images/reset-icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios'
/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/
class Form extends React.Component {	
	 constructor() {
    super();    
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
		this.state = {
			message: '',
			code:9999,
			resetPassword: {password:'',confirmPassword:''},
			isValidated: false,
			showFormSuccess: false,
			showFormError: false
		};
	}
  
  
  state = {
   
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
      ...this.state.resetPassword
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;    
    this.setState({ resetPassword: updatedForm });
  };
  
  submit = () => {
	  const password = this.state.resetPassword.password.value;    
	  const confirmPassword = this.state.resetPassword.confirmPassword.value;
	  if(password === confirmPassword){
        axios.post('/user/updateNewPassword',{_id:this.props.match.params.id,password:password}).then(result => {      
          if(result.data.code === 200){         
             this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false				
			}); 
          }else{
			  this.state = {showFormSuccess: false,showFormError: true};
		  }
        });
	}else{
		this.state = {showFormSuccess: false,showFormError: true};
	}        
   // this.setState({showFormSuccess: true});
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError:false});}, 12000)
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Password has been reset successfully! Please login!
      </div>
    );
  }
  _renderErrorMessage() {
    return (
      <div className={"alert alert-danger mt-4"} role="alert">
        Oops! Something went wrong.
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
         
            <div className="form-row login-row">
                                <img className='login-icon' src={resetIcon} alt="" />
                                <h3>Reset Password</h3>
                                <p>Reset your Pitch and Switch account password here</p>
                            </div>
            <div>
              <Form submit={this.submit}>
                 {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
                   {this.state.showFormError ? this._renderErrorMessage() : null}
                <div className="form-row password-row">
                <div className="invalid-feedback validation"></div> <span className="astrik">*</span>
                  <label className="label"
                    htmlFor={"password"}
                    >
                   New Password
                  </label>
                  <input
                    id={"password"}
                    className={"form-control textBox"}
                    required={true}
                    name={"password"}
                    type={"password"}
                    minLength={6}
                    onChange={(e) => this.inputChangedHandler(e, 'password')}
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                   placeholder={"Create a new password"}
                      type={this.state.type} 
                    />
                     <span className={this.state.type === 'input' ? 'password_show Hide' : 'password_show'} onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                  <small className="small-instruction">Must be at least 6 characters long, contain letters and numbers</small>
                   </div>
                
                <div className="form-row password-row">
                <div className="invalid-feedback validation"></div> <span className="astrik">*</span>
                  <label className="label"
                    htmlFor={"password"}
                    >
                   Confirm Password
                  </label>
                  <input
                    id={"confirmPassword"}
                    className={"form-control textBox"}
                    required={true}
                    name={"confirmPassword"}
                    type={"password"}
                    minLength={6}
                    onChange={(e) => this.inputChangedHandler(e, 'confirmPassword')}
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                   placeholder={"re-enter new password"}
                      type={this.state.type} 
                    />
                     <span className={this.state.type === 'input' ? 'password_show Hide' : 'password_show'} onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                   
                   </div>
                
                 <div className="form-row">
                    <button
                      type={"submit"}
                      className={"submitBtn"}
                      >
                     Update
                    </button>
                  </div>
                 <div className="form-row no-padding">
                            <p className="no-account center-text">Back to <Link to="/login">Login</Link></p>
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

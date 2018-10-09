import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
const contentStyle = {
    maxWidth: "460px",
    width: "90%"
};

const CustomModal = () => (
<Popup
    trigger={ <a href="#" className = 'ditch' > Pitch Now </a>}
modal
        contentStyle = {
            contentStyle}
    lockScroll 

    >
    {
            close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header ">Welcome, Please login
                                <div className="cl"></div>
                            </div>
                             <Register />
                        </div>
                        )
}
</Popup>
            );
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
  submit = () => {
    this.setState({showFormSuccess: true});
    setTimeout(() => {this.setState({showFormSuccess: false});}, 5000)
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
            <div>
        <div >
           
        <div className="cl"></div>
          <div className="login">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
         
            <div>
              <Form submit={this.submit}>
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
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                   
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

            export default Warper(CustomModal);

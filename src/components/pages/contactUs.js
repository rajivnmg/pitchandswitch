import React, { Component } from 'react';
//import Style from './addNewProduct/addnewproduct.css';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
//import PicturesWall from './common/picturesWall';
 
class ColorPicker extends React.Component {
   render() {
    return <SketchPicker />
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
class Register extends React.Component {
  
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
            <div className="add-product-container">
        <div  className="container">
		<div className="breadcrumb">
			<ul>
				<li><Link to={ (localStorage.getItem('isLoggedIn') === 1)?'/dashboard':'/'  }>Home</Link></li>
				<li>Help</li>
			</ul> 
        </div>
              <div className="cl"></div>
          <div className="add-product">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row">
             <h3>Contact Us</h3>
            </div>
              <Form submit={this.submit}>
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"name"}>Name</label>
                  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" defaultValue="Robert Dawney Jr." />
                </div>
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"name"}>Email</label>
                  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" defaultValue="robertdawney.jr@gmail.com" />
                </div>
                        <div className="form-row">
                        <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"description"}>Message</label>
                  <textarea id={"description"} className={"form-control textBox"} required={true} name={"description"} type={"description"} placeholder="" defaultValue=""></textarea>
                </div>
                 <div className="form-row no-padding">
                    <button type={"submit"} className={"submitBtn"}>Submit</button>
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

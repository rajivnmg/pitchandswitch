import React, { Component } from 'react';
import Style from './addnewproduct.css';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import PicturesWall from '../common/picturesWall';
 
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
        <li><a href="/">Home</a></li><li><a href={'/my-treasure-chest'}>My Treasure Chest</a></li><li>Add New Product</li>
        </ul>
        </div>
              <div className="cl"></div>
          <div className="add-product">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row">
                                <h3>Add New Product</h3>
            </div>
          
              <Form submit={this.submit}>
                 
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"name"}>Product name</label>
                  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" />
                </div>
                        <div className="form-row">
                        <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                  <label className="label"
                    htmlFor={"description"}
                    >
                   Description
                  </label>
                  <textarea
                    id={"description"}
                    className={"form-control textBox"}
                    required={true}
                    name={"description"}
                    type={"description"}
                    placeholder=""
                    ></textarea>
                  
                </div>
                <div className="form-row">
                  <label className="label">Add product a photo</label>
                  <PicturesWall />
                </div>
                <div className="form-row">
                  <label className="label">Color</label>
                  <ColorPicker />
                  
                </div>
               
                 <div className="form-row">
                 <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"category"}>Category</label>
                  <div className="select-box">
                  <select required={true} name={"category"}>
                  <option >Select</option>
                  <option>Toy</option>
                  </select>
                  </div>
                </div>
                 
                  <div className="form-row">
                  <div className="colum">
        <div className="invalid-feedback validation"> </div>             
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"size"}>Size</label>
                  <input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"text"} placeholder="" defaultValue="Meduim" /></div>
                  <div className="colum right">
        <div className="invalid-feedback validation"> </div>             
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"brand"}>Brand</label>
                  <input id={"brand"} className={"form-control textBox"} required={true} name={"brand"} type={"text"} placeholder="" defaultValue="barbie" /></div>
                  <div className="cl"></div>
                  
        </div>
        <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>Age</label>
                  <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="6 months" /></div>
                  <div className="colum right">
         <div className="invalid-feedback validation"> </div>          
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>Condition</label>
                  <div className="select-box">
                  <select required={true} name={"condition"}>
                  <option>Select</option>
                  <option>Good</option>
                  </select>
                  </div></div>
                  <div className="cl"></div>
                  
        </div>
        <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"status"}>Status</label>
                   <div className="select-box">
                   <select required={true} name={"status"}>
                  <option>Select</option>
                  <option>Active</option>
                  <option>In-Active</option>
                  </select>
                  </div>
                  </div>
                  <div className="colum right">&nbsp;</div>
                  <div className="cl"></div>
                  
                 </div>
                
                 <div className="form-row no-padding">
                    <button
                      type={"submit"}
                      className={"submitBtn"}
                      >
                    Save
                    </button>
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

import React, { Component } from 'react';
//import Style from './addNewProduct/addnewproduct.css';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import axios from 'axios'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Spin, Icon, Alert } from 'antd';
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
  constructor(props) {
		super(props);
		this.state = {
			subscription:this.props.subscription,
			isProcess : false,
			showFormSuccess:false,
			showFormError:false,
			isValidated:false,
			message:'',
			addContactForm: {
				name:'',
				email:'',
				description:''
			}
		}
	}
	
  inputChangedHandler = (event, inputIdentifier) => {	
		const contactForm = {
		  ...this.state.addContactForm
		};
		contactForm[inputIdentifier] = event.target.value;    
		this.setState({ addContactForm: contactForm });
	};

  submit = () => {
		const data = this.state.addContactForm;		
		console.log("submit",data)
		this.setState({isProcess:true}) 
		axios.post('/user/contustUs', data).then(result => {        
         if(result.data.code === 200){
			  this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false,
				isProcess:false
			  });				 		  
			}else{
			  this.setState({
				message: result.data.messaage,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
				isProcess:false
			  });
			}
		  })
		  .catch((error) => {
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: this.state.message });

			}
		  });   
     setTimeout(() => {this.setState({showFormError: false,showFormSuccess: false});						 
	 }, 12000);
  }
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Thank you! Your query has been posted successfully.
      </div>
    );
  }
   _renderErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4"} role="alert">
         Oops! some error occurs.
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
              <If condition={this.state.isProcess === true}>
				<Then>
					<Spin tip="Loading...">
						<Alert	message="Message being post..."	description="Please wait..." type="info"/>
					</Spin>
				</Then>	
			  </If>
						<Form submit={this.submit}>
						<div className="form-row">
						 {this.state.showFormError ? this._renderErrorMessage() : null}		
						<div className="invalid-feedback validation"> </div>   
						<span className="astrik">*</span>
						  <label className="label" htmlFor={"name"}>Name</label>
						  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" onChange={(e) => this.inputChangedHandler(e, 'name')} defaultValue="" />
						</div>
						<div className="form-row">
						<div className="invalid-feedback validation"> </div>   
						<span className="astrik">*</span>
						  <label className="label" htmlFor={"name"}>Email</label>
						  <input id={"email"} className={"form-control textBox"} required={true} name={"email"} type={"email"} placeholder="Enter your email" onChange={(e) => this.inputChangedHandler(e, 'email')} defaultValue="" />
						</div>
								<div className="form-row">
								<div className="invalid-feedback validation"> </div>
						<span className="astrik">*</span>
						  <label className="label" htmlFor={"description"}>Message</label>
						  <textarea id={"description"} className={"form-control textBox"} required={true} name={"description"} type={"description"} placeholder="" onChange={(e) => this.inputChangedHandler(e, 'description')} defaultValue=""></textarea>
						</div>
						 <div className="form-row no-padding">
							<button type={"submit"} className={"submitBtn"} disabled={(this.state.isProcess)?'disabled':''}>Submit</button>
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

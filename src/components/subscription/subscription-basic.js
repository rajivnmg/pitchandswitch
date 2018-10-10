import React, { Component } from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios'
import { Link } from 'react-router-dom';
var FD = require('form-data');
var fs = require('fs');
const contentStyle = {
    maxWidth: "560px",
    width: "90%"
};

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

class subscriptionBasic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subscription:this.props.subscription,
			message:'',
			addPaymentForm: {
				cardHolderName:'',
				cardNumber:'',
				expiryMonth:'',
				expiryYear:'',
				cardCVV:''
			}
		}
		console.log("subscriptionBasic POPUP props", this.props)
	}
	
	state = {
	   isValidated: false
	};
	componentWillMount(){
		console.log("userData",localStorage.getItem('userId'),localStorage.getItem('userEmail'))
	}
	
	
	inputChangedHandler = (event, inputIdentifier) => {
		//console.log("event",event.target.value)
			const paymentForm = {
			  ...this.state.addPaymentForm
			};
			paymentForm[inputIdentifier] = event.target.value;    
			this.setState({ addPaymentForm: paymentForm });
		};
	
	submit = () => {
		const data = this.state.addPaymentForm;
		data.userEmail = localStorage.getItem('userEmail');
		data.userId =  localStorage.getItem('userId');
		data.amount =  this.state.subscription.price;
		data.subscriptionId =  this.state.subscription._id;
		console.log("submit",data)
        axios.post('/subscription/payOnStripe', data).then(result => {        
         if(result.data.code === 200){
			  this.setState({
				message: result.data.message,
				code :result.data.code,
				showFormSuccess: true,
				showFormError: false
			  });
			  this.props.history.push("/my-treasure-chest");
			}else{
			  this.setState({
				message: result.data.messaage,
				code :result.data.code,
				showFormError: true,
				showFormSuccess: false,
			  });
			}
		  })
		  .catch((error) => {
			console.log('error', error);
			if (!error.status) {
				 this.setState({ showFormError: true,showFormSuccess: false,message: this.state.message });

			}
		  });
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000);
  }
 _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
      Congratulation!!! You have successfully subscribe the plan <Link to={'/dashboard'}> Go to dashboard </Link> Or it will automaticaly redirect in 10 second.
        
      </div>
    );
  }
  
 _renderErrorMessage() {
    return (
      <div align="center" className={"alert alert-danger mt-4"} role="alert">
        {this.state.message}
      </div>
    );
  }
  
render() {
   return (
<Popup
    trigger={<a className= 'getStarted-btn'>Get Started</a>} modal contentStyle = {contentStyle} lockScroll>
    {
        close => (
    <div className="modal">
        <a className="close" onClick={close}>
            &times;
        </a>
        <Form submit={this.submit}>
        <div className="header"> Enter payment details </div>
        <div className="content">
            <div className="form-row">
                <label className="label"> You have selected:</label>
                <div className="gold-div">
                    <strong>{this.state.subscription.subscriptionName}</strong> ${this.state.subscription.price}
                </div>
            </div> 
             {this.state.showFormError ? this._renderErrorMessage() : null}
             {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row">
                <span className="astrik">*</span>
                <label className="label"> Name</label>
                <input type="text" id={"cardHolderName"} required={true} name={"cardHolderName"} type={"cardHolderName"}  onChange={(e) => this.inputChangedHandler(e, 'cardHolderName')} placeholder="Card holder name" className="form-control textBox"/>
              
            </div>
            <div className="form-row">
                <span className="astrik">*</span>
                <label className="label">Card Number</label>
                <input type="text" id={"cardNumber"} required={true} name={"cardNumber"} type={"cardNumber"}  onChange={(e) => this.inputChangedHandler(e, 'cardNumber')} placeholder="Card Numer" className="form-control textBox"/>
            </div>

            <div className="form-row">
                <div className="colum">
                    <span className="astrik">*</span>
                    <label className="label">Expiry Month</label>                    
                    <input type="text" id={"expiryMonth"} required={true} name={"expiryMonth"} type={"expiryMonth"}  onChange={(e) => this.inputChangedHandler(e, 'expiryMonth')} placeholder="07" className="form-control textBox"/>
                </div>
                 <div className="colum right">
                    <span className="astrik">*</span>
                    <label className="label">Expiry Year</label>                    
                    <input type="text" id={"expiryYear"} required={true} name={"expiryYear"} type={"expiryYear"}  onChange={(e) => this.inputChangedHandler(e, 'expiryYear')} placeholder="2018" className="form-control textBox"/>
                </div>                
			</div>
			 
			<div className="cl"></div>               
			<div className="form-row">
				 <span className="astrik">*</span>
				<label className="label">Security code</label>
				<input type="text" id={"cardCVV"} required={true} name={"cardCVV"} type={"cardCVV"}  onChange={(e) => this.inputChangedHandler(e, 'cardCVV')} placeholder="CVV" className="form-control textBox"/>
			</div>
               <div className="form-row">
               {/*<input type="submit" className="" onClick={()=>this.getTokenAndSubmit(this.state.subscription)} value={"Pay $"+this.state.subscription.price} /> */}
               <input type="submit" className="" value={"Pay $"+this.state.subscription.price} />
            </div>
            <div className="form-row">
            <p className="secureicon">Secure payments</p>
            </div>
            <div className="form-row no-padding">
            <p className="payInst">This payments use a secure 128-bit SSL encryption</p>
            </div>

        </div>
	</Form>
    </div>
    )}
</Popup>
)}
}
export default subscriptionBasic;

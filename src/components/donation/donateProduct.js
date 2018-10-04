import React, { Component } from 'react';
import Style from '../donation/addnewproduct.css';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import PicturesWall from '../common/picturesWall';
import CategorySelectBox from '../../components/CategorySelectBox/CategorySelectBox';
import axios from 'axios'
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
	 selectedFiles: '',
	   addProductForm: {
			productName:'',
			description:'',
			productCategory:'',
			size:'',
			color:'',
			brand:'',
			productAge:'',
			condition:'',
			productImages:'',
			productStatus:'0'
		},
	   Categories: [],
	   brands: [],
	   sizes: [],
	   conditions: [],
	   categoryValue: '',
	   background: '#fff',
	   validation:{
		productName:{
		  rules: {
			notEmpty: {
			  message: 'Product name field can\'t be left blank',
			  valid: false
			}
		  },
		  valid: null,
		  message: ''
		},
		 showFormSuccess: false
	  }
	};

	constructor(props){
		super(props);
	}
  handleCategory = (category) => {
			const productForm = {
			  ...this.state.addProductForm
			};
			productForm['productCategory'] = category;    
			this.setState({ addProductForm: productForm });
		}
		cancelHandler(){
			this.props.history.push("/my-treasure-chest");
		}

		// set the selected file in to state
		handlePictureChange = (event) => {
		  let oldFiles = [];
		  event.map((file) => {
			console.log('FIle', file);
			if (file.response && file.response.code === 200) {
			  // Component will show file.url as link
			  oldFiles.push({
				filename: file.response.result[0].filename,
				size: file.response.result[0].size,
				path: file.response.result[0].path
			  });
			}
		  });
		  this.setState({selectedFiles: JSON.stringify(oldFiles)});
		}

		// Set The cureent color on change color
		handleChangeComplete = (color) => {
			const productForm = {
			  ...this.state.addProductForm
			};
			productForm['color'] = color.hex;    
			this.setState({ addProductForm: productForm });
		};		
		
		componentDidMount() {
			//GET ALL Brand
			axios.get('/brand/listingbrand').then(result => {
				this.setState({brands:result.data.result})
			})
			//GET ALL Condition
			axios.get('/donation/getConstant').then(result => {
				this.setState({conditions:result.data.result})
			})
			//GET ALL Size
			axios.get('/size/listingsize').then(result => {
				this.setState({sizes:result.data.result})
			})
		}

		inputChangedHandler = (event, inputIdentifier) => {
			const productForm = {
			  ...this.state.addProductForm
			};
			productForm[inputIdentifier] = event.target.value;    
			this.setState({ addProductForm: productForm });
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
        <li><a href="/">Home</a></li><li><a href="#">Donated Products</a></li><li>Donate Product</li>
        </ul>
        </div>
              <div className="cl"></div>
          <div className="add-product">
           {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row">
                                <h3>Donate Product</h3>
            </div>
          
              <Form submit={this.submit}>
                 
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"name"}>Product name</label>
                  <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" defaultValue="" />
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
                    placeholder="" defaultValue=""
                    ></textarea>
                  
                </div>
                <div className="form-row">
                  <label className="label">Add product a photo</label>
                  <PicturesWall />
                </div>
                <div className="form-row">
                  <label className="label">Color</label>
                    <div className="select-box">
                  <select required={true} name={"category"} defaultValue="">
                  <option >Red</option>
                  <option >Green</option>
                  </select>
                  </div>
                  
                </div>
               
                 <div className="form-row">
                 <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"category"}>Category</label>
                  
                  <CategorySelectBox onSelectCategory={this.handleCategory}/>
                  
                </div>
                 
                  <div className="form-row">
                  <div className="colum">
        <div className="invalid-feedback validation"> </div>             
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"size"}>Size</label>
                  <input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"text"} placeholder="" defaultValue="" /></div>
                  <div className="colum right">
        <div className="invalid-feedback validation"> </div>             
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"brand"}>Brand</label>
                  <input id={"brand"} className={"form-control textBox"} required={true} name={"brand"} type={"text"} placeholder="" defaultValue="barbie" /></div>
                  <div className="cl"></div>
                  
        </div>
        <h5 className="heading2">Pickup address</h5>
        <div className="form-row">
         <label className="label" htmlFor={"age"}>Address Line 1:</label>
         <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="2865" />
        <div className="cl"></div>
        </div>
        <div className="form-row">
         <label className="label" htmlFor={"age"}>Address Line 2:</label>
         <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="Geraldine Lane" />
        <div className="cl"></div>
        </div>
        <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>City</label>
                  <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="New York" /></div>
                  <div className="colum right">
         <div className="invalid-feedback validation"> </div>          
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>State</label>
                   <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="NY" /></div>
                  <div className="cl"></div>
                  
        </div><div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>ZIP / Postal Code:</label>
                  <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="6 months" /></div>
                  <div className="colum right">
         <div className="invalid-feedback validation"> </div>          
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>Country</label>
                  <div className="select-box">
                  <select required={true} name={"condition"}  defaultValue="Good">
                  <option>Select</option>
                  <option>Good</option>
                  </select>
                  </div></div>
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

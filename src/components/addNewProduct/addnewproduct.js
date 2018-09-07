import React, { Component } from 'react';
import Style from './addnewproduct.css';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import PicturesWall from '../common/picturesWall';
import CategorySelectBox from '../../components/CategorySelectBox/CategorySelectBox';
//import BrandSelectBox from '../../components/BrandSelectBox/BrandSelectBox';
//import SizeSelectBox from '../../components/SizeSelectBox/SizeSelectBox';
import axios from 'axios';
var FD = require('form-data');
var fs = require('fs');
class ColorPicker extends Component {
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
		constructor(props){
			super(props);			
			this.productName = React.createRef();
			this.description = React.createRef();
			this.parent = React.createRef();
			this.status = React.createRef();
			this.productImages = React.createRef();
			this.category = React.createRef();
			this.author = React.createRef();
			this.condition = React.createRef();
			this.brand = React.createRef();
			this.size = React.createRef();
			this.state = {
			   addProductForm: {
					productName:'',
					description:'',
					productCategory:'',
					size:'',
					color:'',
					brand:'',
					productAge:'',
					condition:'',
					productImages:''
				},
			   Categories: [],
			   brands: [],
			   sizes: [],
			   conditions: [],
			   categoryValue: '',
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
			
			
			this.categoryhandleContentChange = this.categoryhandleContentChange.bind(this)
		}


		categoryhandleContentChange(value) {
		this.setState({categoryValue:value })
		}

		fileChangedHandler = (event) => {
		  this.setState({selectedFile: event.target.files[0]})
		}
		
		handleCategory = (category) => {
			this.setState({categoryValue:category });
		}
		handleBrand = (brand) => {
			this.setState({brand: brand});
		}
		handleSize = (size) => {
			this.setState({size: size});
		}
		cancelHandler(){
		this.props.history.push("/products");
		}
		
		// set the selected file in to state
		handlePictureChange = (event) => {
			console.log("FILESSS",event,)
		  this.setState({selectedFile: event})
		}

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
		fileChangedHandler = (event) => {
		   this.setState({selectedFile: event.target.files[0]})
		}

		conditionsChange = (value) => {
		   this.setState({conditionValue: value.target.value});
		}
		
		inputChangedHandler = (event, inputIdentifier) => {
		const NewProductForm = {
		  ...this.state.addProductForm
		};
		const NewProductFormElement = {
		  ...NewProductForm[inputIdentifier]
		};
		NewProductFormElement.value = event.target.value;
		NewProductFormElement.touched = true;
		NewProductForm[inputIdentifier] = NewProductFormElement;    
		this.setState({ addProductForm: NewProductForm }, function(){console.log(this.state.addProductForm)});
		};
  
  submit = () => {	  
		const data =new FD()
		
        data.append('productName', (this.state.addProductForm.productName)?this.state.addProductForm.productName.value:''),
        data.append('description', (this.state.addProductForm.description)?this.state.addProductForm.description.value:''),
        data.append('productCategory',this.state.categoryValue),
        data.append('size',(this.state.addProductForm.size)?this.state.addProductForm.size.value:''),
        data.append('color', (this.state.addProductForm.color)?this.state.addProductForm.color.value:''),
        data.append('brand', (this.state.addProductForm.brand)?this.state.addProductForm.brand.value:''),
        data.append('productAge',(this.state.addProductForm.productAge)?this.state.addProductForm.productAge.value:''),
        data.append('condition', (this.state.addProductForm.condition)?this.state.addProductForm.condition.value:''),
        data.append('productStatus',(this.state.addProductForm.productStatus)?this.state.addProductForm.productStatus.value:'1'),
        data.append('userId','1');
        if(this.state.selectedFile){
		    data.append('productImages', this.state.selectedFile);
      	}
      	console.log("data",data)
      	console.log("this state",this.state)
       
        axios.post('/product/addProduct', data).then(result => {
          console.log('USER DATA', data)
         if(result.data.code ==200){			    
			  this.setState({
				message: result.data.message,
				code :result.data.code, 
				showFormSuccess: true,
				showFormError: false
			  });
			  //this.props.history.push("/products");
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
				 this.setState({ showFormError: true,showFormSuccess: false,message: 'ERROR in Adding Product, Please try again!!!' });
				
			}
		  });   
    setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000);
	  
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
                  <input id={"productName"} className={"form-control textBox"} required={true} name={"productName"} type={"productName"} placeholder="Enter your name"  onChange={(e) => this.inputChangedHandler(e, 'productName')} />
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
                    onChange={(e) => this.inputChangedHandler(e, 'description')}
                    placeholder=""
                    ></textarea>
                  
                </div>
                <div className="form-row">
                  <label className="label">Add product a photo</label>
                  <PicturesWall onHandlePicture={this.handlePictureChange}/>
                </div>
                <div className="form-row">
                  <label className="label">Color</label>
                  <ColorPicker />
                  
                </div>
               
                 <div className="form-row">
                 <div className="invalid-feedback validation"> </div>   
                <span className="astrik">*</span>
				
                  <label className="label" htmlFor={"category"}>Category<br/></label>
                
                  <CategorySelectBox onSelectCategory={this.handleCategory}/>
                
                </div>
                 
                  <div className="form-row">
                  <div className="colum">
        <div className="invalid-feedback validation"> </div>             
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"size"}>Size</label>
                 {/*<input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"text"} placeholder="" defaultValue="Meduim" />*/}
                 {/*  <SizeSelectBox onSelectSize={this.handleSize}/> */}
                 <div className="select-box">
							  <select required={true} name={"size"} id={"size"}  onChange={(e) => this.inputChangedHandler(e, 'size')}>
							  <option value="">Select Brand</option>
							 { 
								 this.state.sizes.map(size =>{
									return(<option key={size._id} value={size._id}>{size.size}</option>)
								})
							}
							  </select>
						</div>
                  </div>
                   
                  <div className="colum right">
						<div className="invalid-feedback validation"> </div>             
						<span className="astrik">*</span>
						<label className="label" htmlFor={"brand"}>Brand</label>
						 <div className="select-box">
							  <select required={true} name={"brand"}  id={"brand"} onChange={(e) => this.inputChangedHandler(e, 'brand')}>
							  <option value="">Select Brand</option>
							 {
								 this.state.brands.map(brand =>{
									return (<option key={brand._id} value={brand._id}>{brand.brandName}</option>)
							  })
							 }
							  </select>
						</div>
						{/*<input id={"brand"} className={"form-control textBox"} required={true} name={"brand"} type={"text"} placeholder="" defaultValue="barbie" /> */}
						{/*	<BrandSelectBox onSelectBrand={this.handleBrand}/> */}
							</div>
                    
                  <div className="cl"></div>
                  
        </div>
        <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>Age</label>
                  <input id={"productAge"} className={"form-control textBox"} onChange={(e) => this.inputChangedHandler(e, 'productAge')} required={true} name={"productAge"} type={"text"} placeholder="Age" defaultValue="" /></div>
                  <div className="colum right">
         <div className="invalid-feedback validation"> </div>          
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>Condition</label>
                  <div className="select-box">
                  <select required={true} name={"condition"} id={"condition"} onChange={(e) => this.inputChangedHandler(e, 'condition')}>
                  <option value="">Select</option>
					{this.state.conditions.map(condition => {
							return (<option  key={condition.id} value={condition.id}>{condition.name}</option>)
						})
					}
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
                   <select required={true} name={"productStatus"} id={"productStatus"} onChange={(e) => this.inputChangedHandler(e, 'productStatus')}>                 
                  <option value="1">Active</option>
                  <option value="0">In-Active</option>
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

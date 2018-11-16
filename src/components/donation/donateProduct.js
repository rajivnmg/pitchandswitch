import React, { Component } from 'react';
import Style from '../donation/addnewproduct.css';
import { Link } from 'react-router-dom';
import PicturesWall from '../common/picturesWall';
import CategorySelectBox from '../../components/CategorySelectBox/CategorySelectBox';
import axios from 'axios'
import Colors from '../colors';
var FD = require('form-data');
var fs = require('fs');

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
class DonateProduct extends React.Component {
  constructor(props){
		super(props);
		  this.state = {
			 selectedFiles: '',
			   donateProductForm: {
					productName:'RRRRRRR',
					description:'',
					productCategory:'',
					size:'',
					color:'',
					brand:'',
					productAge:'',
					condition:'',
					productImages:'',
					productStatus:'0',
					name:'',
					email:'',
					contactNumber:'',
					address1:'',
					address2:'',
					zipCode:''
				},
			   Categories: [],
			   brands: [],
			   sizes: [],
			   conditions: [],
			   colors: '',
			   colorsValue: '',
			   user:[],
			   countryId :'',
				stateId :'',
				cityId : '',
				countries:[{_id:'',countryName:''}],
				states:[{_id:'',stateName:''}],
				cities:[{_id:'0',cityName:'Select City'}],
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
			
			this.handleChangeCountry = this.handleChangeCountry.bind(this);
			this.handleChangeState = this.handleChangeState.bind(this);
			this.handleChangeCity = this.handleChangeCity.bind(this);	
	}	
		handleCategory = (category) => {
			const productForm = {
			  ...this.state.donateProductForm
			};
			productForm['productCategory'] = category;    
			this.setState({ donateProductForm: productForm });
		}

		// set the selected file in to state
		handlePictureChange = (event) => {
		  let oldFiles = [];
		  event.map((file) => {
			//console.log('FIle', file);
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
			  ...this.state.donateProductForm
			};
			productForm['color'] = color.hex;    
			this.setState({ donateProductForm: productForm });
		};		
		
		handleChangeCountry(event) {
			console.log("handleChangeCountry",event.target.value)	    
			this.setState({countryId:event.target.value})
			if(event.target.value !== "0"){
			 axios.get('/location/getState/'+event.target.value).then(result =>{		
					this.setState({states:result.data.result,cities:[{_id:'',cityName:''}]})		 
				 })
			 }
		}
		
		handleChangeState(event) {
			this.setState({stateId:event.target.value})    
			if(event.target.value !== "0"){
				axios.get('/location/getCity/'+event.target.value).then(result =>{				
						this.setState({cities:result.data.result,})
						if(result.data.result.length){
							this.setState({state:result.data.result[0]._id})
							this.setState({cityId:result.data.result[0]._id})
						}
					 })
			  }
		}
		handleChangeCity(event) {  
			this.setState({cityId:event.target.value})
			this.setState({state: event.target.value});
		}
		componentWillMount(){
			if(localStorage.getItem('jwtToken') !== null){	
				axios.get('/user/getLoggedInUser').then(result => {						
					if(result.data.code === 200){					
						this.setState({ 
							user:result.data.result,
						});											
					}
				})
			}
			
		}
		
		componentDidMount() {			
		  axios.all([							
				axios.get('/size/listingsize/'),
				axios.get('/brand/listingbrand/'),
				axios.get('/product/getColors/'),
				axios.get('/donation/getConstant/'),
				axios.get('/location/getLocation')
			  ])
			  .then(axios.spread((rsize, rbrand,rcolor,rconstant,rcountries) => {
				if(rsize.data.code === 200){
				  this.setState({sizes:rsize.data.result});
				}
				if(rbrand.data.code === 200){
				  this.setState({brands:rbrand.data.result});
				}
				if(rcolor.data.code === 200){
				  this.setState({colors:rcolor.data.result});
				}
				if(rconstant.data.code === 200){
				  this.setState({conditions:rconstant.data.result});
				}
				if(rcountries.data.code === 200){
				  this.setState({countries:rcountries.data.result})
				}
			}))      
			.catch(error => console.log(error));
		}

	inputChangedHandler = (event, inputIdentifier) => {
		const productForm = {
		  ...this.state.donateProductForm
		};
		productForm[inputIdentifier] = event.target.value;    
		this.setState({ donateProductForm: productForm });
	};
	
	// change color 
	changeThisColor = (e) => {
		    this.setState({colorsValue: e.target.value});
			 const colors = this.state.colors;
			 let selectedColors = [];
			//~ colors.map((item, index) => {
				//~ colors[index].checked  = false;
			  //~ if(colors[index].checked == undefined) colors[index].checked = false;
			  //~ colors[index].checked  = false;
			  //~ if(item.id === e.target.value){
				//~ colors[index].checked = true;
			  //~ }else{
				  //~ colors[index].checked = false;
			  //~ }			 
			//~ });
			
			colors.map((item, index) => {
			  colors[index].checked  = false;	 
			  if(item.id === e.target.value){
				colors[index].checked = true;
			  }			 
			});
			
			this.setState({colors: colors});
	};
		
	
	submit = () => {
	const data =new FD()
	const formData = this.state.donateProductForm;
	Object.keys(formData).forEach((key,index) => {
	//~ console.log('HHHHHH', key, formData[key]);
		if(key == 'productImages'){
		 if(this.state.selectedFiles){				
			data.append('files', this.state.selectedFiles);				
		 } 
		} else if(key == 'userId'){
		  data.append('userId', '1');	
		} else {
		  data.append(key,formData[key]);  
		}
	});
	
		data.append('city', this.state.cityId),
        data.append('state', this.state.stateId),
        data.append('country', this.state.countryId),
        data.append('color', this.state.colorsValue),
		//console.log("city,state,country,color",this.state.cityId,this.state.stateId,this.state.countryId,this.state.colorsValue)
	     axios.post('/donation/donateProduct', data).then(result => {         
			 if(result.data.code ==200){
				  this.setState({
					message: result.data.message,
					code :result.data.code,
					showFormSuccess: true,
					showFormError: false
				  });
				  this.props.history.push("/donated-products");
				} else {
				  this.setState({
					message: result.data.messaage,
					code :result.data.code,
					showFormError: true,
					showFormSuccess: false,
				  });
				}
			  })
			  .catch((error) => {			
				if (!error.status) {
					 this.setState({ showFormError: true,showFormSuccess: false,message: 'ERROR in Adding Product, Please try again!!!' });
				}
			  });
		setTimeout(() => {this.setState({showFormSuccess: false,showFormError: false});}, 12000);
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
        <div className="container">
        <div className="breadcrumb">
        <ul>
        <li><Link to={'/dashboard'}>dashboard</Link></li>
        <li><Link to={'/donated-products'}>Donated Products</Link></li>
        <li>Donate Product</li>
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
					<input id={"name"} className={"form-control textBox"} required={true} name={"productName"} type={"productName"} placeholder="Enter product name" onChange={(e) => this.inputChangedHandler(e, 'productName')} defaultValue="" />
                </div>
                <div className="form-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                  <label className="label" htmlFor={"description"}>Description</label>
                  <textarea id={"description"} className={"form-control textBox"} required={true} name={"description"}
                    type={"description"} onChange={(e) => this.inputChangedHandler(e,'description')} placeholder="" defaultValue="">
                  </textarea>
                  
                </div>
                <div className="form-row">
                  <label className="label">Add product a photo</label>
                 <PicturesWall multiple={false} onHandlePicture={this.handlePictureChange}/>
                </div>
                <div className="form-row">
                  <label className="label">Color</label>
                   <div className="">
                  <Colors colorList={this.state.colors} changeThisColor={this.changeThisColor}/>
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
			</div>
			<div className="cl"></div>
		</div>
		<div className="form-row">
         <h2 className="heading2"> Pickup address  </h2>
        <div className="cl"></div>
        </div>
       
        
        <div className="form-row">
        <span className="astrik">*</span>
         <label className="label" htmlFor={"name"}>Name:</label>
         <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"text"} placeholder="" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'name')}/>
        <div className="cl"></div>
        </div>
        <div className="form-row">
        <span className="astrik">*</span>
         <label className="label" htmlFor={"email"}>Email:</label>
         <input id={"email"} className={"form-control textBox"} required={true} name={"email"} type={"email"} placeholder="" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'email')}/>
        <div className="cl"></div>
        </div>
        <div className="form-row">
        <span className="astrik">*</span>
         <label className="label" htmlFor={"contactNumber"}>Contact Number:</label>
         <input id={"contactNumber"} className={"form-control textBox"} required={true} name={"contactNumber"} type={"number"} placeholder="" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'contactNumber')} />
        <div className="cl"></div>
        </div>
        <div className="form-row">
        <span className="astrik">*</span>
         <label className="label" htmlFor={"address1"}>Address Line 1:</label>
         <input id={"address1"} className={"form-control textBox"} required={true} name={"address1"} type={"text"} placeholder="" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'address1')}/>
        <div className="cl"></div>
        </div>
        <div className="form-row">
         <label className="label" htmlFor={"address1"}>Address Line 2:</label>
         <input id={"address2"} className={"form-control textBox"} name={"address2"} type={"text"} placeholder="" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'address2')} />
        <div className="cl"></div>
        </div>
        <div className="form-row">
                  <div className="colum">
                  <div className="invalid-feedback validation"> </div>   
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>Country</label>
                  <div className="select-box">
					  <select type="select" name="country" id="country" onChange={this.handleChangeCountry}>
								<option value="0">Select Country</option>
								{
									this.state.countries.map( function(country,index) { 
									return(<option key={index} value={country._id}>{country.countryName}</option>);
								})
								}
						</select>
					</div>
                  </div>
                  <div className="colum right">
         <div className="invalid-feedback validation"> </div>          
        <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>State</label>   
                  <div className="select-box">               
						<select name="state" id="state"  onChange={this.handleChangeState}>
						<option value="0">Select State</option>
						{
							this.state.states.map( function(state,index){ 
							return(<option key={index} value={state._id}>{state.stateName}</option>);
						})
						}
					  </select>
                   </div>
                   </div>
                  <div className="cl"></div>
                  
        </div>
			<div className="form-row">
				<div className="colum">
					<div className="invalid-feedback validation"> </div>          
					<span className="astrik">*</span>
					<label className="label" htmlFor={"condition"}>City</label>
					<div className="select-box">						
						  <select  name="city" id="city"  onChange={this.handleChangeCity}>
						  {
								this.state.cities.map( function(city,index) { 
									return(<option key={index} value={city._id}>{city.cityName}</option>);
								})
							}
						  </select>
					</div>
				</div>				
			  <div className="colum right">
					<div className="invalid-feedback validation"> </div>   
					<span className="astrik">*</span>
					<label className="label" htmlFor={"zipCode"}>ZIP / Postal Code:</label>
					<input id={"zipCode"} className={"form-control textBox"} required={true} name={"zipCode"} type={"text"} placeholder="90001" defaultValue="" onChange={(e) => this.inputChangedHandler(e, 'zipCode')} />
			  </div>		
				
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
 
export default DonateProduct;

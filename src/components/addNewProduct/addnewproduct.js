import React, { Component } from "react";
//import Style from './addnewproduct.css';
//import { Link } from 'react-router-dom';
//import { SketchPicker } from 'react-color'
import Colors from "../seacrh-listing/colors";
import PicturesWall from "../common/picturesWall";
import CategorySelectBox from "../../components/CategorySelectBox/CategorySelectBox";
//import BrandSelectBox from '../../components/BrandSelectBox/BrandSelectBox';
//import SizeSelectBox from '../../components/SizeSelectBox/SizeSelectBox';
import axios from "axios";
import { Modal } from "antd";
import pica from "pica";
var FD = require("form-data");
//var fs = require('fs');
var CropViewer = require("rc-cropping");
const constant = require("../../config/constant");
//~ class ColorPicker extends Component {
//~ render() {
//~ return <SketchPicker
//~ color={ this.state.background }
//~ onChangeComplete={ this.handleChangeComplete }
//~ />
//~ }
//~ }
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
class Register extends React.Component {
  state = {
    selectedFiles: "",
    // ageSelected : constant.selectedAges,
    addProductForm: {
      productName: "",
      description: "",
      productCategory: "",
      size: "",
      color: "",
      brand: "",
      productAge: "",
      condition: "",
      productImages: "",
      productStatus: "0",
      length: "0",
      width: "0",
      height: "0",
      weight: "0"
    },
    Categories: [],
    brands: [],
    sizes: [],
    colors: [],
    conditions: [],
    ageSelected: [],
    categoryValue: "",
    background: "#fff",
    validation: {
      productName: {
        rules: {
          notEmpty: {
            message: "Product name field can't be left blank",
            valid: false
          }
        },
        valid: null,
        message: ""
      },
      showFormSuccess: false
    },
    cropper: false,
    imageCropper: null
  };

  handleCategory = category => {
    const productForm = {
      ...this.state.addProductForm
    };
    productForm["productCategory"] = category;
    this.setState({ addProductForm: productForm });
  };
  cancelHandler() {
    this.props.history.push("/my-treasure-chest");
  }
  handlePictureChange = event => {
    let oldFiles = [];
    event.map(file => {
      if (file.response && file.response.code === 200) {
        oldFiles.push({
          filename: file.response.result[0].filename,
          size: file.response.result[0].size,
          path: file.response.result[0].path
        });
      }
    });
    this.setState({ selectedFiles: JSON.stringify(oldFiles) });
    return null;
  };

  handleChangeComplete = color => {
    const productForm = {
      ...this.state.addProductForm
    };
    productForm["color"] = color.hex;
    this.setState({ addProductForm: productForm });
  };

  changeThisColor = e => {
    this.setState({ colorsValue: e.target.value });
    const colors = this.state.colors;
    colors.map((item, index) => {
      if (colors[index].checked === undefined) colors[index].checked = false;
      colors[index].checked = false;
      if (item.id === e.target.value) {
        colors[index].checked = true;
      } else {
        colors[index].checked = false;
      }
    });
    this.setState({ colors: colors });
  };

  componentWillMount() {
    axios
      .all([
        axios.get("/size/listingsize/"),
        axios.get("/brand/listingbrand/"),
        axios.get("/product/getColors/"),
        axios.get("/donation/getConstant/"),
        axios.get("/product/getAgeList/")
      ])
      .then(
        axios.spread((rsize, rbrand, rcolor, rconstant, rAge) => {
          if (rsize.data.code === 200) {
            this.setState({ sizes: rsize.data.result });
          }
          if (rbrand.data.code === 200) {
            this.setState({ brands: rbrand.data.result });
          }
          if (rcolor.data.code === 200) {
            this.setState({ colors: rcolor.data.result });
          }
          if (rconstant.data.code === 200) {
            this.setState({ conditions: rconstant.data.result });
          }
          if (rAge.data.code === 200) {
            this.setState({ ageSelected: rAge.data.result });
          }
        })
      )
      .catch(error => console.log(error));
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const productForm = {
      ...this.state.addProductForm
    };
    productForm[inputIdentifier] = event.target.value;
    this.setState({ addProductForm: productForm });
  };

  submit = () => {
    const data = new FD();
    const formData = this.state.addProductForm;
    Object.keys(formData).forEach((key, index) => {
      if (key === "productImages") {
        if (this.state.selectedFiles) {
          data.append("files", this.state.selectedFiles);
        }
      } else if (key === "userId") {
        data.append("userId", "1");
      } else {
        data.append(key, formData[key]);
      }
    });

    data.append("color", this.state.colorsValue),
      axios
        .post("/product/addProduct", data)
        .then(result => {
          if (result.data.code === 200) {
            this.setState({
              message: result.data.message,
              code: result.data.code,
              showFormSuccess: true,
              showFormError: false
            });
            this.props.history.push("/my-treasure-chest");
          } else {
            this.setState({
              message: result.data.messaage,
              code: result.data.code,
              showFormError: true,
              showFormSuccess: false
            });
          }
        })
        .catch(error => {
          if (!error.status) {
            this.setState({
              showFormError: true,
              showFormSuccess: false,
              message: "ERROR in Adding Product, Please try again!!!"
            });
          }
        });
    setTimeout(() => {
      this.setState({ showFormSuccess: false, showFormError: false });
    }, 12000);
  };
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Form was successfully validated and is ready to be submitted!
      </div>
    );
  }
  resizer = (from, to) => {
    return pica().resize(from, to);
  };

  updatedImage = file => {
    console.log("Updated file", file);
  };

  render() {
    let imageCropper = null;
    if (this.state.cropper) {
      imageCropper = (
        <CropViewer
          size={[64, 64]}
          thumbnailSizes={[[64, 64]]}
          file={this.state.imageCropper}
          locale="en-US"
          fileType="image/jpeg"
          accept="image/gif,image/jpeg,image/png,image/bmp,image/x-png,image/pjpeg"
          getSpinContent={() => <span>loading...</span>}
          renderModal={() => <Modal />}
          circle={true}
          resizer={this.resizer}
          onChange={this.updatedImage}
        />
      );
    }

    let optionTemplate;
    if (constant.selectedAges) {
      let conditionsList = constant.selectedAges;
      optionTemplate = conditionsList.map(v => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ));
    }

    return (
      <div className="add-product-container">
        <div className="container">
          <div className="breadcrumb">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href={"/my-treasure-chest"}>My Treasure Chest</a>
              </li>
              <li>Add New Product</li>
            </ul>
          </div>
          <div className="cl" />
          <div className="add-product">
            {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <div className="form-row">
              <h3>Add New Product</h3>
            </div>

            <Form submit={this.submit}>
              <div className="form-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                <label className="label" htmlFor={"name"}>
                  Product name
                </label>
                <input
                  id={"productName"}
                  className={"form-control textBox"}
                  required={true}
                  name={"productName"}
                  type={"productName"}
                  placeholder="Enter your name"
                  onChange={e => this.inputChangedHandler(e, "productName")}
                />
              </div>

              <div className="form-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                <label className="label" htmlFor={"description"}>
                  Description
                </label>
                <textarea
                  id={"description"}
                  className={"form-control textBox"}
                  required={true}
                  name={"description"}
                  type={"description"}
                  onChange={e => this.inputChangedHandler(e, "description")}
                  placeholder=""
                />
              </div>

              <div className="form-row">
                <label className="label">Add product a photo</label>
                <PicturesWall
                  multiple={false}
                  onHandlePicture={this.handlePictureChange}
                />
              </div>

              <div className="form-row">
                <label className="label">Color</label>
                {/*<SketchPicker
				color={ this.state.background }
				onChangeComplete={ this.handleChangeComplete }
			/>
			<ColorPicker /> */}
                <Colors
                  colorList={this.state.colors}
                  changeThisColor={this.changeThisColor}
                />
              </div>

              <div className="form-row">
                <div className="invalid-feedback validation"> </div>
                <span className="astrik">*</span>
                <label className="label" htmlFor={"category"}>
                  Category
                  <br />
                </label>
                <CategorySelectBox onSelectCategory={this.handleCategory} />
              </div>
              <div className="form-row">
                <div className="colum">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"size"}>
                    Size
                  </label>
                  {/*<input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"text"} placeholder="" defaultValue="Meduim" />*/}
                  {/*  <SizeSelectBox onSelectSize={this.handleSize}/> */}
                  <div className="select-box">
                    <select
                      required={true}
                      name={"size"}
                      id={"size"}
                      onChange={e => this.inputChangedHandler(e, "size")}
                    >
                      <option value="">Select Size</option>
                      {this.state.sizes.map(size => {
                        return (
                          <option key={size._id} value={size._id}>
                            {size.size}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="colum right">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"brand"}>
                    Brand
                  </label>
                  <div className="select-box">
                    <select
                      required={true}
                      name={"brand"}
                      id={"brand"}
                      onChange={e => this.inputChangedHandler(e, "brand")}
                    >
                      <option value="">Select Brand</option>
                      {this.state.brands.map(brand => {
                        return (
                          <option key={brand._id} value={brand._id}>
                            {brand.brandName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/*<input id={"brand"} className={"form-control textBox"} required={true} name={"brand"} type={"text"} placeholder="" defaultValue="barbie" /> */}
                  {/*	<BrandSelectBox onSelectBrand={this.handleBrand}/> */}
                </div>

                <div className="cl" />
              </div>
              <div className="form-row">
                <div className="colum">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"age"}>
                    Age
                  </label>
                  <div className="select-box">
                    <select
                      required={true}
                      name={"productAge"}
                      id={"productAge"}
                      onChange={e => this.inputChangedHandler(e, "productAge")}
                    >
                      <option value="">Select</option>
                      {this.state.ageSelected.map(condition => {
                        return (
                          <option key={condition.id} value={condition.id}>
                            {condition.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="colum right">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"condition"}>
                    Condition
                  </label>
                  <div className="select-box">
                    <select
                      required={true}
                      name={"condition"}
                      id={"condition"}
                      onChange={e => this.inputChangedHandler(e, "condition")}
                    >
                      <option value="">Select</option>
                      {this.state.conditions.map(condition => {
                        return (
                          <option key={condition.id} value={condition.id}>
                            {condition.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="cl" />
              </div>
              <div className="form-row">
                <div className="colum">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"length"}>
                    Length(CM)
                  </label>
                  <input
                    id={"length"}
                    className={"form-control textBox"}
                    step="any"
                    min="0"
                    required={true}
                    name={"length"}
                    type={"number"}
                    onChange={e => this.inputChangedHandler(e, "length")}
                    placeholder=""
                    defaultValue="0"
                  />
                </div>
                <div className="colum right">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"width"}>
                    Width(CM)
                  </label>
                  <input
                    id={"width"}
                    className={"form-control textBox"}
                    step="any"
                    min="0"
                    required={true}
                    name={"width"}
                    type={"number"}
                    onChange={e => this.inputChangedHandler(e, "width")}
                    placeholder=""
                    defaultValue="0"
                  />
                </div>
                <div className="cl" />
              </div>
              <div className="form-row">
                <div className="colum">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"height"}>
                    Height(CM)
                  </label>
                  <input
                    id={"height"}
                    className={"form-control textBox"}
                    step="any"
                    min="0"
                    required={true}
                    name={"height"}
                    type={"number"}
                    onChange={e => this.inputChangedHandler(e, "height")}
                    placeholder=""
                    defaultValue="0"
                  />
                </div>
                <div className="colum right">
                  <div className="invalid-feedback validation"> </div>
                  <span className="astrik">*</span>
                  <label className="label" htmlFor={"weight"}>
                    Weight(KG)
                  </label>
                  <input
                    id={"weight"}
                    className={"form-control textBox"}
                    step="any"
                    min="0"
                    required={true}
                    name={"weight"}
                    type={"number"}
                    onChange={e => this.inputChangedHandler(e, "weight")}
                    placeholder=""
                  />
                </div>
                <div className="cl" />
              </div>
              {/*<div className="form-row">
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
		</div> */}
              <div className="form-row no-padding">
                <button type={"submit"} className={"submitBtn"}>
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

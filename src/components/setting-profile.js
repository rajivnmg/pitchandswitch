import React, { Component } from "react";
import { Link } from "react-router-dom";
import popularItemImg from "../images/popular-item1.jpg";
import userPicture from "../images/user-pic.png";
import userPicture1 from "../images/userProfileLarge.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Label, Input } from "reactstrap";
import Select from "react-select";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DatePicker from "react-date-picker";
import { Button, Form } from "reactstrap";
import { Modal } from "antd";
import pica from "pica";
import "rc-cropping/assets/index.css";
import "./profile.css";
const constant = require("../config/constant");
var CropViewer = require("rc-cropping");
var moment = require("moment");
var FD = require("form-data");
var fs = require("fs");
library.add(faHeart);

class DobPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  componentWillMount() {
    if (this.props.dob) {
      const dob = moment(this.props.dob, "YYYY-MM-DD").toDate();
      if (dob)
        this.setState({ date: dob }, function() {
          console.log("GGG", dob, this.state.date);
        });
    }
  }

  onChange = date =>
    this.setState({ date }, () => {
      this.props.afterChangeDob.dob = moment(date).format("DD/MM/YYYY");
    });

  render() {
    return (
      <div>
        <DatePicker onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}
class settingProfile extends Component {
  constructor(props) {
    super(props);
    this.form = {
      firstName: "",
      lastName: "",
      profilePic: null,
      profileMessage: "",
      email: "",
      dob: "",
      address: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      phoneNumber: ""
    };
    this.state = {
      countryId: "",
      stateId: "",
      cityId: "",
      countries: [],
      states: [],
      cities: [],
      profileForm: { ...this.form },
      downloaded: false,
      modalStatus: false,
      modalConfirm: "Are you sure to deactivate this account?"
    };
  }

  resizer = (from, to) => {
    return pica().resize(from, to);
  };
  updatedImage = file => {
    const profileForm = { ...this.state.profileForm };
    profileForm.profilePic = file;
    this.setState({ profileForm }, () => {
      console.log("ProfileImage", this.state);
    });
  };
  handleChangeCountry = event => {
    const profileForm = { ...this.state.profileForm };
    profileForm.country = event.target.value;
    this.setState({ profileForm });
    if (event.target.value !== "0") {
      this.getStates(event.target.value).then(result => {
        this.setState({
          states: result.data.result,
          cities: [{ _id: "", cityName: "" }]
        });
      });
    }
  };

  getStates = countryId => {
    return axios.get("/location/getState/" + countryId);
  };
  getCities = steteId => {
    return axios.get("/location/getCity/" + steteId);
  };

  handleChangeState = event => {
    const profileForm = { ...this.state.profileForm };
    profileForm.state = event.target.value;
    this.setState({ profileForm });
    if (event.target.value !== "0") {
      this.getCities(event.target.value).then(result => {
        this.setState({ cities: result.data.result });
      });
    }
  };
  handleChangeCity = event => {
    const profileForm = { ...this.state.profileForm };
    profileForm.city = event.target.value;
    this.setState({ profileForm });
  };
  deactivateAccount = e => {
    e.preventDefault();

    this.setState({
      modalStatus: true
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const data = new FD();
    const profileForm = { ...this.state.profileForm };
    for (let key in profileForm) {
      if (profileForm.hasOwnProperty(key)) {
        if (profileForm[key] instanceof File) data.set(key, profileForm[key]);
        else data.set(key, profileForm[key].toString());
      }
    }
    axios.post("/user/updateUser", data).then(result => {
      if (result.data.code == "200") {
        this.props.history.push("/setting-profile");
      }
    });
  };
  componentWillMount() {
    if (localStorage.getItem("jwtToken") !== null) {
      axios.get("/user/myProfle").then(result => {
        if (result.data.code === 200) {
          const profileForm = { ...this.state.profileForm };
          const form = { _id: null, ...this.form };
          for (let key in form) {
            profileForm[key] = result.data.result[0][key]
              ? result.data.result[0][key]
              : "";
          }

          if (typeof profileForm.country === "object") {
            profileForm.country = profileForm.country._id;
            this.getStates(profileForm.country).then(result => {
              this.setState({
                states: result.data.result,
                cities: []
              });
            });
          }
          if (typeof profileForm.state === "object") {
            profileForm.state = profileForm.state._id;
            this.getCities(profileForm.state).then(result => {
              this.setState({ cities: result.data.result });
            });
          }
          if (typeof profileForm.city === "object") {
            profileForm.city = profileForm.city._id;
          }
          this.setState(
            {
              profileForm,
              downloaded: true
            },
            () => {
              console.log("PPPP", this.state.profileForm);
            }
          );
        } else {
          this.props.history.push("/logout");
        }
      });
    } else {
      this.props.history.push("/logout");
    }

    axios.get("/location/getLocation").then(result => {
      this.setState({ countries: result.data.result });
    });
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const profileForm = {
      ...this.state.profileForm
    };
    profileForm[inputIdentifier] = event.target.value;
    this.setState({ profileForm }, () => {
      console.log("Profile form", this.state.profileForm);
    });
  };

  handleOk = e => {
    const profileForm = { ...this.state.profileForm };
    const data = new FD();
    data.set("userStatus", "0");
    data.set("_id", profileForm._id);
    axios.post("/user/changeStatus", data).then(result => {
      if (result.data.code == "200") {
        this.setState({
          modalStatus: false
        });
        this.props.history.push("/logout");
      }
    });
  };

  handleCancel = e => {
    this.setState({
      modalStatus: false
    });
  };

  render() {
    const profileForm = { ...this.state.profileForm };
    let countryID = this.state.profileForm.country
      ? this.state.profileForm.country._id
      : "";
    let stateID = this.state.profileForm.state
      ? this.state.profileForm.state._id
      : "";
    let cityID = this.state.profileForm.city
      ? this.state.profileForm.city._id
      : "";
    let profileImageCropper = null;
    if (profileForm) {
      profileImageCropper = (
        <CropViewer
          size={[64, 64]}
          thumbnailSizes={[[64, 64], [32, 32]]}
          file={
            constant.BASE_IMAGE_URL + "ProfilePic/" + profileForm.profilePic
          }
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
    let view = null;
    if (this.state.downloaded) {
      view = (
        <div className="myTreasure">
          <div className="container">
            <div className="breadcrumb">
              <ul>
                <li>
                  <a href={"/dashboard"}>Home</a>
                </li>{" "}
                <li>Settings</li>
              </ul>
            </div>
            <div className="setting-container">
              <div className="left-container">
                <ul>
                  <li>
                    <Link to={"/setting-profile"} className="active">
                      Profile Info
                    </Link>
                  </li>
                  <li>
                    <Link to={"/setting-change-password"}>Change Password</Link>
                  </li>
                  <li>
                    <Link to={"/setting-subscription"}>
                      Subscription Management
                    </Link>
                  </li>
                  <li>
                    <Link to={"/setting-email-notification"}>
                      Email Notifications
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="right-container">
                <Form onSubmit={this.submitHandler}>
                  <div className="change-password">
                    <div className="form-row login-row">
                      <h3>Profile Info</h3>
                      <p className="brdr-btm">
                        Here you can update your personal details it will not
                        going to see anyone
                      </p>
                    </div>
                    <div>
                      <div className="profileRow">
                        <div
                          className="pic"
                          style={{
                            width: "20%",
                            float: "left",
                            verticalAlign: "middle"
                          }}
                        >
                          {profileImageCropper}
                        </div>
                        <div
                          className="details"
                          style={{ width: "80%", margin: "0", float: "left" }}
                        >
                          <div style={{ width: "48%", float: "left" }}>
                            <div className="form-row">
                              <div className="invalid-feedback validation">
                                {" "}
                              </div>
                              <span className="astrik">*</span>
                              <label className="label" htmlFor={"name"}>
                                First Name
                              </label>
                              <input
                                id={"first-name"}
                                className={"form-control textBox"}
                                required={true}
                                type="text"
                                placeholder="Enter your first name"
                                onChange={event =>
                                  this.inputChangedHandler(event, "firstName")
                                }
                                value={
                                  this.state.profileForm
                                    ? this.state.profileForm.firstName
                                    : ""
                                }
                              />
                            </div>
                          </div>
                          <div style={{ width: "48%", float: "right" }}>
                            <div className="form-row">
                              <div className="invalid-feedback validation">
                                {" "}
                              </div>
                              <label className="label" htmlFor={"name"}>
                                Last Name
                              </label>
                              <input
                                id={"last-name"}
                                className={"form-control textBox"}
                                required={true}
                                type="text"
                                placeholder="Enter your last name"
                                value={this.state.profileForm.lastName}
                                onChange={event =>
                                  this.inputChangedHandler(event, "lastName")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="cl" />
                      </div>

                      <div className="form-row">
                        <div className="invalid-feedback validation"> </div>
                        <span className="astrik">*</span>
                        <label className="label" htmlFor={"description"}>
                          Profile Message
                        </label>
                        <textarea
                          id={"description"}
                          className={"form-control textBox"}
                          required={true}
                          name={"description"}
                          type={"description"}
                          onChange={event =>
                            this.inputChangedHandler(event, "profileMessage")
                          }
                          placeholder=""
                          value={this.state.profileForm.profileMessage}
                        />
                      </div>
                      <div className="form-row">
                        <div className="colum">
                          <div className="invalid-feedback validation"> </div>
                          <span className="astrik">*</span>
                          <label className="label" htmlFor={"size"}>
                            Email address
                          </label>
                          <input
                            id={"size"}
                            className={"form-control textBox"}
                            required={true}
                            name={"size"}
                            type={"email"}
                            placeholder=""
                            onChange={event =>
                              this.inputChangedHandler(event, "email")
                            }
                            value={
                              this.state.profileForm
                                ? this.state.profileForm.email
                                : ""
                            }
                            disabled="disabled"
                          />
                        </div>
                        <div className="colum right">
                          <div className="invalid-feedback validation"> </div>
                          <span className="astrik">*</span>
                          <label className="label" htmlFor={"dob"}>
                            Date of Birth
                          </label>
                          <DobPicker
                            dob={this.state.profileForm.dob}
                            afterChangeDob={this.state.profileForm}
                          />
                        </div>
                        <div className="cl" />
                      </div>

                      <div className="form-row">
                        <div className="colum">
                          <label className="label" htmlFor={"age"}>
                            Address Line 1:
                          </label>
                          <input
                            id={"address"}
                            className={"form-control textBox"}
                            required={true}
                            name={"address"}
                            type={"text"}
                            placeholder=""
                            onChange={event =>
                              this.inputChangedHandler(event, "address")
                            }
                            value={
                              this.state.profileForm
                                ? this.state.profileForm.address
                                : ""
                            }
                          />
                        </div>
                        <div className="colum right">
                          <label className="label" htmlFor={"age"}>
                            Address Line 2:
                          </label>
                          <input
                            id={"age"}
                            className={"form-control textBox"}
                            name={"address2"}
                            type={"text"}
                            placeholder=""
                            onChange={event =>
                              this.inputChangedHandler(event, "address2")
                            }
                            value={
                              this.state.profileForm
                                ? this.state.profileForm.address2
                                : ""
                            }
                          />
                        </div>
                        <div className="cl" />
                      </div>
                      <div className="form-row">
                        <div className="colum">
                          <div className="invalid-feedback validation"> </div>
                          <span className="astrik">*</span>
                          <label className="label" htmlFor={"condition"}>
                            Country
                          </label>
                          <div className="select-box">
                            <select
                              type="select"
                              name="country"
                              id="country"
                              required={true}
                              onChange={this.handleChangeCountry}
                              value={this.state.profileForm.country}
                            >
                              <option value="">Select Country</option>
                              {this.state.countries.map(function(
                                country,
                                index
                              ) {
                                return (
                                  <option key={index} value={country._id}>
                                    {country.countryName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="colum right">
                          <div className="invalid-feedback validation"> </div>
                          <span className="astrik">*</span>
                          <label className="label" htmlFor={"state"}>
                            State
                          </label>
                          <div className="select-box">
                            <select
                              name="state"
                              id="state"
                              required={true}
                              onChange={this.handleChangeState}
                              value={this.state.profileForm.state}
                            >
                              <option value="0">Select State</option>
                              {this.state.states.map(function(state, index) {
                                return (
                                  <option key={index} value={state._id}>
                                    {state.stateName}
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
                          <label className="label" htmlFor={"city"}>
                            City
                          </label>
                          <div className="select-box">
                            <select
                              name="city"
                              id="city"
                              required={true}
                              onChange={this.handleChangeCity}
                              value={this.state.profileForm.city}
                            >
                              <option value="0">Select City</option>
                              {this.state.cities.map(function(city, index) {
                                return (
                                  <option key={index} value={city._id}>
                                    {city.cityName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="colum right">
                          <div className="invalid-feedback validation"> </div>
                          <span className="astrik">*</span>
                          <label className="label" htmlFor={"zipCode"}>
                            ZIP / Postal Code:
                          </label>
                          <input
                            id={"zipCode"}
                            className={"form-control textBox"}
                            required={true}
                            name={"zipCode"}
                            type={"text"}
                            placeholder=""
                            onChange={event =>
                              this.inputChangedHandler(event, "zipCode")
                            }
                            value={this.state.profileForm.zipCode}
                          />
                        </div>
                        <div className="cl" />
                      </div>
                      <div className="form-row">
                        <div className="invalid-feedback validation"> </div>
                        <span className="astrik">*</span>
                        <label className="label" htmlFor={"phoneNumber"}>
                          Phone Number
                        </label>
                        <input
                          id={"name"}
                          className={"form-control textBox"}
                          required={true}
                          name={"name"}
                          type={"name"}
                          placeholder="Enter your Phone Number"
                          onChange={event =>
                            this.inputChangedHandler(event, "phoneNumber")
                          }
                          value={
                            this.state.profileForm
                              ? this.state.profileForm.phoneNumber
                              : ""
                          }
                        />
                      </div>

                      <div className="form-row no-padding">
                        <a
                          href=""
                          onClick={this.deactivateAccount}
                          className={"grayBtn fr"}
                        >
                          Deactivate account
                        </a>
                        <Modal
                          title="Pitch And Switch"
                          visible={this.state.modalStatus}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <p>{this.state.modalConfirm}</p>
                        </Modal>
                        <p className="createdOn">
                          Account created on{" "}
                          {moment(this.state.profileForm.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                        <button type={"submit"} className={"submitBtn fl"}>
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="cl"> </div>
                  </div>
                </Form>
              </div>
              <div className="cl" />
            </div>
          </div>
        </div>
      );
    }

    return view;
  }
}
export default settingProfile;

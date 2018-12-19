import React, { Component } from "react";
import { Link } from "react-router-dom";
//import popularItemImg from '../images/popular-item1.jpg';
//import userPicture from '../images/user-pic.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
//import Select from 'react-select';
import axios from "axios";
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// library.add(faHeart);

class settingEmailNotification extends Component {
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (localStorage.getItem("jwtToken") !== null) {
      axios.get("/user/getLoggedInUser").then(result => {
        if (result.data.code === 200) {
          this.setState({
            user: result.data.result
          });
          localStorage.setItem("loggedInUser", result.data.result._id);
          localStorage.setItem("userId", result.data.result._id);
          localStorage.setItem("userEmail", result.data.result.email);
          localStorage.setItem("userName", result.data.result.userName);
          if (
            result.data.result.emailVerified == "1" &&
            result.data.result.subscriptionStatus == "1"
          ) {
            localStorage.setItem("isLoggedIn", 1);
          } else {
            localStorage.setItem("isLoggedIn", 0);
          }
        } else {
          this.props.history.push("/logout");
        }
      });
    } else {
      this.props.history.push("/logout");
    }
  }

  render() {
    return (
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
                  <Link to={"/setting-profile"}>Profile Info</Link>
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
                  <Link to={"/setting-email-notification"} className="active">
                    Email Notifications
                  </Link>
                </li>
              </ul>
            </div>
            <div className="right-container">
              <div className="change-password">
                <div className="form-row login-row no-margin">
                  <div className="radioRight fr">
                    <input
                      type="checkbox"
                      value="None"
                      id="checkbox-toggle-with-text"
                      className="checkbox-toggle"
                      name="checkbox-toggle-with-text"
                    />
                    <label
                      className="checkbox-toggle-label"
                      htmlFor="checkbox-toggle-with-text"
                    >
                      {" "}
                      <span className="on">ON</span>
                      <span className="off">OFF</span>
                    </label>
                  </div>
                  <h3>Email Notifications</h3>
                  <p className="brdr-btm">
                    You can select the notifications which you wants to receive
                    through checkbox.
                  </p>
                </div>
                <div>
                  <div className="checkbox-row">
                    <div className="check-box ">
                      <input name="Lenovo" id="cat1" type="checkbox" />
                      <label htmlFor="cat1">New message received</label>
                    </div>
                  </div>
                  <div className="checkbox-row active">
                    <div className="check-box ">
                      <input
                        name="Lenovo"
                        id="cat2"
                        type="checkbox"
                        defaultChecked
                      />
                      <label htmlFor="cat2">New trade request</label>
                    </div>
                  </div>
                  <div className="checkbox-row">
                    <div className="check-box ">
                      <input name="Lenovo" id="cat3" type="checkbox" />
                      <label htmlFor="cat3">Trade rejected</label>
                    </div>
                  </div>
                  <div className="checkbox-row">
                    <div className="check-box ">
                      <input name="Lenovo" id="cat4" type="checkbox" />
                      <label htmlFor="cat4">Updates on shipping status</label>
                    </div>
                  </div>
                  <div className="checkbox-row">
                    <div className="check-box ">
                      <input name="Lenovo" id="cat5" type="checkbox" />
                      <label htmlFor="cat5">
                        Pitch and Switch Update Communications
                      </label>
                    </div>
                  </div>
                  <div>&nbsp;</div>
                  <div className="form-row">
                    <button type={"submit"} className={"submitBtn fl"}>
                      Change
                    </button>
                  </div>
                </div>
                <div className="cl"> </div>
              </div>
            </div>
            <div className="cl" />
          </div>
        </div>
      </div>
    );
  }
}
export default settingEmailNotification;

import React, { Component } from "react";
import { Link } from "react-router-dom";
// import popularItemImg from '../images/popular-item1.jpg';
// import userPicture from '../images/user-pic.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import Select from "react-select";
import axios from "axios";
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// library.add(faHeart);

class settingChangePassword extends Component {
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
                  <Link to={"/setting-change-password"} className="active">
                    Change Password
                  </Link>
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
              <div className="change-password">
                <div className="form-row login-row">
                  <h3>Change Password</h3>
                  <p className="brdr-btm">
                    You can update your pitch and switch account password here
                  </p>
                </div>
                <div>
                  <div className="form-row password-row">
                    <span className="astrik">*</span>
                    <label className="label" htmlFor={"password"}>
                      Old Password
                    </label>
                    <input
                      id={"password"}
                      className={"form-control textBox"}
                      required={true}
                      name={"password"}
                      type={"password"}
                      minLength={6}
                      pattern="(?=.*\d)(?=.*[a-z]).{6, }"
                      placeholder={""}
                      type={this.state.type}
                    />
                    <small className="small-instruction">
                      Must be at least 6 characters long, contain letters and
                      numbers
                    </small>
                  </div>
                  <div className="form-row password-row">
                    <span className="astrik">*</span>
                    <label className="label" htmlFor={"password"}>
                      New Password{" "}
                    </label>
                    <input
                      id={"password"}
                      className={"form-control textBox"}
                      required={true}
                      name={"password"}
                      type={"password"}
                      minLength={6}
                      pattern="(?=.*\d)(?=.*[a-z]).{6, }"
                      placeholder={""}
                      type={this.state.type}
                    />
                  </div>
                  <div className="form-row password-row">
                    <span className="astrik">*</span>
                    <label className="label" htmlFor={"password"}>
                      Confirm Password{" "}
                    </label>
                    <input
                      id={"password"}
                      className={"form-control textBox"}
                      required={true}
                      name={"password"}
                      type={"password"}
                      minLength={6}
                      pattern="(?=.*\d)(?=.*[a-z]).{6, }"
                      placeholder={""}
                      type={this.state.type}
                    />
                  </div>
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
export default settingChangePassword;

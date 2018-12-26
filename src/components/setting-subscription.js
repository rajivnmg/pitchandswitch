import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Style from './myTreasureChest/myTreasureChest.css';
//import popularItemImg from '../images/popular-item1.jpg';
//import userPicture from '../images/user-pic.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DitchPopup from "./subPopup";
// import { library } from '@fortawesome/fontawesome-svg-core';
//import Select from "react-select";
import axios from "axios";
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// library.add(faHeart);

class settingSubscription extends Component {
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
            result.data.result.emailVerified === "1" &&
            result.data.result.subscriptionStatus === "1"
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
                  <Link to={"/setting-subscription"} className="active">
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
                  <h3>Subscription Management</h3>
                  <p className="brdr-btm">
                    Find the perfect plan for you - 100% satisfaction
                    guaranteed.
                  </p>
                </div>
                <div className="whiteboxBG">
                  <div className="leftColum ">
                    <p className="addOns">
                      <strong>Active Plan</strong>
                    </p>
                    <h5 className="large">Basic</h5>
                    <p className="gray">
                      (1 Trade, 5 Items Storage, 5 Items Wishlist)
                    </p>
                    <p className="yellow">+ 26 Trades</p>
                    <p className="gray">12 left</p>
                    <div>&nbsp;</div>
                  </div>
                  <div className="leftColum right">
                    <p className="addOns gray fr">Expire on: 30/5/2019</p>
                    <div className="cl" />
                    <DitchPopup />

                    <p className="green fr">Free</p>
                  </div>
                  <div className="cl"> </div>
                </div>
                <div className="whiteboxBG">
                  <p className="addOns">
                    <strong>Add-ons</strong> (How much trades you need)
                  </p>
                  <ul className="trades-list">
                    <li>
                      <span className="bold">$1</span>
                      <span className="text">
                        5 Trade, 8 Items Storage, 8 Items Wishlist
                      </span>{" "}
                      <span className="validity">Vailidity: Lifetime</span>
                    </li>
                    <li className="active">
                      <span className="bold">$3</span>
                      <span className="text">
                        {" "}
                        20 Trade, 30 Items Storage, 30 Items Wishlist{" "}
                      </span>{" "}
                      <span className="validity">Vailidity: Lifetime</span>
                    </li>
                    <li>
                      <span className="bold">$5</span>
                      <span className="text">
                        {" "}
                        50 Trade, 75 Items Storage, 75 Items Wishlist
                      </span>{" "}
                      <span className="validity">Vailidity: Lifetime</span>
                    </li>
                    <li>
                      <span className="bold">$10</span>
                      <span className="text">
                        {" "}
                        110 Trade, 150 Items Storage, 150 Items Wishlist
                      </span>{" "}
                      <span className="validity">Vailidity: Lifetime</span>
                    </li>
                  </ul>
                  <div className="form-row">
                    <button type={"submit"} className={"submitBtn fl"}>
                      Buy Now
                    </button>
                    <div className="cl"> </div>
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
export default settingSubscription;

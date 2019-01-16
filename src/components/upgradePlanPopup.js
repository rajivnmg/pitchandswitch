import React, { Component } from "react";
//import Warper from "./common/Warper";
import Popup from "reactjs-popup";
import "./subscription/subscription.css";
import subscribeImg1 from "./../images/subscription-pic1.png";
import subscribeImg2 from "./../images/subscription-pic2.png";
import UpgradeNow from "./subscription/subscriptionUpgradeNow";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { If, Then } from "react-if-elseif-else-render";

const contentStyle = {
  maxWidth: "700px",
  width: "90%"
};

class UpgradePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      showFormError: false,
      showFormSuccess: false,
      message: ""
    };
  }
  handleSubscription(e) {
    let data = {};
    data.subscriptionId = e.currentTarget.dataset.id;
    data.userId = localStorage.getItem("userId");
    data.userName = localStorage.getItem("userName");
    axios.post("/subscription/saveUserSubscriptionPlan", data).then(result => {
      if (result.data.code === 200) {
        this.setState({ showFormError: false, showFormSuccess: true });
        setTimeout(() => {
          this.setState({ showFormError: false, showFormSuccess: false });
         // localStorage.removeItem("jwtToken");
          localStorage.setItem("jwtToken",result.data.token);
          localStorage.setItem("loggedInUser", result.data.user._id);
          localStorage.setItem("userId", result.data.user._id);
          localStorage.setItem("userEmail", result.data.user.email);
          localStorage.setItem("userName", result.data.user.userName);
          localStorage.setItem(
            "Latitude",
            result.data.user.loct.coordinates[0]
          );
          localStorage.setItem(
            "Longitude",
            result.data.user.loct.coordinates[1]
          );
          if (
            result.data.user.emailVerified == "1" &&
            result.data.user.subscriptionStatus == "1"
          ) {
            localStorage.setItem("isLoggedIn", 1);
          } else {
            localStorage.setItem("isLoggedIn", 0);
          }
          
          window.location.href = "/dashboard";
        }, 12000);
      } else {
        this.setState(
          { showFormError: true, message: result.data.result.message },
          function() {
            window.location.href = "/subscription";
          },
          500
        );
      }
    });
    setTimeout(() => {
      this.setState({ showFormError: false });
    }, 12000);
  }
  componentWillMount() {
    axios.get("/subscription/list-subscriptions").then(result => {
      if (result.data.code === 200) {
        this.setState({ subscriptions: result.data.result });
      }
    });
  }

  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Congratulation!!! You have successfully subscribe the plan{" "}
        <Link to={"/login"}> Go to login </Link> Or it will automaticaly
        redirect in 10 second.
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
        trigger={<a className="upgrade-btn"> Upgrade Plan </a>}
        modal
        contentStyle={contentStyle}
        lockScroll
      >
        {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header">
              Upgrade Now
              <div className="cl" />
            </div>
            {this.state.showFormError ? this._renderErrorMessage() : null}
            {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
            <If condition={this.state.subscriptions.length === 0}>
              <Then>
                <div className="example">
                  <Spin />
                </div>
              </Then>
            </If>
            <div className="content upgradePlan">
              <div className="subscription-container">
                <div className="container">
                  {this.state.subscriptions.map((subscription, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          subscription.price === 0
                            ? "colum-basic"
                            : "colum-basic gold"
                        }
                      >
                        <div className="pic-row">
                          <img
                            src={
                              subscription.price === 0
                                ? subscribeImg1
                                : subscribeImg2
                            }
                            alt=""
                          />
                        </div>
                        <h4>{subscription.subscriptionName}</h4>
                        <div className="row-div">
                          <strong>
                            {" "}
                            {subscription.totalTradePermitted === 9999
                              ? "Unlimited"
                              : subscription.totalTradePermitted}
                          </strong>{" "}
                          Trades
                        </div>
                        <div className="row-div">
                          <strong>
                            {subscription.totalInventoryAllowed === 9999
                              ? "Unlimited"
                              : subscription.totalInventoryAllowed}{" "}
                            Items
                          </strong>{" "}
                          Stored in Treasure Chest and Wishlist
                        </div>
                        {/*<div className="row-div">
											<strong>5 Items</strong> Wishlist
										</div> */}
                        <h4 className="price">
                          {(subscription.price === "0" || subscription.price === "0.00")
                            ? "Free"
                            : "$" + subscription.price}
                          <sub>/y</sub>
                        </h4>

                        {subscription.price < 1 ? (
                          <span
                            className="getStarted-btn"
                            onClick={this.handleSubscription.bind(this)}
                            data-id={subscription._id}
                          >
                            Upgrade Now
                          </span>
                        ) : (
                          <UpgradeNow subscription={subscription} />
                        )}
                      </div>
                    );
                  })}
					<div class="form-row"><Link to={"/setting-subscription"}><button type="button" class="submitBtn fl">Purchase Addon</button></Link></div>
                  <div className="cl" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}
export default UpgradePlan;

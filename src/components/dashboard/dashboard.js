import React, { Component } from "react";
import Style from "./dashboard.css";
import PopularItems from "./popularItems";
import NewlyProducts from "./newlyProducts";
import TradeMatch from "./tradeMatch";
import Style1 from "./myTrades.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PitchRequests from "./pitchRequests";
import SendRequests from "./sendRequests";
import ReceivedRequests from "./receivedRequests";

import SentSwitched from "./sentSwitched";
import SendCompleted from "./sendCompleted";
import ReceivedSwitched from "./receivedSwitched";
import ReceivedCompleted from "./receivedCompleted";
import SentDitch from "./sentDitch";
import ReceivedDitch from "./receivedDitch";
import Switched from "./switched";
import Completed from "./completed";
import Ditch from "./ditch";
import SubscriptionAddonsPupup from "../subscriptionAddonsPupup";
import ProductShippingCostPopup from "../productShippingCostPopup";
import ReturnInfo from "../payShopPopup";
import ReturnInfo1 from "../payShopPopup1";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import UpgradePlan from "../upgradePlanPopup";
import { Link } from "react-router-dom";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import Aux from "../../hoc/Aux";
var moment = require("moment");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("isLoggedIn", 1);
    this.state = {
      currentUser: {
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        profilePic: "",
        userName: ""
      },
      userSubscription: {},
      userSubscriptionAddons: {}
    };
    if (localStorage.getItem("jwtToken") === null) {
      window.location.href = "#/login";
    }
  }

  componentWillMount() {

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (localStorage.getItem("jwtToken") !== null) {
      axios
        .all([
          axios.get("/user/getLoggedInUser"),
          axios.get("/user/userSubscription"),
          axios.get("/user/userSubscriptionAddon")
        ])
        .then(
          axios.spread((user, sresult, saresult) => {
            if (user.data.code === 200) {
              this.setState({
                currentUser: user.data.result,
                notification_type: user.data.notification_type,
                notifications: user.data.notifications,
                totalNotifications: user.data.totalNotifications,
                userSubscription: sresult.data.userSubacriptions[0],
                userSubscriptionAddons: saresult.data.userSubacriptionAddons[0]
              });
            }
          })
        )
        .catch(error => console.log(error));
    }

  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (localStorage.getItem("jwtToken") !== null) {
      axios.get("/user/userTradeStates").then(result => {
        this.setState({
          totalInvemtory: result.data.totalInvemtory,
          totalInventoryAllowed: result.data.totalInventoryAllowed,
          totalTradePermitted: result.data.totalTradePermitted,
          totalTrade: result.data.totalTrade,
          inventoryLeft: result.data.inventoryLeft,
          tradeLeft: result.data.tradeLeft
        });
      });
    }
  }


  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    return (
      <Aux>
        <div className="dashboard">
          <div className="container">
            <If condition={this.state.totalInvemtory === 0}>
              <Then>
                <div className="msgSuccess">
                  <a href="#" className="close">
                    x
                  </a>
                  You&apos;re almost there, upload your first item to get
                  trading
                </div>
              </Then>
            </If>
            <div className="heading-row">
              <Link to={"/donate-product"} className="more-items">
                Donate Now
              </Link>
              <h1>
                Welcome, {this.Capitalize(this.state.currentUser.firstName)}{" "}
                {this.Capitalize(this.state.currentUser.lastName)}.
              </h1>
              <p className="subheading">
                There is a list of some latest and tranding itmes on pitch and
                switch{" "}
              </p>
              <div className="cl" />
            </div>
            <div className="dashboardLeft">
              <div className="tab-outer-container">
                <Tabs>
                  <TabList>
                    <Tab>Pitch Requests</Tab>
                    <Tab>Switched</Tab>
                    <Tab>Ditched</Tab>
                  </TabList>

                  <TabPanel>
                    <Tabs forceRenderTabPanel>
                      <div className="message-filter">
                        <TabList>
                          <Tab className="active tradeall">ALL</Tab>
                          <Tab className="sent tradeSent">Sent</Tab>
                          <Tab className="received tabreceived">Received</Tab>
                        </TabList>
                      </div>
                      <TabPanel>
                        <PitchRequests />
                      </TabPanel>
                      <TabPanel>
                        <SendRequests />
                      </TabPanel>
                      <TabPanel>
                        <ReceivedRequests />
                      </TabPanel>
                    </Tabs>
                  </TabPanel>

                  <TabPanel>
                    <Tabs forceRenderTabPanel>
                      <div className="message-filter">
                        <TabList>
                          <Tab className="active tradeall">ALL</Tab>
                          <Tab className="sent tradeSent">Sent</Tab>
                          <Tab className="received tabreceived">Received</Tab>
                        </TabList>
                      </div>
                      <h4>Switched and Completed</h4>
                      <TabPanel>
                        <Tabs>
                          <TabList>
                            <Tab>Switched</Tab>
                            <Tab>Completed</Tab>
                          </TabList>
                          <TabPanel>
                            <Switched />
                          </TabPanel>
                          <TabPanel>
                            <Completed />
                          </TabPanel>
                        </Tabs>
                      </TabPanel>
                      <TabPanel>
                        <Tabs>
                          <TabList>
                            <Tab>Switched</Tab>
                            <Tab>Completed</Tab>
                          </TabList>
                          <TabPanel>
                            <sentSwitched />
                          </TabPanel>
                          <TabPanel>
                            <sendCompleted />
                          </TabPanel>
                        </Tabs>
                      </TabPanel>
                      <TabPanel>
                        <Tabs>
                          <TabList>
                            <Tab>Switched</Tab>
                            <Tab>Completed</Tab>
                          </TabList>
                          <TabPanel>
                            <ReceivedSwitched />
                          </TabPanel>
                          <TabPanel>
                            <ReceivedCompleted />
                          </TabPanel>
                        </Tabs>
                      </TabPanel>
                    </Tabs>
                  </TabPanel>

                  <TabPanel>
                    <Tabs forceRenderTabPanel>
                      <div className="message-filter">
                        <TabList>
                          <Tab className="active tradeall">ALL</Tab>
                          <Tab className="sent tradeSent">Sent</Tab>
                          <Tab className="received tabreceived">Received</Tab>
                        </TabList>
                      </div>
                      <h4>Ditched</h4>
                      <TabPanel>
                        <Ditch />
                      </TabPanel>
                      <TabPanel>
                        <SentDitch />
                      </TabPanel>
                      <TabPanel>
                        <ReceivedDitch />
                      </TabPanel>
                    </Tabs>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            <div className="dashboardRight">
              {/* <div className="tradeText topMargin">
		<span className="largeTxt">{this.state.tradeLeft}</span>
		Trade left
		</div>
		<div className="tradeText">
		<span className="largeTxt">{this.state.inventoryLeft}</span>
		Inventory left
		</div> */}
              <div className="tradeText topMargin">
                <h4>Current Plan</h4>
                <Scrollbars className="Scrollsdiv" style={{ height: 402 }}>
                  <div className="brdrBox">
                    <div className="row">
                      <div className="left-div bold">
                        {((this.state.userSubscription) && (this.state.userSubscription.subscriptionId
                          ? this.state.userSubscription.subscriptionId
                              .subscriptionName
                          : "Basic"))}
                      </div>
                      <div className="rightDiv bold green">
                        {((this.state.userSubscription) && (this.state.userSubscription.subscriptionId &&
                        this.state.userSubscription.subscriptionId.price > 0
                          ? this.state.userSubscription.subscriptionId.price
                          : "Free"))}
                      </div>
                      <div className="cl" />
                    </div>
                    <div className="row">
                      <div className="left-div ">Trade</div>
                      <div className="rightDiv">
                        {((this.state.userSubscription) && (this.state.userSubscription.subscriptionId
                          ? this.state.userSubscription.subscriptionId
                              .totalTradePermitted
                          : "0"))}
                      </div>
                      <div className="cl" />
                    </div>
                    <div className="row">
                      <div className="left-div">Inventory</div>
                      <div className="rightDiv pink">
                        {((this.state.userSubscription) && (this.state.userSubscription.subscriptionId
                          ? this.state.userSubscription.subscriptionId
                              .totalInventoryAllowed
                          : "0"))}
                      </div>
                      <div className="cl" />
                    </div>
                    <div className="topbrdr-row">
						<p>Start date: <span>{moment((this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.createdAt:Date()).format('LL')}</span></p>
						<p>End date: <span>{moment((this.state.userSubscription.subscriptionId)?this.state.userSubscription.subscriptionId.createdAt:Date()).add(1, 'years').format('LL')}</span></p>
						 <UpgradePlan />
						 <div className="cl"></div>
					</div>
                  </div>
                  <If condition={this.state.userSubscriptionAddons}>
                    <Then>
                      <div className="brdrBox">
                        <div className="row">
                          <div className="left-div bold">Add-on</div>
                          <div className="rightDiv bold green">
                            $
                            {this.state.userSubscriptionAddons &&
                            this.state.userSubscriptionAddons.addonId
                              ? this.state.userSubscription.addonId.price
                              : "0"}
                          </div>
                          <div className="cl" />
                        </div>
                        <div className="row">
                          <div className="left-div ">Trade</div>
                          <div className="rightDiv">
                            {this.state.userSubscriptionAddons &&
                            this.state.userSubscriptionAddons.addonId
                              ? this.state.userSubscriptionAddons.addonId
                                  .totalTradePermitted
                              : "0"}
                          </div>
                          <div className="cl" />
                        </div>
                        <div className="row">
                          <div className="left-div">Inventory</div>
                          <div className="rightDiv">
                            {this.state.userSubscriptionAddons &&
                            this.state.userSubscriptionAddons.addonId
                              ? this.state.userSubscriptionAddons.addonId
                                  .totalInventoryAllowed
                              : "0"}
                          </div>
                          <div className="cl" />
                        </div>
                        <div className="topbrdr-row no-padding">
                          <p>
                            Vailidity: <span>Lifetime</span>
                          </p>
                        </div>
                      </div>
                    </Then>
                  </If>
                </Scrollbars>
              </div>
            </div>
            <div className="cl" />
          </div>

          <TradeMatch />
        </div>
      </Aux>
    );
  }
}
export default Dashboard;

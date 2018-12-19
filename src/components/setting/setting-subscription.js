import React, { Component } from "react";
import Style from "./myTreasureChest/myTreasureChest.css";
import popularItemImg from "../images/popular-item1.jpg";
import userPicture from "../images/user-pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DitchPopup from "./subPopup";
import { library } from "@fortawesome/fontawesome-svg-core";
import Select from "react-select";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

const categoryFilter = [
  { label: "Select", value: 1 },
  { label: "Games", value: 2 },
  { label: "Toy", value: 3 }
];
const App1 = () => (
  <div className="app">
    <div className="container">
      <Select value="Newly Added" options={categoryFilter} />
    </div>
  </div>
);
const newlyAdded = [
  { label: "Newly Added", value: 1 },
  { label: "A - Z", value: 2 },
  { label: "Z - A", value: 3 },
  { label: "Nearest", value: 3 }
];
const App2 = () => (
  <div className="app">
    <div className="container">
      <Select value="Newly Added" options={newlyAdded} />
    </div>
  </div>
);

class myTreasureChest extends Component {
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      loadMore: true,
      slides: [
        {
          title: "Call of Duty : Infinate Warfare More",
          image: popularItemImg,
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Shopkins Shoppies - Bubblesiha",
          image: "https://api.androidhive.info/json/movies/2.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Leander : Cradle, Crib, High Chair, Changing",
          image: "https://api.androidhive.info/json/movies/3.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Holy Crap! This wooden rocket has some",
          image: "https://api.androidhive.info/json/movies/4.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/5.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/6.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Call of Duty : Infinate Warfare More",
          image: "https://api.androidhive.info/json/movies/1.jpg",
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Shopkins Shoppies - Bubblesiha",
          image: "https://api.androidhive.info/json/movies/2.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Leander : Cradle, Crib, High Chair, Changing",
          image: "https://api.androidhive.info/json/movies/3.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Holy Crap! This wooden rocket has some",
          image: "https://api.androidhive.info/json/movies/4.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Call of Duty : Infinate Warfare More",
          image: popularItemImg,
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Shopkins Shoppies - Bubblesiha",
          image: "https://api.androidhive.info/json/movies/2.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Leander : Cradle, Crib, High Chair, Changing",
          image: "https://api.androidhive.info/json/movies/3.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Holy Crap! This wooden rocket has some",
          image: "https://api.androidhive.info/json/movies/4.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/5.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Best Pregnancy & Baby Products for babies",
          image: "https://api.androidhive.info/json/movies/6.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Call of Duty : Infinate Warfare More",
          image: "https://api.androidhive.info/json/movies/1.jpg",
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Shopkins Shoppies - Bubblesiha",
          image: "https://api.androidhive.info/json/movies/2.jpg",
          category: "Toy",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Leander : Cradle, Crib, High Chair, Changing",
          image: "https://api.androidhive.info/json/movies/3.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        },
        {
          title: "Holy Crap! This wooden rocket has some",
          image: "https://api.androidhive.info/json/movies/4.jpg",
          category: "Baby Products",
          userPic: userPicture,
          userName: "Bruce Mars"
        }
      ]
    };
  }

  render() {
    return (
      <div className="myTreasure">
        <div className="container">
          <div className="breadcrumb">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>{" "}
              <li>Settings</li>
            </ul>
          </div>

          <div className="setting-container">
            <div className="left-container">
              <ul>
                <li>
                  <a href="/setting-profile">Profile Info</a>
                </li>
                <li>
                  <a href="/setting-change-password">Change Password</a>
                </li>
                <li>
                  <a href="/setting-subscription" className="active">
                    Subscription Management
                  </a>
                </li>
                <li>
                  <a href="/setting-email-notification">Email Notifications</a>
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
export default myTreasureChest;

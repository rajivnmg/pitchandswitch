import React, { Component } from "react";
import PublicReviews from "./public_reviews1";
//import Style from "./myTreasureChest.css";
import popularItemImg from "../../images/popular-item1.jpg";
import userPicture from "../../images/default_user@1x.png";
//import userPictureLg from "../../images/userProfileLarge.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
//import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
//import { Spin, Icon, Alert } from "antd";
//import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {fsExistsSync} from "../../components/commonFunction";
var fs = require("fs");

library.add(faHeart);
const constant = require("../../config/constant");
var moment = require("moment");
var mainNav = {
  "@media screen and (max-width: 767px)": {
    width: "100%",
    float: "none",
    display: "block",
    boxSizing: "border-box"
  }
};

class publicProfile extends Component {
  onLoadMore = () => {
    this.setState(old => ({ limit: old.limit + 10 }));
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: constant.PER_PAGE_RECORD,
      loadMore: true,

      publicProfile: {},
      products: [],
      totalTrade: 0,
      totalViewUser: 0,
      totalRating: 0,
      slides: [
        {
          title: "Call of Duty : Infinate Warfare More",
          image: popularItemImg,
          category: "Games",
          userPic: userPicture,
          userName: "Bruce Mars"
        }
      ]
    };
  }

  componentWillMount() {
    //get user public profile data
    axios
      .get("user/getPublicProfile/" + this.props.match.params.id)
      .then(result => {
        if (result.data.code === 200) {
          this.setState({
            publicProfile: result.data.result,
            products: result.data.products,
            totalTrade: result.data.totalTrade,
            totalViewUser: result.data.totalViewUser,
            totalRating: result.data.totalRating
          });
        }
      });
  }

  render() {
	  let userIhumb = userPicture;
	  if(fsExistsSync(constant.BASE_IMAGE_URL + "ProfilePic/" + this.state.publicProfile.profilePic)){
			userIhumb = constant.BASE_IMAGE_URL + "ProfilePic/" + this.state.publicProfile.profilePic;
	   }
    return (
      <div className="myTreasure noMargin">
        <div className="profile_header">
          <div className="container">
            <div className="pic">
              <img
                src={userIhumb}
                height="100px"
                width="100px"
                alt=""
              />
            </div>
            <div className="details">
              <h2>
                {this.state.publicProfile
                  ? this.state.publicProfile.firstName
                  : ""(this.state.publicProfile)
                  ? this.state.publicProfile.lastName
                  : ""}
              </h2>
              <p className="date">
                Member since:{" "}
                {moment(this.state.publicProfile.createdAt).format("LL")}
              </p>
              <p>
                {this.state.publicProfile
                  ? this.state.publicProfile.profileMessage
                  : "NA"}
              </p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <h4>{this.state.products.length}</h4>
                  <p>Products</p>
                </li>
                <li>
                  <h4>{this.state.totalTrade}</h4>
                  <p>Trades</p>
                </li>
                <li>
                  <h4>{this.state.totalViewUser}</h4>
                  <p>Total View</p>
                </li>
                <li>
                  <h4>{this.state.totalRating}</h4>
                  <p>Reviews</p>
                </li>
              </ul>
            </div>
            <div className="cl" />
          </div>
        </div>
        <div className="container whiteBg" style={mainNav}>
          <div className="whiteLeftBg" style={mainNav}>
            <div className="heading-row">
              <h1>Tresure chest</h1>
              <div className="cl" />
            </div>
            <div className="item-listing prof_box">
              {this.state.products
                .slice(0, this.state.limit)
                .map((slide, index) => {
                  return (
                    <div className="Items" key={index}>
                      <div className="pic">
                        <div className="overlay">
                          {/* <a href="#" className="favourite">
                            <FontAwesomeIcon icon="heart" /> fav
                          </a> */}
                        </div>
                        <img
                          src={
                            constant.BASE_IMAGE_URL +
                            "Products/" +
                            slide.productImages[0]
                          }
                          alt=""
                        />
                      </div>
                      <div className="details">
                        <h4>
                          <a href="/my-trade-detail">{slide.productName}</a>
                        </h4>
                        <Link
                          to={
                            "/search-listing/" +
                            (slide.productCategory
                              ? slide.productCategory._id
                              : "")
                          }
                          className="catLink"
                        >
                          {" "}
                          {slide.productCategory
                            ? slide.productCategory.title
                            : ""}
                        </Link>
                      </div>
                      <div className="userdiv">
                        <div className="user-pic">
                          {" "}
                          <FontAwesomeIcon icon="heart-o" />{" "}
                          <img
                            src={
                              constant.BASE_IMAGE_URL +
                              "ProfilePic/" +
                              this.state.publicProfile.profilePic
                            }
                            alt=""
                          />
                        </div>
                        <div className="user-name">
                          {this.state.publicProfile
                            ? this.state.publicProfile.userName
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="cl" />
            </div>
            {this.state.products.length > this.state.limit ? (
              <div>
                {this.state.loadMore ? (
                  <button
                    className="more-items"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={this.onLoadMore}
                  >
                    Load more
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="whiteRightBg" style={mainNav}>
            <PublicReviews userid={this.props.match.params.id} />
          </div>
        </div>
      </div>
    );
  }
}
export default publicProfile;

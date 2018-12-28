import React, { Component } from "react";
import ReactDOM from "react-dom";
import Style from "./home.css";
// import imgPath from '../../images'
// import "~slick-carousel/slick/slick.css";
//import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import moreIcon from "../../images/more-icon.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import popularItemImg from "../../images/popular-item1.jpg";
const constant = require("../../config/constant");

class PopularItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularItems: [],
      morePopularItem: [
        {
          title: "More products you may be intrested",
          image: moreIcon,
          category: "",
          userPic: "",
          userName: "",
          className: "moreItem"
        }
      ]
    };
  }

  componentDidMount() {
    axios.get("/product/popularItems").then(result => {
      console.log("popularItems", result);
      if (result.data.code === 200) {
        this.setState({ popularItems: result.data.result });
      }
    });
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1026,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <div className="popularItems">
        <h3>
          {" "}
          Pitch and switch's <span>popular Items</span>{" "}
        </h3>
        <Slider {...settings}>
          {this.state.popularItems.map(function(item) {
			if(item._id){
				var productImage = item._id ? item._id.productImages[0] : "";
				var userImage = item._id ? item._id.userId.profilePic : "";
				var userIds = item._id ? item._id.userId._id : "0";
				var productUrl =
				  localStorage.getItem("isLoggedIn") == 1 &&
				  localStorage.getItem("userId") == userIds
					? "/my-trade-detail/" + item._id
					: "/search-result/" + item._id;

				return (
				  <div className="slides-div" key={item}>
					<div key={item}>
					  <div className="pic">
						<NavLink to={productUrl}>
						  <img
							className="popularItemImg"
							src={
							  constant.BASE_IMAGE_URL + "Products/" + productImage
							}
						  />
						</NavLink>
					  </div>
					  <div className="details">
						<h4>
						  <NavLink to={productUrl}>
							{item._id ? item._id.productName : ""}
							{}
						  </NavLink>
						</h4>
						<NavLink
						  className="catLink"
						  to={
							"/search-listing/" +
							(item._id
							  ? item._id.productCategory
								? item._id.productCategory._id
								: ""
							  : "")
						  }
						>
						  {item._id
							? item._id.productCategory
							  ? item._id.productCategory.title
							  : ""
							: ""}
						</NavLink>
					  </div>
					  <div className="userdiv">
						<div className="user-pic">
						  <img
							src={
							  constant.BASE_IMAGE_URL + "ProfilePic/" + userImage
							}
							height="20px;"
							width="20px;"
						  />
						</div>
						<div className="user-name">
						  <NavLink
							className="alink"
							target="_blank"
							to={
							  "/public-profile/" +
							  (item._id
								? item._id.userId
								  ? item._id.userId._id
								  : ""
								: "")
							}
						  >
							{item._id
							  ? item._id.userId
								? item._id.userId.userName
								: ""
							  : ""}
						  </NavLink>
						</div>
					  </div>
					</div>
				  </div>
				);
			}
          })}
          <If condition={this.state.popularItems.length > 10}>
            <Then>
              {this.state.morePopularItem.map(function(slide) {
                return (
                  <div className={"slides-div " + slide.className} key={slide}>
                    <div key={slide}>
                      <div className="pic">
                        <NavLink to="/my-trade-detail">
                          <img src={slide.image} />
                        </NavLink>
                      </div>
                      <div className="details">
                        <h4>
                          <NavLink to="/my-trade-detail">{slide.title}</NavLink>
                        </h4>
                        <span className="catLink">{slide.category}</span>
                      </div>
                      <div className="userdiv">
                        <div className="user-pic">
                          <img src={slide.userPic} />
                        </div>
                        <div className="user-name">{slide.userName}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Then>
          </If>
        </Slider>
        {/* <NavLink to='/' className='more-items'>More items</NavLink> */}
      </div>
    );
  }
}
export default PopularItems;

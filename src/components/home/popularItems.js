import React, { Component } from "react";
import { connect } from "react-redux";
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
  NavLink,
  Link,
  withRouter
} from "react-router-dom";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import popularItemImg from "../../images/popular-item1.jpg";
import * as ActionTypes from "../../store/actionTypes";
import * as cmf from "../commonFunction";
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

setCategory = (category) => {	
	  this.props.setCategory(category);
	  cmf.changeSpaceToUnderscore(this.state.title)
	  setTimeout(() => { this.props.history.replace("/search-listing/" + cmf.changeSpaceToUnderscore(this.props.cateName))}, 500);
  };

  componentDidMount() {
    axios.get("/product/popularItems").then(result => {      
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
          {this.state.popularItems.map((item)=>{
			if(item._id){				
				var productImage = item._id ? item._id.productImages[0] : "";
				var userImage = item._id ? item._id.userId.profilePic : "";
				var userIds = item._id ? item._id.userId._id : "0";
				var productId = item._id ? item._id._id : "0";
				var productUrl =
				  (localStorage.getItem("isLoggedIn") == 1 &&
				  localStorage.getItem("userId") == userIds)
					? "/my-trade-detail/" + productId
					: "/search-result/" + productId;

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
						{/*<NavLink
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
						</NavLink>*/}
							<Link className="catLink" to={""} onClick={() => this.setCategory(item._id.productCategory)}>
							  {item._id
							? item._id.productCategory
							  ? item._id.productCategory.title
							  : ""
							: ""}
							</Link>
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
								? cmf.letterCaps(item._id.userId.userName)
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
              {this.state.morePopularItem.map((slide)=>{
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

const mapStateToProps = state => {
  return {
    catId: state.searchListingReducer.category_id,
    lat: state.searchListingReducer.latitude,
    long: state.searchListingReducer.longitude,
    cateName: state.searchListingReducer.categoryName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
	  setCategory: category => { 
		return dispatch({
			type: ActionTypes.SEARCH_LISTING_SET_CATEGORY,
			payload: {categoryId: category._id, categoryName: category.title}
		  })
	  }
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PopularItems));

//export default PopularItems;

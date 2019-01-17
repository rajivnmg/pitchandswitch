import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import icon from "../images/lockicon.png";
import axios from "axios";
import jquery from "jquery";
import * as ActionTypes from "../store/actionTypes";
import * as cmf from "./commonFunction";
const menuHide = {
  display: "none"
};

class categoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }
  setCategory = (category) => {
	  this.props.setCategory(category);
	  cmf.changeSpaceToUnderscore(this.state.title)
	  setTimeout(() => { this.props.history.replace("/search-listing/" + cmf.changeSpaceToUnderscore(this.props.cateName))}, 500);
  };

  componentDidMount() {
    axios
      .get("/category/allCategories")
      .then(result => {
        if (result.data.code === 200) {
          //console.log("allCategories",result)
          this.setState({
            category: result.data.result
          });

          jquery(".category span").click(function() {
            jquery(this)
              .next()
              .slideToggle();

            jquery(this).toggleClass("active");
          });

          jquery("<span class='plusminus'></span>").insertAfter(".submenu > a");
          jquery("<span class='plusminus2'></span>").insertAfter(
            ".submenu2 > a"
          );

          jquery(".plusminus").click(function() {
            if (
              jquery(this)
                .next(".drop2")
                .is(":visible")
            ) {
              jquery(this)
                .next(".drop2")
                .slideUp(500);
              jquery(".plusminus").removeClass("active");
            } else {
              jquery(".drop2").slideUp();
              jquery(".plusminus ").removeClass("active");
              jquery(this)
                .next(".drop2")
                .slideDown();
              jquery(this).addClass("active");
            }
          });

          jquery(".plusminus2").click(function() {
            if (
              jquery(this)
                .next(".drop3")
                .is(":visible")
            ) {
              jquery(this)
                .next(".drop3")
                .slideUp(500);
              jquery(".plusminus2").removeClass("active");
            } else {
              jquery(".drop3").slideUp();
              jquery(".plusminus2 ").removeClass("active");
              jquery(this)
                .next(".drop3")
                .slideDown();
              jquery(this).addClass("active");
            }
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        if (error.code === 401) {
          this.props.history.push("/login");
        }
      });
  }

  render() {
    return (
      <div className="category">
        <span className="cats">Category</span>
        <div className="dropDown">
          <ul>
            {this.state.category.map((slide, index) => {
              return (
                <li
                  key={slide.value}
                  className={
                    slide.children && slide.children.length ? "submenu" : null
                  }
                >
                  <img src={icon} style={menuHide} alt={icon} />{" "}
                  {/*<NavLink to={"/search-listing/" + slide._id}>
                    {slide.title}
                  </NavLink> */}
                  <a href="javascript:;" onClick={() => this.setCategory(slide)}>
					{slide.title}
                  </a>
                  {slide.children && slide.children.length ? (
                    <ul className="drop2">
                      {slide.children.map((subMenu, i) => {
                        return (
                          <li
                            key={subMenu.value}
                            className={
                              subMenu.children && subMenu.children.length
                                ? "submenu2"
                                : null
                            }
                          >{/*href={"/search-listing/" + subMenu._id}*/}
                            <a  href="javascript:;"  onClick={() => this.setCategory(subMenu)}>
                              {subMenu.title}
                            </a>
                            {subMenu.children && subMenu.children.length ? (
                              <ul className="drop3">
                                {subMenu.children.map((subMenu, i) => {
                                  return (
                                    <li key={subMenu.value}>
                                      {/*<NavLink
                                        to={"/search-listing/" + subMenu._id}
                                      >
                                        {subMenu.title}
                                      </NavLink> */}
										<a href="javascript:;" onClick={() => this.setCategory(subMenu)}>
										  {subMenu.title}
										</a>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
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
)(withRouter(categoryMenu));

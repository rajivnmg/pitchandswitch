import React, { Component } from "react";
import Style from "./main.css";
import "../slick.min.css";
import { withRouter, NavLink } from "react-router-dom";
import Logo from "../images/logo.png";
//import Logo from "../images/PandS-logo-PNG-13.png";
import userIMg from "../images/user-pic.png";
import CategoryMenu from "./categoryMenu";
import jquery from "jquery";
import { AutoComplete } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import Geocode from "react-geocode";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import $ from 'jquery'
const constant = require("../config/constant");

const Option = AutoComplete.Option;
const navHide = { display: "none" };
library.add(faTag);
class Header extends Component {
  constructor(props) {
    //let categoryId = props.match.params.id;
    super(props);
    console.log('HEader props', this.props)
    this.state = {
      user: {
        email: "",
        lastName: "",
        middleName: "",
        profilePic: "",
        userName: ""
      },
      notifications: 0,
      notifications: [],
      result: [],
      rs: [],
      options: [],
      productsListing: [],
      searchData: "",
      searchD: "",
      categoryId: "",
      latitude: "",
      longitude: "",
      address: "",
      gmapsLoaded: false,
      value: ""
    };

    Geocode.setApiKey("AIzaSyA_Is11HwzMFGIFAU-q78V2kQUiT9OQiZI");
    Geocode.enableDebug();
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  initMap = () => {
    if (navigator.geolocation) {
      if (!localStorage.getItem("latitude")) {
        navigator.geolocation.getCurrentPosition(position => {
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            () => {
              Geocode.fromLatLng(
                position.coords.latitude,
                position.coords.longitude
              ).then(
                response => {
                  //console.log('YYYYY', response)
                  const address =
                    response.results[1].address_components[3].long_name +
                    ", " +
                    response.results[1].address_components[4].long_name +
                    ", " +
                    response.results[1].address_components[7].long_name; //response.results[0].formatted_address;
                  this.setState({ address: address });
                },
                error => {
                  console.error(error);
                }
              );
            }
          );
        });
      } else {
        if (!this.state.address) {
          this.setState(
            {
              latitude: localStorage.getItem("latitude"),
              longitude: localStorage.getItem("longitude")
            },
            () => {
              Geocode.fromLatLng(
                localStorage.getItem("latitude"),
                localStorage.getItem("longitude")
              ).then(
                response => {
                  const address =
                      response.results[1].address_components[3].long_name +
                      ", " +
                      response.results[1].address_components[4].long_name +
                      ", " +
                      response.results[1].address_components[7].long_name; //response.results[0].formatted_address;
                    this.setState({ address: address });
                },
                error => {
                  console.error(error);
                }
              );
            }
          );
        }
      }
    }
    this.setState({
      gmapsLoaded: true,
      address:localStorage.getItem("address")
    });
  };

  handleChange = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    this.setState({ address: address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        localStorage.setItem("latitudeNew", latLng["lat"]),
          localStorage.setItem("longitudeNew", latLng["lng"]);
        this.setState({ latitude: latLng["lat"], longitude: latLng["lng"] });
      })
      .catch(error => console.error("Error", error));
  };

  formatEndpoint = () => {
    let endpoint = this.state.longitude;

    if (endpoint == "") {
      this.setState({ address: "" });
    }
  };

  logoutHandler = e => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("isLoggedIn", 0);
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    this.props.history.push("/login");
  };

  searchHandler = () => {
    this.props.setData(this.state.searchData);
    this.props.history.replace("/search-listing");
  };

  searchCategory = _id => {
    this.setState({ searchData: _id });
    return true;
  };

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
          localStorage.setItem(
            "Latitude",
            result.data.result.loct.coordinates[0]
          );
          localStorage.setItem(
            "Longitude",
            result.data.result.loct.coordinates[1]
          );
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
    }else{
         $.ajax('http://ip-api.com/json')
		  .then(
			  function success(response) {
				  console.log('User\'s Location Data is ', response);
				  localStorage.setItem("Latitude", response.lat);
				  localStorage.setItem("Longitude", response.lon);
				  localStorage.setItem("ipAddress", response.query);
				  localStorage.setItem("address",response.city);
			  },
			  function fail(data, status) {
				  //console.log('Request failed.  Returned status of',status);
					localStorage.setItem("Latitude", '34.052238');
					localStorage.setItem("Longitude", '-118.243340');
					localStorage.setItem("ipAddress", '161.149.146.201');
			  }
		  );

	}
  }
  filterOption = (value, option) => {
    if ((value != undefined || value !== null) && typeof value === "string")
      return (
        value.toLowerCase() === option.props.children.substring(0, value.length).toLowerCase()
      );
    return false;
  };
  componentDidMount() {
    //code for google places api
    window.initMap = this.initMap;
    if(localStorage.getItem('latitudeNew')){
      if(!this.state.latitude)
      this.setState({
        latitude: localStorage.getItem('latitudeNew'),
        longitude: localStorage.getItem('longitudeNew')
      });
    }else{
      if(localStorage.getItem('latitude') && !this.state.latitude)
      this.setState({
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude')
      });
    }
    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_Is11HwzMFGIFAU-q78V2kQUiT9OQiZI&libraries=places&callback=initMap`;
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl);

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (localStorage.getItem("jwtToken") !== null) {
      axios.get("/user/frontNotification").then(result => {
        this.setState({
          notification_type: result.data.notification_type,
          notifications: result.data.notifications,
          totalNotifications: result.data.totalNotifications
        });
      });
      // console.log("localStorage",localStorage.getItem('isLoggedIn'));

      let width = window.innerWidth;

      if (width < 768) {
        jquery(".mob_search").click(function() {
          jquery(this)
            .next()
            .slideToggle();
          jquery(".category .dropDown").hide(500);
        });

        jquery(".after-login .drop-arrow").click(function() {
          jquery(".category .dropDown").hide(500);
          jquery(".search-container").hide(500);
        });
      }
    }

    // HTTP request to get the list of cities and active product from the server
    axios
      .all([
        axios.get("/location/listingCity"),
        axios.get("/product/activeProducts")
      ])
      .then(
        axios.spread((rcities, rsProduct) => {
          if (rcities.data.code === 200) {
            this.setState({ options: rcities.data.result });
          }
          if (rsProduct.data.code === 200) {
            this.setState({ productsListing: rsProduct.data.result });
          }
        })
      )
      .catch(error => console.log(error));
  }

  Capitalize(str) {
    if (str.length == 0) {
      return str;
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  render() {
    let optionsLists;
    let optionsAll;
    if (this.state.productsListing) {
      const optionsList = [...this.state.productsListing];
      optionsLists = optionsList.map(category => (
        <Option
          onClick={() => this.searchCategory(category.productCategory._id)}
          key={category._id + ":" + category.productCategory._id}
        >
          {category.productName + " - " + category.productCategory.title}
        </Option>
      ));
    }
    if (this.state.options) {
      let optionsListing = this.state.options;
      optionsAll = optionsListing.map(p => (
        <li key={p._id}>{p.cityName + " - " + p.stateSelect.stateName}</li>
      ));
    }
    let matchingData = this.state.notification_type;
    return (
      <header>
        <figure className="logo">
          <If condition={localStorage.getItem("isLoggedIn") == "1"}>
            <Then>
              <NavLink to={"/dashboard"}>
                <img src={Logo} alt="logo" />
              </NavLink>
            </Then>
            <Else>
              <NavLink to={"/"}>
                <img src={Logo} alt="logo" />
              </NavLink>
            </Else>
          </If>
        </figure>
        <CategoryMenu />

        <div className="mob_search">
          {" "}
          <i className="icon" />
        </div>
        <div className="search-container">
          <div className="location">
            {this.state.gmapsLoaded && (
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                name={"address"}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input form-control"
                      })}
                      required={true}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            )}
          </div>
          <div className="search">
            <AutoComplete
              style={{ width: 410 }}
              placeholder="Search"
              dataSource={optionsLists}
              filterOption={(inputValue, option) =>
                this.filterOption(inputValue, option)
              }
              allowClear={true}
            />
          </div>
          <button
            type="button"
            onClick={this.searchHandler}
            className="search-icon"
          >
            &nbsp;
          </button>
          <div className="cl" />
          {this.state.value}
        </div>
        <If condition={localStorage.getItem("isLoggedIn") == "1"}>
          <Then>
            <nav className="after-login">
              <ul>
                <li>
                  <span className="pic">
                    <img src={userIMg} alt={userIMg} />
                  </span>
                  <a className="drop-arrow" href="#">
                    {this.Capitalize(this.state.user.userName.substring(0, 5))}
                  </a>
                  <ul className="dashboard-subnav">
                    <li>
                      <NavLink to={"/dashboard"} className="dashboard-icon">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/my-trades"} className="my-trades-icon">
                        My Trades
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/wishlist"} className="wishlist-icon">
                        Wishlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/trade-match"} className="trade-match-icon">
                        Trade Match
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/my-treasure-chest"}
                        className="my-chest-icon"
                      >
                        My Treasure Chest
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/setting-profile"}
                        className="settings-icon"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/help"} className="help-icon">
                        Help
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/logout"}
                        onClick={this.logoutHandler}
                        className="login-link"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="notification ">
                  <a href="#">
                    <i className="icon" />
                  </a>
                  <ul className="dashboard-subnav notification-show">
                    <li>
                      <h3>Notifications {this.state.totalNotifications}</h3>
                    </li>
                    <li>
                      <div className="scroll-div">
                        {this.state.notifications.map(
                          (notificationValue, i) => {
                            const notifyHeading = this.state.notification_type.find(
                              notify =>
                                notify.id ===
                                notificationValue.notificationTypeId
                            );
                            return (
                              <div
                                key={notificationValue.notificationTypeId}
                                className="row unread"
                              >
                                <FontAwesomeIcon icon="tag" />
                                {i + 1 + ") " + notifyHeading.name}{" "}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </Then>
          <Else>
            <nav className="login-nav">
              <NavLink to={"/login"} className="login-link">
                Login
              </NavLink>
              <NavLink to={"/register"} className="register-link">
                Register
              </NavLink>
            </nav>
          </Else>
        </If>
        <div className="cl" />
      </header>
    );
  }
}

export default withRouter(Header);

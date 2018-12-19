import React, { Component } from "react";
import bannerImg from "../../images/banner.jpg";
import { Link } from "react-router-dom";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={bannerImg} alt={bannerImg} />
        <div className="banner-details">
          <h1>Be your own entrepreneur</h1>
          <Link className="home-btn" to={"/login"}>
            Start Swapping
          </Link>
          <Link className="home-btn" to={"/#how-it-works"}>
            How It Works?
          </Link>
          <div className="cl" />
        </div>
      </div>
    );
  }
}

export default Banner;

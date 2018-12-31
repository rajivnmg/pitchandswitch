import React, { Component } from "react";
import "./home.css";
import WeKeepIcon1 from "../../images/we-keep-icon1.png";
import WeKeepIcon2 from "../../images/we-keep-icon2.png";
import WeKeepIcon3 from "../../images/we-keep-icon3.png";

class HowItWorks extends Component {
  render() {
    return (
      <div className="weKeepSafe">
        <div className="container">
          <h3>We keep you safe</h3>
          <ul>
            <li>
              <div className="icon">
                <img src={WeKeepIcon1} alt="" />
              </div>
              <h4>Trustworthy customers</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </li>
            <li>
              <div className="icon">
                <img src={WeKeepIcon2} alt="" />
              </div>
              <h4>World-class security</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </li>
            <li>
              <div className="icon">
                <img src={WeKeepIcon3} alt="" />
              </div>
              <h4>Payment protection</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default HowItWorks;

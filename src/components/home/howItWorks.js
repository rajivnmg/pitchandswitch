import React, { Component } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div className="howitworks">
        <div className="container">
          <h3>
            <a name="how-it-works">How it works</a>
          </h3>
          <p>
           Pitch and Switch is the easiest way to alleviate clutter and simultaneously get something you want, all on your own terms. Repurposing your older items saves time, money, space and also enables everyone to become an instant entrepreneur. Simply register to start your journey of consumer empowerment. 
          </p>
          
          <ul className="hmlist">
          
          <li>Upload items you wish to trade.</li>
		 <li>Review trade matches or browse items you wish to receive in return.</li>
		<li>Send trade pitch, negotiate if needed, and execute trade in a manner that works best for both parties.</li>
          
          </ul>
 
          
          <ModalVideo
            channel="youtube"
            ratio={"16:9"}
            isOpen={this.state.isOpen}
            videoId="aSDHbyekk2w"
            onClose={() => this.setState({ isOpen: false })}
          />
          <Link to=""  onClick={this.openModal} className="more-items">
            Watch Videos
          </Link>
        </div>
      </div>
    );
  }
}
export default HowItWorks;

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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
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

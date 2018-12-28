import React, { Component } from "react";
import bannerImg from "../../images/banner.jpg";
import { Link } from "react-router-dom";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
class Banner extends Component {
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
      <div className="banner">
        <img src={bannerImg} alt={bannerImg} />
        <div className="banner-details">
          <h1>Be your own entrepreneur</h1>
          <Link className="home-btn" to={"/login"}>
            Start Swapping
          </Link>
          <ModalVideo
            channel="youtube"
            ratio={"16:9"}
            isOpen={this.state.isOpen}
            videoId="aSDHbyekk2w"
            onClose={() => this.setState({ isOpen: false })}
          />
          <Link onClick={this.openModal} className="home-btn">
            How It Works?
          </Link>
          <div className="cl" />
        </div>
      </div>
    );
  }
}

export default Banner;

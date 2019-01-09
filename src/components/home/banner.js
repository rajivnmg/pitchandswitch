import React, { Component } from "react";
import bannerImg from "../../images/banner.jpg";
import { Link } from "react-router-dom";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import { If, Then, Else } from "react-if-elseif-else-render";
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
          <ModalVideo
            channel="youtube"
            ratio={"16:9"}
            isOpen={this.state.isOpen}
            videoId="aSDHbyekk2w"
            onClose={() => this.setState({ isOpen: false })}
          />
          <Link to={"#/"} onClick={this.openModal} className="home-btn">
            How It Works?
          </Link>
          
          <If condition={localStorage.getItem("isLoggedIn") == "1"}>
            <Then>
               <Link className="home-btn" to={"/dashboard"}>
					Start Swapping
				</Link>
            </Then>
            <Else>
               <Link className="home-btn" to={"/login"}>
					Start Swapping
				</Link>
            </Else>
          </If>
          <div className="cl" />
        </div>
      </div>
    );
  }
}

export default Banner;

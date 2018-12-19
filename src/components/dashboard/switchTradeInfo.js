import React, { Component } from "react";
//import Warper from "../common/Warper";
import Popup from "reactjs-popup";
//import rcvProduct from "../../images/rcv-product-img.jpg";
//import offerProduct1 from "../../images/offer-product-img1.jpg";
//import offerProduct3 from "../../images/offer-product-img3.jpg";
//import userPic from "../../images/user-pic.png";
import axios from "axios";
const constant = require("../../config/constant");

const style1 = {
  background: "none",
  marginBottom: "40px"
};

const contentStyle = {
  maxWidth: "660px",
  width: "90%"
};

class switchTradeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerTrade: this.props.offerTrade,
      switches: [],
      switchedProducts: []
    };
  }

  componentWillMount() {
    this.setState({ offerTradeId: this.state.offerTrade._id });
  }

  componentDidMount() {
    axios
      .get("/trade/switchedProduct/" + this.state.offerTrade._id)
      .then(result => {
        console.log("result", result.data.result);
        if (result.data.code === 200) {
          this.setState({ switchedProducts: result.data.result });
        }
      });
  }

  render() {
    const proImg = this.state.offerTrade.offerTradeId.SwitchUserProductId
      ? this.state.offerTrade.offerTradeId.SwitchUserProductId.productImages[0]
      : "";
    const productIMG = this.state.offerTrade.offerTradeId.SwitchUserId
      ? this.state.offerTrade.offerTradeId.SwitchUserId.profilePic
      : "";
    const switchImg = this.state.switchedProducts.tradePitchProductId
      ? this.state.switchedProducts.tradePitchProductId.productImages[0]
      : "";
    const userImg = this.state.switchedProducts.tradePitchProductId
      ? this.state.switchedProducts.tradePitchProductId.userId.profilePic
      : "";

    return (
      <Popup
        trigger={<a className="TradeInfobtn"> View Pitch</a>}
        modal
        contentStyle={contentStyle}
        lockScroll
      >
        {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header">
              Swithched Products
              <div className="cl" />
            </div>
            {/*start content box */}
            <div className="content" style={style1}>
              <div className="received-product">
                <div className="received-product-box">
                  <div className="received-product-image-box">
                    <img
                      src={constant.BASE_IMAGE_URL + "Products/" + proImg}
                      alt="recieved-product"
                    />
                  </div>
                  <div className="received-product-content-box">
                    <span>
                      Product ID:{" "}
                      <strong>
                        {this.state.offerTrade.offerTradeId.SwitchUserProductId
                          ? this.state.offerTrade.offerTradeId
                              .SwitchUserProductId._id
                          : ""}
                      </strong>
                    </span>
                    <h4>
                      {this.state.offerTrade.offerTradeId.SwitchUserProductId
                        ? this.state.offerTrade.offerTradeId.SwitchUserProductId
                            .productName
                        : ""}
                    </h4>
                    <a className="catLink" href="/">
                      {" "}
                      {this.state.offerTrade.offerTradeId.SwitchUserProductId
                        ? this.state.offerTrade.offerTradeId.SwitchUserProductId
                            .productCategory
                        : ""}
                    </a>
                    <div className="ratingRow">
                      <div class="pic">
                        <img
                          src={
                            constant.BASE_IMAGE_URL + "ProfilePic/" + productIMG
                          }
                          alt=""
                        />
                      </div>
                      <p>
                        {this.state.offerTrade.SwitchUserId
                          ? this.state.offerTrade.offerTradeId.SwitchUserId
                              .userName
                          : ""}
                      </p>
                      <div class="rated">4</div>
                    </div>
                  </div>
                </div>
                <div className="cl" />
              </div>
            </div>
            {/*end content box */}
            {/*start content box */}
            <div className="content" style={style1}>
              <div className="received-product">
                <div className="received-product-box">
                  <div className="received-product-image-box">
                    <img
                      src={constant.BASE_IMAGE_URL + "Products/" + switchImg}
                      alt="recieved-product"
                    />
                  </div>
                  <div className="received-product-content-box">
                    <span>
                      Product ID:{" "}
                      <strong>
                        {this.state.switchedProducts.tradePitchProductId
                          ? this.state.switchedProducts.tradePitchProductId._id
                          : ""}
                      </strong>
                    </span>
                    <h4>
                      {this.state.switchedProducts.tradePitchProductId
                        ? this.state.switchedProducts.tradePitchProductId
                            .productName
                        : ""}
                    </h4>
                    <a className="catLink" href="/">
                      {this.state.switchedProducts.tradePitchProductId
                        ? this.state.switchedProducts.tradePitchProductId
                            .description
                        : ""}
                    </a>
                    <div className="ratingRow">
                      <div class="pic">
                        <img
                          src={
                            constant.BASE_IMAGE_URL + "ProfilePic/" + userImg
                          }
                          alt=""
                        />
                      </div>
                      <p>
                        {this.state.switchedProducts.tradePitchProductId
                          ? this.state.switchedProducts.tradePitchProductId
                              .userId.userName
                          : ""}
                      </p>
                      <div class="rated">4</div>
                    </div>
                  </div>
                </div>
                <div className="cl" />
              </div>
            </div>
            {/*start content box */}
          </div>
        )}
      </Popup>
    );
  }
}
export default switchTradeInfo;

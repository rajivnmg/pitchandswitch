import React, { Component } from "react";
import "./home.css";
import Banner from "./banner";
import HomeSponsors from "./sponsors";
import PopularItems from "./popularItems";
import Testimonials from "./testimonials";
import Donate from "./donate";
import NewlyProducts from "./newlyProducts";
import WhatOtherSwitched from "./whatOtherSwitched";
import MostTrusted from "./mostTrusted";
import HowItWorks from "./howItWorks";
import WeKeepSafe from "./weKeepSafe";
import WhatPitchSwitch from "./whatPitchSwitch";
import Aux from "../../hoc/Auxillary";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopularItemEnable: true,
      isHomeSponsorsEnable: true,
      isTestimonialsEnable: true,
      isDonateEnable: true,
      isNewlyProductsEnable: true,
      isWhatOtherSwitchedEnable: true,
      isMostTrustedEnable: true,
      isHowItWorksEnable: true,
      isWeKeepSafeEnable: true,
      isWhatPitchSwitchEnable: true,
      youTubeVideoId: ""
    };
  }

  componentDidMount() {
    //write  in this which you want just ofter rendering the page
    axios
      .get("/setting/getModulesSetting")
      .then(result => {
        if (result.data.code === 200) {
          console.log("result", result.data.result[0]);
          if (result.data.result && result.data.result.length > 0) {
            this.setState({
              isPopularItemEnable: result.data.result[0].isPopularItem,
              isHomeSponsorsEnable: result.data.result[0].isHomeSponsors,
              isTestimonialsEnable: result.data.result[0].isTestimonials,
              isDonateEnable: result.data.result[0].isDonate,
              isNewlyProductsEnable: result.data.result[0].isNewlyProducts,
              isWhatOtherSwitchedEnable:
                result.data.result[0].isWhatOtherSwitched,
              isMostTrustedEnable: result.data.result[0].isMostTrusted,
              isHowItWorksEnable: result.data.result[0].isHowItWorks,
              isWeKeepSafeEnable: result.data.result[0].isWeKeepSafe,
              isWhatPitchSwitchEnable: result.data.result[0].isWhatPitchSwitch,
              youTubeVideoId: result.data.result[0].youTubeVideoId
            });
          }
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
      <Aux>
        <div className="home">
          <Banner />
          {this.state.isHomeSponsorsEnable && <HomeSponsors />}
          {this.state.isPopularItemEnable && <PopularItems />}
          {this.state.isTestimonialsEnable && <Testimonials />}
          {this.state.isDonateEnable && <Donate />}
          {this.state.isNewlyProductsEnable && <NewlyProducts />}
          {this.state.isWhatOtherSwitchedEnable && <WhatOtherSwitched />}
          {this.state.isMostTrustedEnable && <MostTrusted />}
          {this.state.isHowItWorksEnable && <HowItWorks />}
          {this.state.isWeKeepSafeEnable && <WeKeepSafe />}
          {this.state.isWhatPitchSwitchEnable && <WhatPitchSwitch />}
        </div>
      </Aux>
    );
  }
}
export default Home;

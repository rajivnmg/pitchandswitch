import React, { Component } from "react";
import Style from "./home.css";
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
import Aux from "../../hoc/Aux";
import axios from 'axios';
class Home extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isPopularItemEnable : true,
			isHomeSponsorsEnable : true,
			isTestimonialsEnable : true,			
			isDonateEnable : true,
			isNewlyProductsEnable : true,
			isWhatOtherSwitchedEnable : true,
			isMostTrustedEnable : true,
			isHowItWorksEnable : true,
			isWeKeepSafeEnable : true,
			isWhatPitchSwitchEnable : true
		}		
  }
  
  componentDidMount(){
	 //write  in this which you want just ofter rendering the page
	 
  }
  
  render() {
    return (
      <Aux>
        <div className="home">		
		<Banner />		
		{this.state.isHomeSponsorsEnable &&	
		<HomeSponsors />
		}
		{this.state.isPopularItemEnable &&	
		 <PopularItems />
		} 
		{this.state.isTestimonialsEnable &&	
		<Testimonials />
		} 
		{this.state.isDonateEnable &&	
		<Donate />
		} 
		{this.state.isNewlyProductsEnable &&	
		<NewlyProducts />
		} 
		{this.state.isWhatOtherSwitchedEnable &&	
		<WhatOtherSwitched />
		} 
		{this.state.isMostTrustedEnable &&	
		<MostTrusted />
		} 
		{this.state.isHowItWorksEnable &&	
		<HowItWorks />
		} 
		{this.state.isWeKeepSafeEnable &&	
		<WeKeepSafe />
		} 
		{this.state.isWhatPitchSwitchEnable &&	
		<WhatPitchSwitch />
		} 
		 
        </div>
      </Aux>
    );
  }
}
export default Home;


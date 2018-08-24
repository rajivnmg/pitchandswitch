import React, { Component } from 'react';
import Style from './home.css';
import Banner from './banner'
import HomeSponsors from './sponsors'
import PopularItems from './popularItems'
import Testimonials from './testimonials'
import Donate from './donate'
import NewlyProducts from './newlyProducts'
import WhatOtherSwitched from './whatOtherSwitched'
import HowItWorks from './howItWorks'
import WeKeepSafe from './weKeepSafe'
import WhatPitchSwitch from './whatPitchSwitch'


class Home extends Component {
    render() {
        return (
                <div className="home">
                    <Banner />
                    <HomeSponsors />
                    <PopularItems />
                    <Testimonials />
                    <Donate />
                    <NewlyProducts />
                    <WhatOtherSwitched />
                    <HowItWorks />
                    <WeKeepSafe />
                    <WhatPitchSwitch />
                </div>
                );
    }
}
export default Home;

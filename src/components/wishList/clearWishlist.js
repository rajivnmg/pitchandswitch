import React, { Component } from 'react';
import Style from './wishlist.css';
import popularItemImg from '../../images/popular-item1.jpg';
import emptyArt from '../../images/empty_art.png';
import Select from 'react-select';
import DitchPopup from './clearWishListPopup'

class myTreasureChest extends Component {
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li><li>My Wishlist</li>
                            </ul>
                        </div>
                        <div className="heading-row">
                             
                            <h1>My Wishlist</h1>
                            <div className="cl"></div>
                        </div>
                        <div className="search-row">
                            
                            <div className="cl"></div>
                        </div>
                        <div className="item-listing donateProducts">
                        <div className="empltyArt">
                          <img src={emptyArt} />
                          <p>You Haven't save anything yet.</p>
                            <div className="cl"></div>
                            </div>
                        </div>
                         
                        <div>&nbsp;</div>
                
                    </div>
                </div>
                    );
    }
}
export default myTreasureChest;

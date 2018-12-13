import React, { Component } from 'react';
import Style from './myTreasureChest/myTreasureChest.css';
import popularItemImg from '../images/popular-item1.jpg';
import userPicture from '../images/user-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart);



const categoryFilter = [
    {label: "Select", value: 1},
    {label: "Games", value: 2},
    {label: "Toy", value: 3}
];
const App1 = () => (
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={categoryFilter} />
                </div>
            </div>
            );
const newlyAdded = [
    {label: "Newly Added", value: 1},
    {label: "A - Z", value: 2},
    {label: "Z - A", value: 3},
    {label: "Nearest", value: 3}
];
const App2 = () => (
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={newlyAdded} />
                </div>
            </div>
            );

class myTreasureChest extends Component {
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    constructor(props)
    {
        super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            slides: [{
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": "https://api.androidhive.info/json/movies/1.jpg",
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                }, {
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": popularItemImg,
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/5.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Best Pregnancy & Baby Products for babies",
                    "image": "https://api.androidhive.info/json/movies/6.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Call of Duty : Infinate Warfare More",
                    "image": "https://api.androidhive.info/json/movies/1.jpg",
                    "category": "Games",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Shopkins Shoppies - Bubblesiha",
                    "image": "https://api.androidhive.info/json/movies/2.jpg",
                    "category": "Toy",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Leander : Cradle, Crib, High Chair, Changing",
                    "image": "https://api.androidhive.info/json/movies/3.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                },
                {
                    "title": "Holy Crap! This wooden rocket has some",
                    "image": "https://api.androidhive.info/json/movies/4.jpg",
                    "category": "Baby Products",
                    "userPic": userPicture,
                    "userName": "Bruce Mars"
                }
            ],

        }
        ;
    }

    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li> <li>Settings</li>
                            </ul>
                        </div>
                
                
                        <div className="setting-container">
                            <div className="left-container">
                                <ul>
                                    <li><a href="/setting-profile">Profile Info</a></li>   
                                    <li><a href="/setting-change-password">Change Password</a></li>   
                                    <li><a href="/setting-subscription">Subscription Management</a></li>   
                                    <li><a href="/setting-email-notification" className="active">Email Notifications</a></li>   
                                </ul>
                            </div>
                            <div className="right-container">
                                <div className="change-password">
    
            
    
                                    <div className="form-row login-row no-margin">
                                    <div className="radioRight fr">
        <input type="checkbox" value="None" id="checkbox-toggle-with-text" className="checkbox-toggle" name="checkbox-toggle-with-text" />
            <label className="checkbox-toggle-label" htmlFor="checkbox-toggle-with-text"> <span className="on">ON</span><span className="off">OFF</span></label> 
        </div>
                                        <h3>Email Notifications</h3>
                                        <p className="brdr-btm">You can select the notifications which you wants to receive through checkbox.</p>
                                    </div>
                                    <div>
                                    <div className="checkbox-row">
                                        <div className="check-box ">
                                            <input name="Lenovo" id="cat1" type="checkbox" />
                                            <label htmlFor="cat1">New message received</label>
                                        </div>
                                        </div>
                                        <div className="checkbox-row active">
                                        <div className="check-box ">
                                        <input name="Lenovo" id="cat2" type="checkbox" defaultChecked />
                                            <label htmlFor="cat2">New trade request</label>
                                        </div>
                                        </div>
                                        <div className="checkbox-row">
                                        <div className="check-box ">
                                            <input name="Lenovo" id="cat3" type="checkbox" />
                                            <label htmlFor="cat3">Trade rejected</label>
                                        </div>
                                        </div>
                                        <div className="checkbox-row">
                                        <div className="check-box ">
                                            <input name="Lenovo" id="cat4" type="checkbox" />
                                            <label htmlFor="cat4">Updates on shipping status</label>
                                        </div>
                                        </div>
                                        <div className="checkbox-row">
                                        <div className="check-box ">
                                            <input name="Lenovo" id="cat5" type="checkbox" />
                                            <label htmlFor="cat5">Pitch and Switch Update Communications</label>
                                        </div>
                                        </div>
                                         <div>
                                            &nbsp;
                                        </div>
                                        <div className="form-row">
                                            <button type={"submit"} className={"submitBtn fl"} >Change</button>
                                        </div>
                                    </div>
                                    <div className="cl"> </div>
                                </div>
                            </div>
                            <div className="cl"></div>
                        </div>
                    </div>
                </div>
                );
    }
}
export default myTreasureChest;
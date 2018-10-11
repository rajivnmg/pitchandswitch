import React, { Component } from 'react';
import Style from './myTreasureChest/myTreasureChest.css';
import popularItemImg from '../images/popular-item1.jpg';
import userPicture from '../images/user-pic.png';
import userPicture1 from '../images/userProfileLarge.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-date-picker'
library.add(faHeart);

class DateDiv extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({date}
        )

    render() {
        return (
                <div>
                    <DatePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        />
                </div>
                );
    }
}

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

    onChange = date => this.setState({date}
        )
    constructor(props)
    {
        super(props);
        this.state = {
            limit: 10,
            date: new Date(),
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
                                   <li><a href="/setting-profile" className="active">Profile Info</a></li>   
                                    <li><a href="/setting-change-password">Change Password</a></li>   
                                    <li><a href="/setting-subscription">Subscription Management</a></li>   
                                    <li><a href="/setting-email-notification">Email Notifications</a></li>     
                                </ul>
                            </div>
                            <div className="right-container">
                                <div className="change-password">
                                    <div className="form-row login-row">
                                        <h3>Profile Info</h3>
                                        <p className="brdr-btm">Here you can update your personal details it will not going to see anyone</p>
                                    </div>
                                    <div>
                                        <div className="profileRow">
                                        <div className="pic"><img src={userPicture1} alt="" /></div>
                                        <div className="details">
                                        <a href="#" className={"yellowBtn fl"}>Upload now</a>
                                        <a href="#" className={"grayBtn fl"}>Delete</a>
                                            <div className="cl"></div>
        <p>JPG, GIF or PNG. Max size of 800K</p>
        </div>
                                        <div className="cl"></div>
                                        </div>
                                        <div className="form-row">
                                            <div className="invalid-feedback validation"> </div>   
                                            <span className="astrik">*</span>
                                            <label className="label" htmlFor={"name"}>Name</label>
                                            <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" defaultValue="Robert Dawney Jr." />
                                        </div>
                                        <div className="form-row">
                                            <div className="invalid-feedback validation"> </div>
                                            <span className="astrik">*</span>
                                            <label className="label"
                                                   htmlFor={"description"}
                                                   >
                                                Profile Message
                                            </label>
                                            <textarea
                                                id={"description"}
                                                className={"form-control textBox"}
                                                required={true}
                                                name={"description"}
                                                type={"description"}
                                                placeholder="" defaultValue="I design experience and interfaces for humans. Let's create something beautiful together."
                                                ></textarea>
                                        </div>
                                        <div className="form-row">
                                            <div className="colum">
                                                <div className="invalid-feedback validation"> </div>             
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"size"}>Email address</label>
                                                <input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"email"} placeholder="" defaultValue="robertdawney.jr@gmail.com" /></div>
                                            <div className="colum right">
                                                <div className="invalid-feedback validation"> </div>             
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"brand"}>Date of Birth</label>
                                                <DateDiv />
                
                
                                            </div>
                                            <div className="cl"></div>
                
                                        </div>
                
                                        <div className="form-row">
                                            <div className="colum">
                                                <label className="label" htmlFor={"age"}>Address Line 1:</label>
                                                <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="4138  " />
                
                                            </div>
                                            <div className="colum right">
                                                <label className="label" htmlFor={"age"}>Address Line 2:</label>
                                                <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="Pin Oak Drive" />
                
                                            </div>
                                            <div className="cl"></div>
                                        </div>
                                        <div className="form-row">
                                            <div className="colum">
                                                <div className="invalid-feedback validation"> </div>   
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"age"}>City</label>
                                                <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="New York" /></div>
                                            <div className="colum right">
                                                <div className="invalid-feedback validation"> </div>          
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"condition"}>State</label>
                                                <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="NY" /></div>
                                            <div className="cl"></div>
                
                                        </div><div className="form-row">
                                            <div className="colum">
                                                <div className="invalid-feedback validation"> </div>   
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"age"}>ZIP / Postal Code:</label>
                                                <input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" defaultValue="38922" /></div>
                                            <div className="colum right">
                                                <div className="invalid-feedback validation"> </div>          
                                                <span className="astrik">*</span>
                                                <label className="label" htmlFor={"condition"}>Country</label>
                                                <div className="select-box">
                                                    <select required={true} name={"condition"}  defaultValue="Good">
                                                        <option>Select</option>
                                                        <option>USA</option>
                                                    </select>
                                                </div></div>
                                            <div className="cl"></div>
                
                                        </div>
                                        <div className="form-row">
                                            <div className="invalid-feedback validation"> </div>   
                                            <span className="astrik">*</span>
                                            <label className="label" htmlFor={"name"}>Phone Number</label>
                                            <input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" defaultValue="562-948-6369" />
                                        </div>
                
                                        <div className="form-row no-padding">
                                        <a href="#" className={"grayBtn fr"}>Deactivate account</a>
                                        <p className="createdOn">Account created on 20/5/2018</p>
                                            <button
                                                type={"submit"}
                                                className={"submitBtn fl"}
                                                >
                                                Save
                                            </button>
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
import React, { Component } from 'react';
import Style from './search-listing.css';
import colorImg from '../../images/color.png';
import { Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
const Hide = {
    display: "none"
}

class Register extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slides: [{
                    id: 1,
                    title: "Call of Duty : Infinate Warfare More",
                    image: popularItemImg,
                    category: "Games"
                },
                {
                    id: 2,
                    title: "Shopkins Shoppies - Bubblesiha",
                    image: "https://api.androidhive.info/json/movies/2.jpg",
                    category: "Toy"
                },
                {
                    id: 3,
                    title: "Leander : Cradle, Crib, High Chair, Changing",
                    image: "https://api.androidhive.info/json/movies/3.jpg",
                    category: "Baby Products"
                },
                {
                    id: 4,
                    title: "Holy Crap! This wooden rocket has some",
                    image: "https://api.androidhive.info/json/movies/4.jpg",
                    category: "Baby Products"
                },
                {
                    id: 5,
                    title: "Best Pregnancy &amp; Baby Products for babies",
                    image: "https://api.androidhive.info/json/movies/5.jpg",
                    category: "Toy"
                },
                {
                    id: 6,
                    title: "Best Pregnancy &amp; Baby Products for babies",
                    image: "https://api.androidhive.info/json/movies/6.jpg",
                    category: "Baby Products"
                },
                {
                    id: 7,
                    title: "Call of Duty : Infinate Warfare More",
                    image: "https://api.androidhive.info/json/movies/1.jpg",
                    category: "Games"
                },
                {
                    id: 8,
                    title: "Shopkins Shoppies - Bubblesiha",
                    image: "https://api.androidhive.info/json/movies/2.jpg",
                    category: "Toy"
                },
                {
                    id: 9,
                    title: "Leander : Cradle, Crib, High Chair, Changing",
                    image: "https://api.androidhive.info/json/movies/3.jpg",
                    category: "Baby Products"
                },
                {
                    id: 10,
                    title: "Holy Crap! This wooden rocket has some",
                    image: "https://api.androidhive.info/json/movies/4.jpg",
                    category: "Baby Products"
                },
                {
                    id: 11,
                    title: "Best Pregnancy &amp; Baby Products for babies",
                    image: "https://api.androidhive.info/json/movies/5.jpg",
                    category: "Toy"
                },
                {
                    id: 12,
                    title: "Best Pregnancy &amp; Baby Products for babies",
                    image: "https://api.androidhive.info/json/movies/6.jpg",
                    category: "Baby Products"
                }
            ],
            result: [],
            query: ''

        }
        ;
    }
    handleInputChange = () => {

        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()

                }
            } else if (!this.state.query) {

            }
        })
    }

    getInfo = () => {
        console.log(this.state.slides)
        let ArraySlides = this.state.slides
        let ArrayNew;
        for (var i = 0; i < this.state.slides.length; i++) {
            // alert(ArraySlides[i].title)
            ArrayNew = ArraySlides[i].title 
            
// retrun ArrayNew;
        }
        this.setState({

            results: this.state.slides

        })

    }
    render() {
        return (
                <div className="search-page">
                    <div className="container">
                        <div className="lft-section">
                            <div className="column">
                                <h4>All categories</h4>
                                <ul className="categorie-name">
                                    <li><a href="javascript:void(0)">Toys & Games</a></li>
                                    <li><a href="javascript:void(0)">Art & Collectibles</a></li>
                                    <li><a href="javascript:void(0)">Electronics & Accessories</a></li>
                                    <li><a href="javascript:void(0)">Clothing</a></li>
                                    <li><a href="javascript:void(0)">Craft Supplies & Tools</a></li>
                                </ul>
                            </div>
                            <div className="column">
                                <h4>Location</h4>
                                <div className="select-box">
                                    <select>
                                        <option>Texas</option>
                                        <option>Texas</option>
                                        <option>Texas</option>
                                    </select>
                                </div>
                                <div className="distance-range">
                                    <span>Distance</span>
                                    <div className="range-slider">
                                        <div id="slider-range"></div>
                                    </div>
                                    <div className="cl"></div>
                                    <div id="min" className="range fl">0 <span>mile</span></div> 
                                    <div id="max" className="range fr">15<span>mile</span></div>
                                </div>
                                <div className="cl"></div>	
                            </div>
                            <div className="column">
                                <h4>Size</h4>
                                <div className="select-box">
                                    <select>
                                        <option>Select</option>
                                        <option>Select 1</option>
                                        <option>Select 2</option>
                                    </select>
                                </div>
                                <span href="javascript:void(0)" className="tagline">Medium <a href="#" className="close">x</a></span>
                            </div>
                            <div className="column">
                                <h4>Brands</h4>
                                <div className="check-box">
                                    <input name="Apple" id="apple" type="checkbox" />
                                    <label htmlFor="apple">Apple</label>
                                </div>
                                <div className="check-box">
                                    <input name="Samsung" id="samsung" type="checkbox" />
                                    <label htmlFor="samsung">Samsung</label>
                                </div>
                                <div className="check-box">
                                    <input name="LG" id="lg" type="checkbox" />
                                    <label htmlFor="lg">LG</label>
                                </div>
                                <div className="check-box">
                                    <input name="Asus" id="asus" type="checkbox" />
                                    <label htmlFor="asus">Asus</label>
                                </div>
                                <div className="check-box">
                                    <input name="Lenovo" id="lenovo" type="checkbox" />
                                    <label htmlFor="lenovo">Lenovo</label>
                                </div>
                            </div>
                            <div className="column">
                                <h4>Condition</h4>
                                <div className="check-box">
                                    <input name="New" id="new" type="checkbox" />
                                    <label htmlFor="new">New</label>
                                </div>
                                <div className="check-box">
                                    <input name="Good" id="good" type="checkbox" />
                                    <label htmlFor="good">Good</label>
                                </div>
                                <div className="check-box">
                                    <input name="excellent" id="excellent" type="checkbox" />
                                    <label htmlFor="excellent">Excellent</label>
                                </div>
                                <div className="check-box">
                                    <input name="broken" id="broken" type="checkbox" />
                                    <label htmlFor="broken">Broken</label>
                                </div>
                            </div>
                            <div className="column">
                                <h4>Colors</h4>
                                <img src={colorImg} />
                            </div>
                            <div className="column no-bord">
                                <h4>Age</h4>
                                <form>
                                    <div className="multiselect">
                                        <div className="selectBox" click="showCheckboxes()">
                                            <select>
                                                <option>Select</option>
                                            </select>
                                            <div className="overSelect"></div>
                                        </div>
                                        <div id="checkboxes" style={Hide}>
                                            <div className="check-box">
                                                <input name="Month" id="month" type="checkbox" />
                                                <label htmlFor="month">month - 6 month</label>
                                            </div>
                                            <div className="check-box">
                                                <input name="year" id="year" type="checkbox" />
                                                <label htmlFor="year">6 month - 1 year</label>
                                            </div>
                                            <div className="check-box">
                                                <input name="year" id="2year" type="checkbox" />
                                                <label htmlFor="2year">1 year - 2 year</label>
                                            </div>
                                            <div className="check-box">
                                                <input name="year" id="5year" type="checkbox" />
                                                <label htmlFor="5year">2 year - 5 year</label>
                                            </div>
                                            <div className="check-box">
                                                <input name="year" id="10year" type="checkbox" />
                                                <label htmlFor="10year">5 year - 10 year</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="rgt-section">
                            <div className="search-row">
                                <input
                                    placeholder="Search for..."
                                    ref={input => this.search = input}
                                    onChange={this.handleInputChange}
                                    />
                                <div className="search-result">
                                    <strong>"god of war 3 ps4" </strong> (19 Results)
                                </div>
                                <div className="sort-by">
                                    <span>Sort by:</span> 
                                    <div className="newly-add">
                                        <a className="sortby-new-add">Newly Added</a>
                                        <div className="sortby-expand" style={Hide}>
                                            <strong>Newly Added</strong>
                                            <a href="javascript:void(0)">A - Z</a>
                                            <a href="javascript:void(0)">Z - A</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="cl"></div>
                            </div>
                            <div className="item-listing"  results={this.state.results}>
                                {this.state.slides.map(function (item) {
                                                return (
                                                <div className="Items" key={item.id}>
                                                    <div>
                                                        <div className='pic'><img src={item.image} /></div>
                                                        <div className='details'>
                                                            <h4>{item.title}</h4>
                                                            <Link className="catLink" to='/'>{item.category}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                        )
                                })
                                }
                            </div>
                            <div className="cl"></div>
                            <Link to='/' className='more-items'>More items</Link>
                
                        </div>
                
                        <div className="cl"></div>
                    </div>
                </div>
                            );
            }
        }

        export default Register;
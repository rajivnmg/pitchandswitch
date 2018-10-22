import React, { Component } from 'react';
import Style from './myTreasureChest.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Select from 'react-select';
import axios from 'axios'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart);

const constant = require('../../config/constant')
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
    {label: "Nearest", value: 4}
];
const App2 = () => (
            <div className="app">
                <div className="container">
                    <Select value="Newly Added" options={newlyAdded} />
                </div>
            </div>
            );

class tradeMatch extends Component {
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    constructor(props)
    {
        super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            tradeMatches : [],
            categories : [{label: "Select", value: 1}],
            currentCategory:'',
            currentshortBy:1,
            filterOpt : {category: "", sortBy: 1},
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
	
	finterByCategory(categoryId){						
		this.setState({filterOpt:{category:categoryId,sortBy:this.state.currentshortBy},sortBy:this.state.currentshortBy})
		  axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
				this.setState({
					tradeMatches : result.data.result
				});
		  });
	}
	
	sortBy(id){						
		this.setState({filterOpt:{category:this.state.currentCategory,sortBy:id},currentshortBy:id})		
		axios.post('/product/filterBy',this.state.filterOpt).then(result =>{				
			this.setState({
				tradeMatches : result.data.result
			});
		});
			
	}
	
	componentWillMount(){
		// API to get All the product list
		axios.get('/product/listProduct').then(result => {		 
		   console.log("componentWillMount TradeMatch listProduct ",result.data.result)
		   this.setState({tradeMatches:result.data.result})
		})
		// API to get All the category list		
		axios.get('/category/listCategory').then(result =>{			
			this.setState({
				categories : result.data.result
			});
		});
	}
		
	componentDidMount(){						
			console.log("componentDidMount from trade match")
	}
	
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li> <li>Trade Match</li>
                            </ul>
                        </div>
                        <div className="heading-row">                        
                            <h1>Trade Match</h1>
                            <div className="cl"></div>
                        </div>
                        <div className="search-row">
                            <div className="category-left">
                                <span>Category:</span>                                 
                                <div className="categoryFilter">
                                    <div ><Select options={this.state.categories} defaultValue={this.state.categories[0]} onChange={opt => this.finterByCategory(opt.value)} /></div>
                                </div>
                            </div>
                            <div className="sort-by right">
                                <span>Sort by:</span> 
                                <div className="newly-add">
                                    <div className="search"><Select options={newlyAdded} defaultValue={newlyAdded[0]}   onChange={opt => this.sortBy(opt.value)/*console.log(opt.label, opt.value)*/} /></div>
                                </div>
                            </div>
                            <div className="cl"></div>
                        </div>
                        <div className="item-listing">
                            {this.state.tradeMatches.slice(0, this.state.limit).map((tradeMatch, index) => {
									var userImage = tradeMatch.user?tradeMatch.user[0].profilePic:null
                                    return(<div className="Items" key={index}>
                                        <div className="pic"><div className="overlay"><a href="#" className="favourite"><FontAwesomeIcon icon="heart" title="Add to wishlist"/> fav</a></div><img src={constant.BASE_IMAGE_URL+'Products/'+tradeMatch.productImages} alt="" /></div>
                                        <div className="details">
                                            <h4><a href="/my-trade-detail">{tradeMatch.productName}</a></h4>
                                            <a href="#" className="catLink"> {(tradeMatch.category && (tradeMatch.category.length > 0))?tradeMatch.category[0].title:''}</a>           
                                        </div>
                                        <div className="userdiv">
                                            <div className="user-pic"> <FontAwesomeIcon icon="heart-o" /> <img className="userProfile" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage}  /></div>
                                            <div className="user-name">{(tradeMatch.user)?tradeMatch.user[0].userName:''}</div>
                                        </div>
                                    </div>
                                            )
                            })}
                            <div className="cl"></div>
                        </div>
                        {this.state.tradeMatches.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' } 
                        <div>&nbsp;</div>
                
                    </div>
                </div>
                    );
    }
}
export default tradeMatch;

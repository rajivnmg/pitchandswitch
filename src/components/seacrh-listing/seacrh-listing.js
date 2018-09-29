import React, { Component } from 'react';
import Style from './search-listing.css';
import colorImg from '../../images/color.png';
import { Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import star from '../../images/star.png';
import Select from 'react-select';
import axios from 'axios';
import SearchDetail from '../../components/seacrh-listing/searchDetail.js';


import {
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback
} from 'reactstrap';


const constant = require('../../config/constant')


const Hide = {
    display: "none"
}

var FD = require('form-data');
var fs = require('fs');
let searchUser;
let catArr;
const App = () => (
<div className="app">
	<div className="container">
	<Select options={searchUser} />
	</div>
</div>
);

const filterSearch = [
    {label: "Newly Added", value: 1},
    {label: "A - Z", value: 2},
    {label: "Z - A", value: 3}
];

const App1 = () => (
<div className="app">
<div className="container">
<Select value="Newly Added" options={filterSearch} />
</div>
</div>
);
    
class Register extends React.Component {
    constructor(props)
    {
        super(props);        
        let categoryId = props.match.params.id; 
        this.state = {
            resultData: [{
				"id": "",
				"title": "",
				"image": "",
				"category": "",
				"userPic": "",
				"userName": "",
                }
            ],
             items: [],
             limit: 5,
			 loadMore: true,
			 categories : [{label: "Select", value: 1}],
			 currentCategory:'',
			 currentshortBy:1,
			 filterOpt : {category: "", sortBy: 1},
			 error: false,
             categoryList: [{
                    "id": "",
                    "title": "",
                }
            ],
            usersList: [{
				"id": "",
				"title": "",
               }
            ],
            citiesList:[{"id": "","title": "" }],
            sizeList:[{"id": "","title": "" }],
            brandsList:[{"id": "","title": "" }],
            constantList:[{"id": "","title": "" }],
            result: [],
            query: '',
            categoryId: categoryId,
            optionsChecked: [],
            ids :[],
            showFormSuccess : false
        };
        
         this.changeContanst = this.changeContanst.bind(this);
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
    
    
	changeEvent(event) {
      let checkedArray = this.state.optionsChecked;
      let selectedValue = event.target.value;
        if (event.target.checked === true) {
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        else {
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        const data = new FD();        
        data.append('ids',this.state.optionsChecked)
        data.append('type','productCategory')
        axios.post('/product/filterBycategory',data).then(result =>{				
			this.setState({
				resultData : result.data.result
			});
		});
    }
    
	changeBrand(brand) {
      let checkedArray = this.state.optionsChecked;
      let selectedValue = brand.target.value;
        if (brand.target.checked === true) {
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        else {
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        const data = new FD();        
        data.append('ids',this.state.optionsChecked)
        data.append('type','brand')
        console.log('aaaa',this.state.optionsChecked);
        axios.post('/product/filterBycategory',data).then(result =>{				
			this.setState({
				resultData : result.data.result
			});
		});
    }
    
	changeContanst(constantV) {
      let checkedArray = this.state.optionsChecked;
      let selectedValue = constantV.target.value;
        if (constantV.target.checked === true) {
        	checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        else {
          let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            this.setState({
              optionsChecked: checkedArray
            });
        }
        const dataConstant = new FD();        
        dataConstant.append('ids',this.state.optionsChecked)
        dataConstant.append('type','condition')        
        axios.post('/product/filterBycategory',dataConstant).then(result =>{				
			this.setState({
				resultData : result.data.result
			});
		});
    }
    
	
    
    changeUser(userList){	    
		let userValue = userList.value;
	    const userdata = new FD();        
        userdata.append('ids',userList.value)
        userdata.append('type','userId')
        console.log('aaaa',userdata);
	    axios.post('/product/filterBycategory',userdata).then(result =>{				
		    this.setState({
				resultData : result.data.result
			});
		 });
	}
	
    changeCity(cityList){	    			
	    const citydata = new FD();        
        citydata.append('ids',cityList.target.value)
        citydata.append('type','city')
        console.log('citydata',citydata)
	    axios.post('/user/searchCity',citydata).then(result =>{				
		    this.setState({
				resultData : result.data.result
			});
		 });
	}
	
    changeSize(sizeList){	    				
	    const sizedata = new FD();        
        sizedata.append('ids',sizeList.target.value)
        sizedata.append('type','size')        
	    axios.post('/product/filterBycategory',sizedata).then(result =>{							
		    this.setState({
				resultData : result.data.result
			});
		});
	}    
    
     onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
     }
    
    getInfo = () => {
        console.log(this.state.slides)
        let ArraySlides = this.state.slides
        let ArrayNew;
        for(var i = 0; i < this.state.slides.length; i++) {
            ArrayNew = ArraySlides[i].title
        }
        this.setState({
            results: this.state.slides
        })
    }
    
    
     componentDidMount(){
	     axios.get('/product/searchresult/'+ this.state.categoryId).then(result => {
			 this.setState({resultData:result.data.result});				 
			 console.log('resultData',this.state.resultData);
		})
	     axios.get('/category/categoriesActive/').then(rs => {
			 this.setState({categoryList:rs.data.result});
		})
	     axios.get('/user/activeUser/').then(users => {
			 this.setState({usersList:users.data.result});			
		})
	     axios.get('/location/activeCities/').then(cities => {
			 this.setState({citiesList:cities.data.result});						
		})
	     axios.get('/size/listingsize/').then(sizes => {
			 this.setState({sizeList:sizes.data.result});			
		})
	     axios.get('/brand/listingbrand/').then(brands => {
			 this.setState({brandsList:brands.data.result});			
		})
	     axios.get('/donation/getConstant/').then(constants => {
			 this.setState({constantList:constants.data.result});			
		})
     }
    
  
    render() {
	  if(this.state.usersList){
        let usersListing = this.state.usersList;
         searchUser = usersListing.map(option => ({ label: option.firstName, value: option._id }));   
      }
		
    return (
	<div className="search-page">
		<div className="container">
		  <Form noValidate>
			<div className="lft-section">
				<div className="column">
				   <h4>All categories</h4> 
						{this.state.categoryList.slice(0, this.state.visible).map((listing, index) => {						
						return (
						 <div className="check-box">
							<input name="Apple" value={listing._id} id={"cat"+index} type="checkbox" onChange={this.changeEvent.bind(this)}/>
							<label htmlFor={"cat"+index}>{listing.title}</label>
						  </div>
						  )
					    })
                      }
                     { 
					   this.state.visible < this.state.categoryList.length &&
						<button onClick={this.loadMore} type="button" className="load-more moreCat">Load more</button>
					 }
				</div>
				<div className="column">
					<h4>Search by user</h4>
					<div className="search"><Select options={searchUser} onChange={this.changeUser.bind(this)} /></div>
					<div className="taglinerow">
					 { this.state.usersList.map(function (userlisting,index) {					
						return (	
						  <span href="javascript:void(0)" className="tagline">{userlisting.firstName}
						  <a href="#" className="close">#</a></span>
						  )
					    })
                      }
	                   <div className="cl"></div>
					</div>
					<div className="cl"></div>	
				</div>
				<div className="column">
					<h4>Location</h4>
					<div className="select-box">
						<select onChange={this.changeCity.bind(this)}>
						{ this.state.citiesList.map(function (citylisting,index) {
							return (	
							    <option value={citylisting._id}>{citylisting.cityName}</option>
							)
					    })
                       }
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
						<select onChange={this.changeSize.bind(this)}>
							<option>Select</option>
							{ this.state.sizeList.map(function (sizelisting,index) {
							return (	
							    <option value={sizelisting._id}>{sizelisting.size}</option>
							 )
					      })
                        }
						</select>
					</div>
					<div className="taglinerow">
						<span href="javascript:void(0)" className="tagline">Medium 
						<a href="#" className="close">x</a></span>
					</div>
				</div>
				<div className="column">
					<h4>Brands</h4>
					{this.state.brandsList.slice(0, this.state.visible).map((bListing, index) => {						
					return (
						<div className="check-box">
							<input name="Apple" value={bListing._id} type="checkbox" onChange={this.changeBrand.bind(this)} id={"apple"+index} type="checkbox" />
							<label htmlFor={"apple"+index}>{bListing.brandName}</label>
						</div>
						 )
					    })
                      }
                     { 
						this.state.visible < this.state.brandsList.length &&
						<button onClick={this.loadMore} type="button" className="load-more moreCat">Load more</button>
					 }
				</div>
				<div className="column">
					<h4>Condition</h4>
					 { this.state.constantList.slice(0, this.state.visible).map((constantList, index) => {	
						return (
							<div className="check-box">
								<input name="New" value={constantList.id} onChange={this.changeContanst.bind(this)} id={"new"+index} type="checkbox" />
								<label htmlFor={"new"+index}>{constantList.name}</label>
							</div>
					         )
					      })
                      }
                     { 
						this.state.visible < this.state.constantList.length &&
						<button onClick={this.loadMore} type="button" className="load-more moreCat">Load more</button>
					 }
				</div>
				<div className="column">
					<h4>Colors</h4>
					<img src={colorImg} />
				</div>
				<div className="column no-bord">
					<h4>Age</h4>
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
					
					<div className="taglinerow">
						<span href="javascript:void(0)" className="tagline">1 month - 6 month <a href="#" className="close">x</a></span>
						<span href="javascript:void(0)" className="tagline">6 month - 1 year <a href="#" className="close">x</a></span>
						<div className="cl"></div>
					</div>
				</div>
				<div className="column">
					<h4>Rating</h4>
					<div className="check-box">
						<input name="New" id="star5" type="checkbox" />
						<label htmlFor="star5"><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span></label>
					</div>
					<div className="check-box">
						<input name="Good" id="star4" type="checkbox" />
						<label htmlFor="star4"><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span> </label>
					</div>
					<div className="check-box">
						<input name="excellent" id="star3" type="checkbox" />
						<label htmlFor="star3"><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span></label>
					</div>
					<div className="check-box">
						<input name="broken" id="star2" type="checkbox" />
						<label htmlFor="star2"><span className="stardiv"><img src={star} alt={star} /></span><span className="stardiv"><img src={star} alt={star} /></span></label>
					</div>
					<div className="check-box">
						<input name="broken" id="star1" type="checkbox" />
						<label htmlFor="star1"><span className="stardiv"><img src={star} alt={star} /></span>  </label>
					</div>
					<a href="#" className="clearfilter">Clear filter</a>
				</div>
			</div>
			 </Form>
			<div className="rgt-section">
				<div className="search-row">
					<div className="search-result">
						<strong>"god of war 3 ps4" </strong> (19 Results)
					</div>
					<div className="sort-by">
						<span>Sort by:</span> 
						<div className="newly-add">
							<div className="search"><Select options={filterSearch} defaultValue={filterSearch[0]}   onChange={opt => console.log(opt.label, opt.value)} /></div>
						</div>
					</div>
					<div className="cl"></div>
				</div>
				
				<div className="item-listing"  results={this.state.results}>
				   { this.state.resultData.map(function (results,index) {
					let img = results.userId?results.userId.profilePic:"";						
					return (
					<div className="Items" key={index}><div>
					<Link className="catLink" to={'/search-result/'+results._id}>
					    <div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+results.productImages} /></div>
					</Link>
					<div className='pic'><img src={constant.BASE_IMAGE_URL+'Products/'+results.productImages} /></div>
					<div className='details'>
					<h4><Link className="catLink" to={'/search-result/'+results._id}>{results.productName}</Link></h4>
					<Link className="catLink" to={'/search-result/'+results._id}>{((results.productCategory)?results.productCategory.title:"")}</Link>
					</div>
					<div className="userdiv">
					<div className="user-pic">
					   <img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} />
					</div>
					   <div className="user-pic"><img src={constant.BASE_IMAGE_URL+'ProfilePic/'+img} /></div>
					   <div className="user-name">{results.userId?results.userId.firstName:""}</div>
					</div>
					</div>
					</div>
					)
				})
				}
				</div>
				<div className="cl"></div>	
			</div>	
			<div className="cl"></div>
		</div>
	</div>
     );
   }
}

export default Register;

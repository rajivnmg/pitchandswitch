import React, { Component } from 'react';
import Style from './search-listing.css';
import colorImg from '../../images/color.png';
import { Link } from 'react-router-dom';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import star from '../../images/star.png';
import Select from 'react-select';
import axios from 'axios';

const Hide = {
    display: "none"
}

const searchUser = [
    {label: "Christina Morillo", value: 1},
    {label: "Sharon McCutcheon", value: 2},
    {label: "Christina Morillo", value: 3},
    {label: "Sharon McCutcheon 2", value: 4},
    {label: "Smallest crocodiles", value: 5}
];
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
            result: [],
            query: '',
            categoryId: categoryId,
        };       
    }
 
    componentDidMount(){
	      axios.get('/product/searchresult/'+ this.state.categoryId).then(result => {
			 this.setState({resultData:result.data.result});
		})
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
        for(var i = 0; i < this.state.slides.length; i++) {
            ArrayNew = ArraySlides[i].title
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
					<div className="check-box">
						<input name="Apple" id="cat1" type="checkbox" />
						<label htmlFor="cat1">Toys & Games</label>
					</div>
					<div className="check-box">
						<input name="Samsung" id="cat2" type="checkbox" />
						<label htmlFor="cat2">Art & Collectibles</label>
					</div>
					<div className="check-box">
						<input name="LG" id="cat3" type="checkbox" />
						<label htmlFor="cat3">Electronics & Accessories</label>
					</div>
					<div className="check-box">
						<input name="Asus" id="cat4" type="checkbox" />
						<label htmlFor="cat4">Clothing</label>
					</div>
					<div className="check-box">
						<input name="Lenovo" id="cat5" type="checkbox" />
						<label htmlFor="cat5">Craft Supplies & Tools</label>
					</div>
					<a href="#" className="moreCat">+240 More</a>
				</div>
				<div className="column">
					<h4>Search by user</h4>
					<div className="search"><Select  options={searchUser} onChange={opt => console.log(opt.label, opt.value)} /></div>
					<div className="taglinerow">
						<span href="javascript:void(0)" className="tagline">Christina Morillo <a href="#" className="close">x</a></span>
						<span href="javascript:void(0)" className="tagline">Sharon McCutcheon <a href="#" className="close">x</a></span>
	
						<div className="cl"></div>
					</div>
					<div className="cl"></div>	
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
					<div className="taglinerow">
						<span href="javascript:void(0)" className="tagline">Medium <a href="#" className="close">x</a></span>
					</div>
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
					<a href="#" className="moreCat">+240 More</a>
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
					
					  {console.log('dddddd',this.state.resultData)}
					{ this.state.resultData.map(function (results,index) {
						return (
							<div className="slides-div" key={index}>
								<div key={results}>
								<div className='pic'><Link to="/my-trade-detail" ><img src={'http://localhost:3006/assets/uploads/Products/'+results.productImages} /></Link></div>
									<div className='details'>
									<h4><a href="/my-trade-detail">{results.productName}</a></h4>
										<Link className="catLink" to='/'>{((results.productCategory)?results.productCategory.title:"")}</Link>
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

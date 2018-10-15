import React, { Component } from 'react';
import Style from './donation.css';
import popularItemImg from '../../images/popular-item1.jpg';
import userPicture from '../../images/user-pic.png';
import Select from 'react-select';
import axios from 'axios'
import { Spin, Icon, Alert } from 'antd';
import { If, Then, ElseIf, Else} from 'react-if-elseif-else-render';
import { Link } from 'react-router-dom';


var moment = require('moment');
const constant = require('../../config/constant')
const antIcon = <Icon type="loading" style={{ fontSize: 34 }} spin />;


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

class donatedProducts extends Component {
   constructor(props)
    {

        super(props);
        this.state = {
            limit: 10,
            loadMore: true,
            donatedProducts: [
            //~ {
                    //~ "title": "",
                    //~ "image": popularItemImg,
                    //~ "category": "",
                    //~ "userPic": userPicture,
                    //~ "userName": ""
                //~ }
            ],

        }
        ;
    } 
    
	// function to show more product by clicking on load more button		
	onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    
    // react componet call before render the page
    componentWillMount(){
		console.log("componentWillMount from donated productas")
		axios.get('/donation/donatedProducts').then(result => {			
			//console.log('donatedProducts',result)
			this.setState({donatedProducts:result.data.result},function(){
				console.log('donatedProducts',this.state.donatedProducts)})
		})
	}
    
    // react components called just after rendering the page
    componentDidMount(){
		console.log("componentDidMount from donated productas")
	}
	
    render() {
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href="/">Home</a></li><li>Donated Products</li>
                            </ul>
                        </div>
                        <div className="heading-row">.
                            <Link to={(localStorage.getItem('isLoggedIn') == "1")?'/donate-product':'/login'} className="more-items"> Donate a product</Link>
                            <h1>Donated Products</h1>
                            <p className="subheading">Recently donated products by pitch and swicth members</p>
                            <div className="cl"></div>
                        </div>
                        <div className="search-row">
                            
                            <div className="cl"></div>
                        </div>
                        <div className="item-listing donateProducts">
                        
							<If condition={this.state.donatedProducts.length === 0}>
								<Then>
									 <Spin tip="Loading...">
										<Alert
										  message="Data Loading "
										  description="Please wait..."
										  type="info"
										/>
									  </Spin>
								</Then>							
							</If>
                            {this.state.donatedProducts.slice(0, this.state.limit).map((donatedProduct, index) => {
								var productImage = donatedProduct._id?donatedProduct.productImage:''
								var userImage = (donatedProduct._id && donatedProduct.userId)?donatedProduct.userId.profilePic:''
                                    return(<div className="Items" key={index}>
                                    <div className="pic"><div className="overlay"> <p>{(donatedProduct.userId)?donatedProduct.userId.address:''}<br/> {(donatedProduct.userId && donatedProduct.userId.city)?donatedProduct.userId.city.cityName:''} <br/> {moment(donatedProduct.createdAt).format('LL')} </p> </div><img src={constant.BASE_IMAGE_URL+'donationImage/'+productImage} alt="" /></div>
                                        <div className="details">
                                            <h4><a href="/my-trade-detail">{donatedProduct.productName}</a></h4>
                                            <a href="#" className="catLink"> {(donatedProduct.productCategory)?donatedProduct.productCategory.title:''}</a>           
                                        </div>
                                        {/*<div className="userdiv">
                                            <div className="user-pic"><img className="userPicNew" src={constant.BASE_IMAGE_URL+'ProfilePic/'+userImage} /></div>
                                            <div className="user-name">{(donatedProduct.userId)?donatedProduct.userId.userName:''}</div>
                                        </div>*/}
                                    </div>
                                            )
                            })}
                            <div className="cl"></div>
                        </div>
                       
					
                        
                        {this.state.donatedProducts.length > this.state.limit ? <div>{this.state.loadMore ? <a className="more-items" href="javascript:void()" onClick={this.onLoadMore}>Load more</a> : ''}</div> : '' } 
                        <div>&nbsp;</div>
                
                    </div>
                </div>
                    );
    }
}
export default donatedProducts;

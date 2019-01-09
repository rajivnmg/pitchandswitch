import React, { Component } from 'react';
import Style from './wishlist.css';
//import popularItemImg from '../../images/popular-item1.jpg';
import emptyArt from '../../images/empty_art.png';
//import Select from 'react-select';
//import DitchPopup from './clearWishListPopup'
import { If, Then} from 'react-if-elseif-else-render';
import axios from 'axios'
import { Redirect } from 'react-router'
class myTreasureChest extends Component {
	constructor(props){
		super(props)
		this.state = {
			   wishlists : []
			}
	}
	
	componentWillMount(){		
		axios.get('/product/wishList').then(wishlists =>{
				if(wishlists.data.code === 200){
					this.setState({wishlists:wishlists.data.result,total:wishlists.data.result.length})
				}
			});
	}
	
    render() {
        return (				
                <div className="myTreasure">
				<If condition={this.state.total > 0}>
					<Then>
						<Redirect push to="/wishlist" />
					</Then>							
				</If>	
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
                          <img src={emptyArt} alt={" Empty wishlist"}/>
                          <p>You haven’t liked any items yet. Browse our catalog and click the heart icon to add items to your wishlist.</p>
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

import React, { Component }
from 'react';
import Warper from "../common/Warper";
import Popup from "reactjs-popup";
import axios from 'axios'
import jquery from 'jquery'
import { Route, Redirect } from 'react-router'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import createHistory from "history/createBrowserHistory" 
const contentStyle = {
	maxWidth: "560px",
    width: "90%"
};
const history = createHistory();
class ClearWishListPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {				
			redirect:false
		}
	}		
	clearWishList(){		
		axios.delete('product/clearWishlist').then(result => {
			if(result.data.code === 200){					
				jquery('#cancel-btn').click();				
				window.location.href="/empty-wishlist";
				
			}
		})
		
	}
	
render() {	
	
	<If condition={this.state.redirectTo === true}>
		<Then>
			 return <Redirect push to="/empty-wishlist"/>
		</Then>							
	</If>
   return (
   <Popup trigger={ <a href="#" className = 'more-items pink' > Clear Wishlist </a>} modal contentStyle = {contentStyle} lockScroll>
		{	         close => (
						<div className="modal">
							<a className="close" onClick={close}>
								&times;
							</a>
							<div className="header center-align marginTop">Are you sure you want to clear your wish list?
								<div className="cl"></div>
							</div>
							<div className="content">
								<div className="return-request-form">
								   
								 
									<div className="form-row btn-row">
									 <button className="cancel-btn" onClick={close}>Cancel</button>
										<button className="ditch ditch" onClick={()=>this.clearWishList()}>Remove</button>
									   
									</div>
								</div> 
							</div>
						</div>
						)
		}
	</Popup>
	)}
}
export default ClearWishListPopup;

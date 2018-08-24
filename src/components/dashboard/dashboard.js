import React, { Component } from 'react';
import Style from './dashboard.css';
import PopularItems from './popularItems'
import NewlyProducts from './newlyProducts'
import axios from 'axios';

class Dashboard extends Component {
	constructor(props){
    super(props);
    this.state = {
			currentUser:{
				 email:'',
				 firstName:'',
				 lastName:'',
				 middleName:'',
				 profilePic:'',
				 userName:''
				}			
	}
    
  // console.log('TOken', localStorage.getItem('jwtToken'));
    if(localStorage.getItem('jwtToken') === null){
       window.location.href="#/login";
    }
  }
  
  componentDidMount() {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/user/getLoggedInUser').then(result => {
			//console.log("result",result)
			this.setState({ 
				currentUser:result.data.result,
				notification_type:result.data.notification_type,
				notifications :result.data.notifications,
				totalNotifications:result.data.totalNotifications
			})			
		})		
  }
  	
Capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
} 
	
	
    render() {
        return (
                <div className="dashboard">
                <div className="container">
                <div className="msgSuccess">
                <a href="#" className="close">x</a>
                You're almost there, upload your first item to get trading
                </div>
                <div className="heading-row">.
                <a href="#" className="more-items">Donate Now</a>
                <h1>Welcome, {this.Capitalize(this.state.currentUser.firstName)}{' '}{this.Capitalize(this.state.currentUser.lastName)}.</h1>
                <p className="subheading">There is a list of some latest and tranding itmes on pitch and switch </p>
                <div className="cl"></div>
                </div>
                </div>
                    <PopularItems />
                    <NewlyProducts />
                </div>
                );
    }
}
export default Dashboard;

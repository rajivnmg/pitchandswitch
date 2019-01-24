import React, { Component } from 'react';
import { connect } from "react-redux";
import * as ActionTypes from "../../store/actionTypes";
import Style from './login.css';
import loginIcon from '../../images/login-page-icon.png';
import { Link,Redirect } from 'react-router-dom';

import axios from 'axios';
/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/

class Logout extends React.Component {
    constructor(props){
    super(props);
     localStorage.removeItem('jwtToken');   
     localStorage.removeItem('loggedInUser');   
     localStorage.setItem('isLoggedIn',0);
     localStorage.removeItem('userId');
	 localStorage.removeItem('userEmail');
	 localStorage.removeItem('userName');  
	 this.props.setAuthentication({
	  isAuthenticated: false,
	  username: ''
	 });
  }
 
  render() {	   
    return (
       <div className="login-container">      
        <Redirect to='/login'/>
      </div>
    );
  }
} 
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
	  setAuthentication: logout => {
		return dispatch({
			type: ActionTypes.SET_AUTHENTICATION,
			payload: logout
		  })
	  }
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);


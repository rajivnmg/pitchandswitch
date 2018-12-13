import React, { Component } from 'react';
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
  }
 
  render() {	   
    return (
       <div className="login-container">      
        <Redirect to='/login'/>
      </div>
    );
  }
}
 
export default Logout;

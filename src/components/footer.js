import React, {Component} from 'react';
import iconFB from '../images/icon-facebook.png';
import iconLI from '../images/icon-linkedin.png';
import iconTW from '../images/icon-twitter.png';
import { Link } from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class Footer extends Component {
	constructor(props){
		super(props)		
	}	
    render() {
		let  isLoggedIn = (localStorage.getItem('jwtToken') === null)?false:true;
        return(
                <footer>
                    <div className="container">
                        <div className="left-div">
                            <ul>
                                <li><Link to={ (localStorage.getItem('isLoggedIn') == 1)?'/dashboard':'/'  }>Home</Link></li><li><Link to={'/about-us'}>About</Link></li>
                                <If condition={localStorage.getItem('jwtToken') === null}>
									<Then>
									<li><Link to={'/login'} className="login-link">Login</Link></li>
									<li><Link to={'/register'} className="register-link">Register</Link></li>
								  </Then>
								</If>
                                <li><Link to={'/contact-us'}>Contact us</Link></li>
                                <li><Link to={'/privacy-policy'}>Privacy Policy</Link></li>
                                <li><Link to={'/term-and-condition'}>Terms &amp; Condition</Link></li>
                            </ul>
                            <p>&copy; 2018 Pitch and Switch, Inc.</p>
                        </div>
                        <div className="right-div">
                            <a href="https://www.facebook.com" target="_blank"><img src={iconFB} alt={iconFB} /></a>
                            <a href="https://twitter.com/login" target="_blank"><img src={iconTW} alt={iconTW} /></a>
                            <a href="https://www.linkedin.com/start/join" target="_blank"><img src={iconLI} alt={iconLI} /></a>
                        </div>
                        <div className="cl"></div>
                    </div>
                </footer>
                )
    }
}

export default Footer;

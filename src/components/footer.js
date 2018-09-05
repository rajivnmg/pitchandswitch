import React, {Component} from 'react';
import iconFB from '../images/icon-facebook.png';
import iconLI from '../images/icon-linkedin.png';
import iconTW from '../images/icon-twitter.png';
import { Link } from 'react-router-dom';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class Footer extends Component {
    render() {
		let  isLoggedIn = (localStorage.getItem('jwtToken') === null)?false:true;
        return(
                <footer>
                    <div className="container">
                        <div className="left-div">
                            <ul>
                                <li><a href="#">Home</a></li><li><a href="#">About</a></li>
                                <If condition={localStorage.getItem('jwtToken') === null}>
									<Then>
									<li><Link to={'/login'} className="login-link">Login</Link></li>
									<li><Link to={'/register'} className="register-link">Register</Link></li>
								  </Then>
								</If>
                                <li><a href="#">Contact us</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms &amp; Condition</a></li>
                            </ul>
                            <p>&copy; 2018 Pitch and Switch, Inc.</p>
                        </div>
                        <div className="right-div">
                            <Link to="/"><img src={iconFB} alt={iconFB} /></Link>
                            <Link to="/"><img src={iconTW} alt={iconTW} /></Link>
                            <Link to="/"><img src={iconLI} alt={iconLI} /></Link>
                        </div>
                        <div className="cl"></div>
                    </div>
                </footer>
                )
    }
}

export default Footer;

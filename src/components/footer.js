import React, {Component} from 'react';
import iconFB from '../images/icon-facebook.png';
import iconLI from '../images/icon-linkedin.png';
import iconTW from '../images/icon-twitter.png';
import { Link } from 'react-router-dom';
import { If, Then} from 'react-if-elseif-else-render';
import axios from 'axios';
class Footer extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isFacebook : true,
			isTwitter : true,
			isLinkedIn : true
		}		
  }
    
  componentDidMount(){
	 //write  in this which you want just ofter rendering the page
	axios.get('/setting/getSocialMediaSetting').then(result => {
      if(result.data.code === 200){
		 // console.log("result",result.data.result[0]);
		  if(result.data.result && result.data.result.length>0){
			this.setState({
				isFacebook : result.data.result[0].isFacebook,
				isTwitter : result.data.result[0].isTwitter,
				isLinkedIn : result.data.result[0].isLinkedIn
			});
		}
      }
    })
    .catch((error) => {
    console.log('error', error)
      if(error.code === 401) {
        this.props.history.push("/login");
      }
    });
  }
    render() {
		//let  isLoggedIn = (localStorage.getItem('jwtToken') === null)?false:true;
        return(
                <footer>
                    <div className="container">
                        <div className="left-div">
                            <ul>
                                <li><Link to={ (localStorage.getItem('isLoggedIn') === 1)?'/dashboard':'/'  }>Home</Link></li><li><Link to={'/about-us'}>About</Link></li>
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
						{this.state.isFacebook &&	
							<a href="https://www.facebook.com" rel='noopener noreferrer' target="_blank"><img src={iconFB} alt={iconFB} /></a>
						}
						{this.state.isTwitter &&	
							<a href="https://twitter.com/login" rel='noopener noreferrer' target="_blank"><img src={iconTW} alt={iconTW} /></a>
						}
						{this.state.isLinkedIn &&	
							<a href="https://www.linkedin.com/start/join" rel='noopener noreferrer' target="_blank"><img src={iconLI} alt={iconLI} /></a>
						}
                        </div>
                        <div className="cl"></div>
                    </div>
                </footer>
                )
    }
}

export default Footer;

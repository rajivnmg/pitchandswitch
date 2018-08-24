import React, { Component } from 'react';
import Style from './home.css';
import SponsorImg1 from '../../images/sponsors.jpg'
import SponsorImg2 from '../../images/sponsors1.jpg'
import SponsorImg3 from '../../images/sponsors2.jpg'
import SponsorImg4 from '../../images/sponsors3.jpg'
import SponsorImg5 from '../../images/sponsors4.jpg'
import SponsorImg6 from '../../images/sponsors5.jpg'
import axios from 'axios';


class HomeSponsors extends Component {
	
	constructor(){		
		super()
		this.state = {
				sponsers : [{
						advertisementName:'',
						description:'',
						image:'',
						redirectURL:''
					}]		
			}
	}	
	componentDidMount(){
		console.log("ComponentDIDMOUNT")
		axios.get('advertisement/list-ads').then(result =>{
			console.log("result",result);			
			this.setState({sponsers:result.data.result})
		})
		
	}	
	
	
    render() {
        return (
                <div className="sponsors">
                    <h3>Sponsor</h3>
                    <ul>
                    {
						this.state.sponsers.map(function(sponser,index){
                         return(<li key={index}><a href={sponser.redirectURL} target="_blank"><img src={'http://localhost:3006/assets/uploads/AdvertisementImage/'+sponser.image} height="50px" width="120px" alt={sponser.advertisementName}/></a></li>)
					  })
				   }
                    </ul>
                </div>
                );
    }
}
export default HomeSponsors;

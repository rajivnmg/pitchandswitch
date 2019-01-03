import React, { Component } from "react";
import "./home.css";
import axios from "axios";
//import { NavLink } from "react-router-dom";
//var FD = require("form-data");
const constant = require("../../config/constant");

class HomeSponsors extends Component {
  constructor() {
    super();
    this.state = {
      sponsers: [
        {
          advertisementName: "",
          description: "",
          image: "",
          redirectURL: ""
        }
      ]
    };
  }
  componentDidMount() {
    axios.get("advertisement/list-ads").then(result => {
      this.setState({ sponsers: result.data.result });
    });
  }

 handleClickPartners = (e, partner) => {
    let data = {};
    e.preventDefault();
    data.ip = localStorage.getItem("ipAddress");
    data.userId = localStorage.getItem("userId");
    data.partnerId = partner._id; 
   
    var newAnchor = document.createElement('a');
    newAnchor.href = this.domainCheck(partner.redirectURL) ;
    newAnchor.target = "_blank";
    newAnchor.id = "sponser"+partner._id;
    document.getElementById(partner._id).appendChild(newAnchor); 
      
   // console.log("partner",data,e, this.props ); return null;	
      axios.post('/advertisement/partnerVisitor', data).then(result => {
          if(result.data.code ===200){
			  document.getElementById("sponser"+partner._id).click();			  			  				
				//~ setTimeout(() => {		
					//~ window.open(this.domainCheck(partner.redirectURL), "_blank", null, false);
				//~ }, 2000);       
          }else{
			console.log("else done")  
		  }
        }); 
  };
  
  domainCheck = domain => {
	  if(domain.substring(0,7) === 'http://' || domain.substring(0,8) === 'https://'){
		  return domain;
	  }else{
		  domain = 'http://' + domain;
	  }
	  return domain;
  }
    
  render() {
    return (
      <div className="sponsors">
        <h3>Sponsor</h3>
        <ul ref={this.ulElement}>
          {this.state.sponsers.map((sponser, index) => {
            return (
              <li key={index} id={sponser._id}>
                  <img
                   src={
                      constant.BASE_IMAGE_URL +
                      "AdvertisementImage/" +
                      sponser.image
                    } 
                    onClick={(e) => this.handleClickPartners(e,sponser) }
                    style={{cursor: 'pointer'}}
                    height="50px"
                    width="120px"
                    alt={sponser.advertisementName}
                  />

              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default HomeSponsors;

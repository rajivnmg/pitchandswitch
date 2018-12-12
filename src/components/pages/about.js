import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import axios from 'axios'
var moment = require('moment');
class AboutUs extends React.Component {
	constructor(props){
		super(props)
		this.state = {
				page:[]
			}
	}		
	componentWillMount(){	
		let privacy = 'privacy'
		axios.get('/page/getPage/about').then(result =>{	
				if(result.data.code === 200){
					this.setState({page:result.data.result[0]})
				}
			})
	}
	
    render() {
        return (
                <div className="add-product-container">
                    <div  className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><Link to={ (localStorage.getItem('isLoggedIn') === 1)?'/dashboard':'/'  }>Home</Link></li>
                                <li>{(this.state.page && this.state.page.pageTitle)?this.state.page.pageTitle:''}</li>
                            </ul>
                        </div>
                        <div className="cl"></div>
                        <div className="cms-page">                
                            <h3>{(this.state.page && this.state.page.pageTitle)?this.state.page.pageTitle:''}</h3>
                            <div dangerouslySetInnerHTML={{ __html: (this.state.page && this.state.page.description)?this.state.page.description:'' }} />  
                            <div className="brdr-top">
                                <p>Last updated on {(this.state.page)?moment(this.state.page.updatedAt).format('LL'):''}</p>
                            </div>
                        </div>
                        <div className="cl"> </div>
                    </div>
                </div>
                );
    }
}

export default AboutUs;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import axios from 'axios'
import * as moment from 'moment';
class Register extends React.Component {
	constructor(props){
		super(props)
		this.state = {
				page:[]
			}
	}
	
	componentWillMount(){
		console.log("componentWillMount")
		let privacy = 'privacy'
		axios.get('/page/getPage/privacy').then(result =>{	
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
                                <li>{(this.state.page && this.state.page.pageTitle)?this.state.page.pageTitle:'NA'}</li>
                            </ul>
                        </div>
                        <div className="cl"></div>
                        <div className="cms-page">                
                            <h3>{(this.state.page && this.state.page.pageTitle)?this.state.page.pageTitle:''}</h3>
                            <div dangerouslySetInnerHTML={{ __html: (this.state.page && this.state.page.description)?this.state.page.description:'' }} />                            
                            <div className="brdr-top">
                                <p>Last updated on {(this.state.page)?this.state.page.updatedAt:''}</p>
                            </div>
                
                
                        </div>
                        <div className="cl"> </div>
                    </div>
                </div>
                );
    }
}

export default Register;

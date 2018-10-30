import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import popularItemImg from '../images/popular-item1.jpg';
import userPicture from '../images/user-pic.png';
import userPicture1 from '../images/userProfileLarge.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Label, Input } from 'reactstrap';
import Select from 'react-select';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import { Button } from 'reactstrap';
library.add(faHeart);
var moment = require('moment');
var FD = require('form-data');
var fs = require('fs');




class DateDiv extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({date}
        )

    render() {
        return (
          <div>
                    <DatePicker
                        onChange={this.onChange}
                        value={this.state.date}
                        />
           </div>
         );
    }
}

class settingProfile extends Component {
    onLoadMore = () => {
        this.setState((old) => ({limit: old.limit + 10}));
    }
    onChange = date => this.setState({date})
    constructor(props)
    {
        super(props);
        this.state = {
            date: new Date(),
            user : {},
			countryId :'',
			stateId :'',
			cityId : '',
			countries:[{_id:'',countryName:''}],
			states:[{_id:'',stateName:''}],
			cities:[{_id:'0',cityName:'Select City'}],
			settingProfileForm: {
			name: '',
			email:'',
			phone: '',
			password:'', 
			C_password:'',
			address:'',
			address1:'',
			country:'',
			state:'',
			city:'',
			zipCode:''			
		  }                    
        };        
	    this.handleChangeCountry = this.handleChangeCountry.bind(this);
	    this.handleChangeState = this.handleChangeState.bind(this);
	    this.handleChangeCity = this.handleChangeCity.bind(this);
    }
    
    handleChangeCountry(event) {	
  
    this.setState({countryId:event.target.value})
    if(event.target.value !== "0"){
     axios.get('/location/getState/'+event.target.value).then(result =>{		
			this.setState({states:result.data.result,cities:[{_id:'',cityName:''}]})		 
		 })
	 }
   
  }
	handleChangeState(event) {
	this.setState({stateId:event.target.value})
    
    if(event.target.value !== "0"){
		axios.get('/location/getCity/'+event.target.value).then(result =>{			
				this.setState({cities:result.data.result,})
				if(result.data.result.length){
					this.setState({state:result.data.result[0]._id})
					this.setState({cityId:result.data.result[0]._id})
				}
	     })
	}
  }
	handleChangeCity(event) {    
    this.setState({cityId:event.target.value})
    this.setState({state: event.target.value});
  }
   
    submitHandler(e){
        const data = new FD()
        data.append('_id', this.state.user.id)
        data.append('firstName', this.firstName.value)
        data.append('middleName', this.middleName.value)
        data.append('lastName', this.lastName.value)
        data.append('userName', this.userName.value)
        data.append('profileMessage', this.profileMessage.value)
        data.append('email', this.email.value)
        data.append('phoneNumber', this.phoneNumber.value)
        data.append('dob', this.dob.value)
        data.append('address', this.address.value)
        data.append('address2', this.address2.value)
        data.append('city',this.state.value)
        data.append('state',this.country.value)
        data.append('country', this.zipCode.value)
        data.append('zipCode',this.subscriptionPlan.value)

        if(this.state.selectedFile){
          data.append('profilePic', this.state.selectedFile)
        }
       
        axios.post('/user/updateUser', data).then(result => {
          if(result.data.code == '200'){
            this.props.history.push("/users");
          }
        });
     }
   
   
   
    componentWillMount(){
		if(localStorage.getItem('jwtToken') !== null){	
			axios.get('/user/myProfle').then(result => {						
				if(result.data.code === 200){
					console.log("result.data.result",result.data.result[0])					
					this.setState({ 
						user:result.data.result[0]
					})
				}else{
					 this.props.history.push('/logout');
				}
			})
		} else {
			 this.props.history.push('/logout');
		}
		
		
		axios.get('/location/getLocation').then(result => {			
				this.setState({countries:result.data.result})
		})
	}

    render() {
		var countryID = this.state.user.country?this.state.user.country._id:"";
		var stateID = this.state.user.state?this.state.user.state._id:"";
		var cityID = this.state.user.city?this.state.user.city._id:""
        return (
                <div className="myTreasure">
                    <div className="container">
                        <div className="breadcrumb">
                            <ul>
                                <li><a href={'/dashboard'}>Home</a></li> <li>Settings</li>
                            </ul>
                        </div>
                        <div className="setting-container">
                            <div className="left-container">
                                <ul>
                                   <li><Link to={'/setting-profile'} className="active">Profile Info</Link></li>   
                                    <li><Link to={'/setting-change-password'}>Change Password</Link></li>   
                                    <li><Link to={'/setting-subscription'}>Subscription Management</Link></li>   
                                    <li><Link to={'/setting-email-notification'}>Email Notifications</Link></li>     
                                </ul>
                            </div>
                            <div className="right-container">
						<div className="change-password">
							<div className="form-row login-row">
								<h3>Profile Info</h3>
								<p className="brdr-btm">Here you can update your personal details it will not going to see anyone</p>
							</div>
							<div>
								<div className="profileRow">
								<div className="pic"><img src={userPicture1} alt="" /></div>
								<div className="details">
								<Input type="file" innerRef={input => (this.profilePic = input)} onChange={this.fileChangedHandler} className={"yellowBtn fl"} placeholder="Advertisement Image" />
								<a href="#" className={"grayBtn fl"}>Delete</a>
								<div className="cl"></div>
								<p>JPG, GIF or PNG. Max size of 800K</p>
							</div>
								<div className="cl"></div>
								</div>
								<div className="form-row">
									<div className="invalid-feedback validation"> </div>   
									<span className="astrik">*</span>
									<label className="label" htmlFor={"name"}>Name</label>
									<input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your name" value={(this.state.user)?this.state.user.firstName:''} defaultValue="" />
								</div>
								<div className="form-row">
									<div className="invalid-feedback validation"> </div>
									<span className="astrik">*</span>
									<label className="label" htmlFor={"description"}>Profile Message</label>
									<textarea
										id={"description"}
										className={"form-control textBox"}
										required={true}
										name={"description"}
										type={"description"}
										defaultValue={(this.state.user)?this.state.user.profileMessage:''}
										placeholder="" 
										>
									</textarea>
								</div>
								<div className="form-row">
									<div className="colum">
										<div className="invalid-feedback validation"> </div>             
										<span className="astrik">*</span>
										<label className="label" htmlFor={"size"}>Email address</label>
										<input id={"size"} className={"form-control textBox"} required={true} name={"size"} type={"email"} placeholder="" value={(this.state.user)?this.state.user.email:''} disabled="disabled" /></div>
									<div className="colum right">
										<div className="invalid-feedback validation"> </div>             
										<span className="astrik">*</span>
										<label className="label" htmlFor={"brand"}>Date of Birth</label>
										<DateDiv />
									</div>
									<div className="cl"></div>
		
								</div>
		
								<div className="form-row">
									<div className="colum">
										<label className="label" htmlFor={"age"}>Address Line 1:</label>
										<input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" value={(this.state.user)?this.state.user.address:''} />
		
									</div>
									<div className="colum right">
										<label className="label" htmlFor={"age"}>Address Line 2:</label>
										<input id={"age"} className={"form-control textBox"}  name={"age"} type={"text"} placeholder="" value={(this.state.user)?this.state.user.address2:''} />
		
									</div>
									<div className="cl"></div>
								</div>
								<div className="form-row">
									<div className="colum">
										<div className="invalid-feedback validation"> </div>   
										<span className="astrik">*</span>
										 <label className="label" htmlFor={"condition"}>Country</label>
										 <div className="select-box">
									  <select type="select" name="country" id="country"  required={true} onChange={this.handleChangeCountry}>
										<option value="">Select Country</option>
												{
													this.state.countries.map( function(country,index) {	
													var selectedCountry = (countryID === country._id)?'selected':"";
													return(<option key={index} value={country._id} >{country.countryName}</option>);
												})
												}
										</select>
									</div>
										</div>
									<div className="colum right">
										<div className="invalid-feedback validation"> </div>          
										<span className="astrik">*</span>
										<label className="label" htmlFor={"state"}>State</label>
										 <div className="select-box">               
											<select name="state" id="state"  required={true} onChange={this.handleChangeState} >
											<option value="0">Select State</option>
											{
												this.state.states.map( function(state,index){ 
												return(<option key={index} value={state._id}>{state.stateName}</option>);
											})
											}
										  </select>
									   </div>
										</div>
									<div className="cl"></div>
		
								</div><div className="form-row">
									<div className="colum">
										 <div className="invalid-feedback validation"> </div>          
										<span className="astrik">*</span>
										<label className="label" htmlFor={"city"}>City</label>
										<div className="select-box">
										{console.log('this.state.user.city',this.state.user.city)}						
									  <select  name="city" id="city" required={true} onChange={this.handleChangeCity}>
									  {
											this.state.cities.map( function(city,index) { 
												return(<option key={index} value={city._id}>{city.cityName}</option>);
											})
										}
									  </select>
				           </div>
						</div>
						<div className="colum right">                                               
							<div className="invalid-feedback validation"> </div>   
							<span className="astrik">*</span>
							<label className="label" htmlFor={"zipCode"}>ZIP / Postal Code:</label>
							<input id={"age"} className={"form-control textBox"} required={true} name={"age"} type={"text"} placeholder="" value={(this.state.user)?this.state.user.zipCode:''} defaultValue="" />
						</div>
						<div className="cl"></div>

					</div>
					<div className="form-row">
						<div className="invalid-feedback validation"> </div>   
						<span className="astrik">*</span>
						<label className="label" htmlFor={"phoneNumber"}>Phone Number</label>
						<input id={"name"} className={"form-control textBox"} required={true} name={"name"} type={"name"} placeholder="Enter your Phone Number" value={(this.state.user)?this.state.user.phoneNumber:''} defaultValue="" />
					</div>

					<div className="form-row no-padding">
					<a href="#" className={"grayBtn fr"}>Deactivate account</a>
					<p className="createdOn">Account created on {moment(this.state.user.createdAt).format('DD/MM/YYYY')}</p>
						<button
							type={"submit"}
							className={"submitBtn fl"}
							>
							Save
						</button>
					</div>
				</div>
				<div className="cl"> </div>
			</div>
		</div>
		<div className="cl"></div>
		</div>
		</div>
		</div>
          );
    }
}
export default settingProfile;

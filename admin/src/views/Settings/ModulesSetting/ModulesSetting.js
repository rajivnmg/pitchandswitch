import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, FormGroup,Label,Input } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { AppSwitch } from '@coreui/react'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class SocialMediaSetting extends Component {
  constructor(props){
    super(props);
    this.state = {     
      moduleSetting : {
			isPopularItem:true,
			isDonate:true,
			isHomeSponsors:true,
			isTestimonials:true,
			isNewlyProducts:true,		
			isWhatOtherSwitched:true,
			isWhatPitchSwitch:true,
			isMostTrusted:true,
			isHowItWorks:true,
			isWeKeepSafe:true,
			youTubeVideoId:''
	  },
      modal: false,   
      moduleSettingId:''  
    };    
    this.toggle = this.toggle.bind(this);    
  }

  loadCommentsFromServer(){
    axios.get('/setting/getModulesSetting').then(result => {
      if(result.data.code === 200){
		  console.log("result",result.data.result[0]);
		  if(result.data.result && result.data.result.length>0){
			this.setState({
			  moduleSetting: result.data.result[0],
			  moduleSettingId : (result.data.result && result.data.result.length > 0)? result.data.result[0]._id :''
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
handleChange(e) {
	
	  let data = {};
	  //let name = e.target.name;	  	 
	  //console.log(moduleSetting,e,e.target.checked,e.target.name);
	  data.name = e.target.name;
	  data.value = e.target.checked;
	  data.moduleSettingId = this.state.moduleSettingId;
	  console.log("data",data);
	  let moduleSettingData = {...this.state.moduleSetting};
	  axios.post('/setting/updateModuleSetting',data).then(result => {	
		  moduleSettingData[e.target.name] = e.target.checked;	  	  
		this.setState({
			moduleSetting:moduleSettingData
        });
	})
	.catch((error) => {
	console.log('error', error)
	  if(error.code === 401) {
		this.props.history.push("/login");
	  }
	});
}
	
	
  handleInputChange(ex){
    this.setState({youTubeVideoId: ex.target.value });
  };

  handleClick =()=> {
    console.log(this.state.moduleSetting.youTubeVideoId);
     let data = {};	 
	  data.name = 'youTubeVideoId';
	  data.value = this.state.moduleSetting.youTubeVideoId;
	  data.moduleSettingId = this.state.moduleSettingId;
	  console.log("data",data);
	  axios.post('/setting/updateModuleSetting',data).then(result => {	  
		this.setState({
          moduleSetting: result.data.result          
        });
	})
	.catch((error) => {
	console.log('error', error)
	  if(error.code === 401) {
		this.props.history.push("/login");
	  }
	});
  };
 
  componentDidMount() {
    //if(localStorage.getItem('jwtToken') != null)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      this.loadCommentsFromServer();
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
 
			
  render() {
   
     const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div className="animated fadeIn">
        <Row>        
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Popular Items                           
              </CardHeader>              
					  <CardBody>	
						  <If condition={(this.state.moduleSetting && this.state.moduleSetting.isPopularItem === true)}>
							<Then>
							 <AppSwitch className={'mx-1'} name={'isPopularItem'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
							</Then>							
							<Else>
							  <AppSwitch className={'mx-1'} name={'isPopularItem'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
							</Else>
						  </If>		
					  </CardBody>				  
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Donate                           
              </CardHeader>              
				  <CardBody>	
					  <If condition={(this.state.moduleSetting && this.state.moduleSetting.isDonate === true)}>
						<Then>
						 <AppSwitch className={'mx-1'} name={'isDonate'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)} name="myCheckBox1" />	
						</Then>							
						<Else>
						  <AppSwitch className={'mx-1'} name={'isDonate'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
						</Else>
					  </If>		
				  </CardBody>				  
            </Card>
          </Col>
        </Row>
        <Row>
        <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Sponsors
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isHomeSponsors === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isHomeSponsors'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isHomeSponsors'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Testimonials 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isTestimonials === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isTestimonials'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isTestimonials'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Newly Added Products 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isNewlyProducts === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isNewlyProducts'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isNewlyProducts'} variant={'pill'} color={'success'} label unchecked onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
               What Other Switched 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isWhatOtherSwitched === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isWhatOtherSwitched'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isWhatOtherSwitched'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
        </Row>
          <Row>
        <Col xs="12" md="6">
            <Card>
              <CardHeader>
               Hall of Fame  
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isMostTrusted === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isMostTrusted'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isMostTrusted'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                How It Works 
              </CardHeader>
              <CardBody>
              <Row>
				<Col  md="3">
				   <If condition={(this.state.moduleSetting && this.state.moduleSetting.isHowItWorks === true)}>
					<Then>
					 <AppSwitch className={'mx-1'} name={'isHowItWorks'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
					</Then>							
					<Else>
					  <AppSwitch className={'mx-1'} name={'isHowItWorks'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
					</Else>
				  </If>	
				</Col>
				  <Col md="9">
					  <FormGroup>
						<Label htmlFor="name">YouTube Video Id</Label>
						<Input type="text" id="youtubeVideoId" name={'youTubeVideoId'} onChange={ this.handleInputChange } placeholder="Enter Youtube VideoId" value={(this.state.moduleSetting && this.state.moduleSetting.youTubeVideoId !==null) ? this.state.moduleSetting.youTubeVideoId:null } required />
					 </FormGroup>
					 <button className="btn btn-sm btn-success" type="button" onClick={this.handleClick}><i className="fa fa-dot-circle-o"></i> Submit</button>
				 </Col>
			 </Row>
              </CardBody>
            </Card>
          </Col>
		
        </Row>
           <Row>
        <Col xs="12" md="6">
            <Card>
              <CardHeader>
                We Keep Safe 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isWeKeepSafe === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isWeKeepSafe'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isWeKeepSafe'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
               What is Pitch and Switch 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isWhatPitchSwitch === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} name={'isWhatPitchSwitch'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} name={'isWhatPitchSwitch'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
				</Else>
			  </If>	
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            Are you sure to delete?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.approveDeleteHandler}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default SocialMediaSetting;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { AppSwitch } from '@coreui/react'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

class SocialMediaSetting extends Component {
 constructor(props){
    super(props);
    this.state = {     
      moduleSetting : {
			isFacebook:true,
			facebookUrl:'',
			isTwitter:true,
			twitterUrl:'',
			isLinkedIn:true,		
			linkedInUrl:''
			
	  },
      modal: false,   
      moduleSettingId:''  
    };    
    this.toggle = this.toggle.bind(this);    
  }
    
  loadCommentsFromServer(){
    axios.get('/setting/getSocialMediaSetting').then(result => {
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
	  axios.post('/setting/updateSocialMediaSetting',data).then(result => {	
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
    this.setState({facebookUrl: ex.target.value });
  };

  handleClick =()=> {
    console.log(this.state.moduleSetting.youTubeVideoId);
     let data = {};	 
	  data.name = 'facebookUrl';
	  data.value = this.state.moduleSetting.facebookUrl;
	  data.moduleSettingId = this.state.moduleSettingId;
	  console.log("data",data);
	  axios.post('/setting/updateSocialMediaSetting',data).then(result => {	  
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
                <i className="icon-social-facebook icons font-2xl d-block mt-4"></i>Facebook                           
              </CardHeader>              
					  <CardBody>	
						  <If condition={(this.state.moduleSetting && this.state.moduleSetting.isFacebook === true)}>
							<Then>
							 <AppSwitch className={'mx-1'} name={'isFacebook'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
							</Then>							
							<Else>
							  <AppSwitch className={'mx-1'} name={'isFacebook'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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
                <i className="icon-social-twitter icons font-2xl d-block mt-4"></i>Twitter
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isTwitter === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} variant={'pill'} name={'isTwitter'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} variant={'pill'} name={'isTwitter'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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
                <i className="icon-social-linkedin icons font-2xl d-block mt-4"></i>LinkedIn 
              </CardHeader>
              <CardBody>
               <If condition={(this.state.moduleSetting && this.state.moduleSetting.isLinkedIn === true)}>
				<Then>
				 <AppSwitch className={'mx-1'} variant={'pill'} name={'isLinkedIn'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} variant={'pill'} name={'isLinkedIn'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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

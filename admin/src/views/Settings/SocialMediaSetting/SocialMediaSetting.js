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
      user : {},
      modal: false,     
    };
    console.log('THIS OBJ', this);   
    this.toggle = this.toggle.bind(this);    
  }

  loadCommentsFromServer(){
    axios.get('/notification/email').then(result => {
      if(result.data.code === 200){
		this.setState({
          emailNotification: result.data.result.emailNotification,
          user:result.data.result          
        });
      
      // console.log('emailNotification',)
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
	  let userD = this.state.user;
	  //this.setState({:e.target.checked})
	  console.log(userD,e.target.checked)
	  userD.emailNotification = ((e.target.checked)?0:1).toString()
	  axios.post('/notification/email',userD).then(result => {	  
		this.setState({
          emailNotification: result.data.result.emailNotification,          
        });
	})
	.catch((error) => {
	console.log('error', error)
	  if(error.code === 401) {
		this.props.history.push("/login");
	  }
	});
}
 
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
						  <If condition={this.state.isFacebook =="0"}>
							<Then>
							 <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
							</Then>							
							<Else>
							  <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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
               <If condition={this.state.isTwitter =="0"}>
				<Then>
				 <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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
               <If condition={this.state.isLinkedIn =="0"}>
				<Then>
				 <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
				</Then>							
				<Else>
				  <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
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

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
                Popular Items                           
              </CardHeader>              
					  <CardBody>	
						  <If condition={this.state.isPopularItem =="0"}>
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Donate                           
              </CardHeader>              
					  <CardBody>	
						  <If condition={this.state.isDonate =="0"}>
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
                Sponsors
              </CardHeader>
              <CardBody>
               <If condition={this.state.isHomeSponsors =="0"}>
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Testimonials 
              </CardHeader>
              <CardBody>
               <If condition={this.state.isTestimonials =="0"}>
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
                Newly Added Products 
              </CardHeader>
              <CardBody>
               <If condition={this.state.isNewlyProducts =="0"}>
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
               What Other Switched 
              </CardHeader>
              <CardBody>
               <If condition={this.state.isWhatOtherSwitched =="0"}>
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
               Hall of Fame  
              </CardHeader>
              <CardBody>
               <If condition={this.state.isMostTrusted =="0"}>
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                How It Works 
              </CardHeader>
              <CardBody>
              <Row>
				<Col  md="3">
				   <If condition={this.state.isHowItWorks =="0"}>
					<Then>
					 <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked   onChange={e => this.handleChange(e)}/>	
					</Then>							
					<Else>
					  <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label unchecked   onChange={e => this.handleChange(e)}/>	
					</Else>
				  </If>	
				</Col>
				  <Col md="9">
					  <FormGroup>
						<Label htmlFor="name">YouTube Video Id</Label>
						<Input type="text" id="name" placeholder="Enter Youtube VideoId" required />
					 </FormGroup>
					 <button class="btn btn-sm btn-success" type="submit"><i class="fa fa-dot-circle-o"></i> Submit</button>
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
               <If condition={this.state.isWeKeepSafe =="0"}>
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
               What is Pitch and Switch 
              </CardHeader>
              <CardBody>
               <If condition={this.state.isWhatPitchSwitch =="0"}>
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

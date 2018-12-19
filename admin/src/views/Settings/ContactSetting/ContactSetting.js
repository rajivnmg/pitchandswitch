import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, FormGroup,Label,Input,Form } from 'reactstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { AppSwitch } from '@coreui/react'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
var FD = require('form-data');
var fs = require('fs');
class ContactSetting extends Component {

   constructor(props){
    super(props);
    this.email = React.createRef();
    this.fromEmail = React.createRef();
    this.address = React.createRef();
    this.contactNumber = React.createRef();
    this.zipCode = React.createRef();
    
    this.state = {
      contactSetting: {},
      contactSettingId: '' ,
      message:'' ,
      errorMessage:false   
    };
  }
  
  submitHandler(e){
      e.preventDefault();
      let formSubmitFlag = true;
      if(formSubmitFlag){
        const data = new FD()
        data.append('_id', this.state.contactSetting)
        data.append('email', this.email.value)
        data.append('fromEmail', this.fromEmail.value)
        data.append('address', this.address.value)
        data.append('contactNumber', this.contactNumber.value)
        data.append('zipCode', this.zipCode.value)        	      
        console.log("editAdv",data)
        axios.post('/setting/updateContactSetting', data).then(result => {
          if(result.data.code ===200){
            console.log("updateContactSetting done")
            this.setState({message:result.data.message,errorMessage:true});
          }else{
			  this.setState({message:result.data.message,errorMessage:true});
		  }
        });
      }
  }

  componentDidMount() {    
      axios.get('/setting/getContactSetting').then(result => {
       // console.log(result); 
         if(result.data.code === 200){
			this.setState({ contactSetting: result.data.result});          
			this.email.value = result.data.result.email;
            this.emailFrom.value = result.data.result.emailFrom;
			this.address.value = result.data.result.address;
			this.contactNumber.value = result.data.result.contactNumber;
			this.zipCode.value = result.data.result.zipCode;
        }
      })
      .catch((error) => {
        if(error.status === 401) {
          this.props.history.push("/login");
        }
      });

  }
 
  render() {
   
     const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Contact Setting                           
              </CardHeader>
              <CardBody>
               <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <Col xs="12" md="6">    
						{this.state.errorMessage && <div class="alert alert-primary" role="alert">{this.state.message}</div>}
					  <CardBody>	
					  <FormGroup>						 
							<Label htmlFor="email">Email</Label>
							<Input type="text" id="email" name={'email'} innerRef={input => (this.email = input)} placeholder="Enter from email" required />
						</FormGroup>					  
						 <FormGroup>						 
							<Label htmlFor="fromEmail">From Email (<small>All email will be sent from this email</small>)</Label>
							<Input type="text" id="fromEmail" name={'fromEmail'} innerRef={input => (this.fromEmail = input)} placeholder="Enter from email" required />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="name">Contact Number</Label>
							<Input type="text" id="contactNumber" name={'contactNumber'} innerRef={input => (this.contactNumber = input)} placeholder="Enter contact number" />
						</FormGroup>
						
						<FormGroup>
							<Label htmlFor="address">Address</Label>
							<Input type="textarea" id="address" name={'address'} innerRef={input => (this.address = input)}placeholder="Enter address" required />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="zipCode">ZipCode</Label>
							<Input type="text" id="zipCode" name={'zipCode'} innerRef={input => (this.zipCode = input)} placeholder="Enter zipcode" required />
						</FormGroup>
							<button className="btn btn-sm btn-success" type="button" onClick={(e)=>this.submitHandler(e)}><i className="fa fa-dot-circle-o"></i> Submit</button>	
					  </CardBody>
				  </Col>
				</Form>
              </CardBody>
            </Card>
          </Col>
        </Row>        
      </div>

    );
  }
}

export default ContactSetting;

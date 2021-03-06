import React, { Component } from 'react';
import '../../custom.css';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import User from './User';
//import Moment from 'moment';
//import { Badge} from 'reactstrap';
import ReactPaginate from 'react-paginate';
var FD = require('form-data');
//var fs = require('fs');

//var passport = require('passport');
//console.log('passport', passport);/
//require('../../config/passport')(passport);
//console.log('newpassport', passport);

class Users extends Component {
  constructor(props){
    super(props);     
    this.state = {
		  users: [],
		  sortType :1,
		  modal: false,
		  currentPage: 1,
		  PerPage: 5,
		  totalPages: 1,
		  usersCount: 0,
		  offset: 0,
		  info: false,
		  searchValue:'',
		  showError : false
    };
    if(this.props.match.params.page !== undefined){
      this.setState({currentPage: this.props.match.params.page});
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.approveDeleteHandler = this.approveDeleteHandler.bind(this);
    this.sortBy.bind(this);
  }

  componentDidMount() {
      this.loadCommentsFromServer();
  }

  loadCommentsFromServer() {
    axios.get('/user/users/' + this.state.currentPage).then(result => {
      if(result.data.code ===200){
        this.setState({
           users: result.data.result,
           currentPage: result.data.current,
           PerPage: result.data.perPage,
           totalPages: result.data.pages,
           total_count:result.data.total
          });
           result.data.result.foreach(function(user) {
				this.data.name = user.userName;
				this.data.email = user.email;
				this.data.firstName = user.firstName;
		   });
         
        }
     })
    .catch((error) => {
       if(error.code === 401) {
         this.props.history.push("/login");
      }
    });
  }

  handlePageClick = (data) => {
      let currentPage = data.selected + 1;
      this.setState({currentPage: currentPage}, () => {
        this.loadCommentsFromServer();
      });
  };

  userDeleteHandler (id){
    this.setState({
      approve: false,
      approveId: id
    });
    this.toggle();
  }
  
  filterUser = () =>{
	axios.get('/user/filterUser/'+this.state.searchValue).then(result => {
      if(result.data.code === 200){              
        this.setState({
           users: result.data.result,
           currentPage: result.data.current,
           PerPage: result.data.perPage,
           totalPages: result.data.pages,
           total_count:result.data.total
          });          
      }
    });
  }
 updateInputValue=(evt) =>{
    this.setState({
      searchValue: evt.target.value
    });
  }
  
  changeStatusHandler(user){
    user.userStatus = (1 - parseInt(user.userStatus)).toString();
    axios.post('/user/changeStatus', user).then(result => {
      if(result.data.code === 200){
        let users = this.state.users;
        let userIndex = users.findIndex(x => x._id === user._id);
        users[userIndex].userStatus = user.userStatus.toString();
        this.setState({ users: users});
      }
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleInfo (){
     this.setState({
      info: !this.state.info
    });
  }

  sortBy(key) {
	 const data = new FD()
        data.append('key', key)
        data.append('page', this.state.currentPage)
        data.append('type', this.state.sortType)
	    axios.post('/user/sortingUsers',data).then(result => {
		   if(result.data.code ===200){
				this.setState({
				   users: result.data.result,
				   sortType: result.data.sortType,
				   currentPage: result.data.current,
				   PerPage: result.data.perPage,
				   totalPages: result.data.pages,
				   total_count:result.data.total
				  });
				   result.data.result.foreach(function(user) {
						this.data.name = user.userName;
						this.data.email = user.email;
						this.data.firstName = user.firstName;
				   });
				}
			 })
			.catch((error) => {
			   if(error.code === 401) {
				 this.props.history.push("/login");
			 }
		});
		
  }


  approveDeleteHandler(){
    this.setState({
      approve: true
    }, function(){
      if(this.state.approve){
        axios.delete('/user/deleteUser/' + this.state.approveId).then(result => {
          if(result.data.code === 200){
            let users = this.state.users;
            let userIndex = users.findIndex(x => x._id === this.state.approveId);
            users.splice(userIndex, 1);
            this.setState({
              users: users,
              approveId: null,
              approve: false
            });
            this.toggle();
          }else{
			  this.toggle();
			  this.setState({showError:true,message:result.data.message});
			  setTimeout(() => {this.setState({message: "",showError:false})}, 5000)
		  }
        });
      }
    });
  }

  render() {
   let users;
   let classValue;
  // const FilterableTable = require('react-filterable-table');
  // const FieldRenders = require('./User');
     if(this.state.users){
       let userList = this.state.users;
         users = userList.map((user,index) => <User key={user._id} onDeleteUser={this.userDeleteHandler.bind(this)} onflagUsers={this.toggleInfo.bind(this)} changeStatus={(user) => this.changeStatusHandler(user)} user={user} sequenceNumber={index} />);
     }
     if(this.state.sortType===1){
		   classValue ="fa fa-sort-asc";
		}
		else {
		   classValue ="fa fa-sort-desc";
		}

   const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users Listing
                <Link to="users/add" className="btn btn-success btn-sm pull-right">Add User</Link>
              </CardHeader>
              <CardBody>
					{this.state.showError ?
					<div className="alert alert-danger pull-left" role="alert">
						{this.state.message}
					</div>
				 :''}
				<div className="input-group searchUserInputButton  pull-right">
					<input className="form-control" id="input1-group2" value={this.state.searchValue} onChange={this.updateInputValue} type="text" name="input1-group2" placeholder="Username/Email" autocomplete="username" required/>
					<span className="input-group-prepend">
						<button className="btn btn-primary" type="button" onClick={() => this.filterUser()} >
						<i className="fa fa-search"></i> Search</button>
					</span>
				</div>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                     <tr>
                        <th>S.No.</th>
						<th><Button color="info" onClick={() => this.sortBy('firstName')} className="mr-1 mousePointer">Name
						 <span className ={classValue}></span>
						</Button></th>
						<th><Button color="info" onClick={() => this.sortBy('userName')} className="mr-1 mousePointer ">UserName
						 <span className ={classValue}></span>
						</Button></th>
						<th><Button color="info" onClick={() => this.sortBy('email')} className="mr-1 mousePointer">Email
						 <span className ={classValue}></span>
						</Button></th>
						<th><Button color="info" onClick={() => this.sortBy('createdAt')} className="mr-1 mousePointer">Started At
						 <span className ={classValue}></span>
						</Button></th>
						<th>User Type</th>
						<th>Profile Pic</th>
						<th>Flag</th>
						<th>Status</th>
						<th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users}
                </tbody>
               </Table>
                <nav>
                    <ReactPaginate
                       initialPage={this.state.currentPage-1}
                       previousLabel={"<<"}
                       previousClassName={"page-item"}
                       previousLinkClassName={"page-link"}
                       nextLabel={">>"}
                       nextClassName={"page-item"}
                       nextLinkClassName={"page-link"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageClassName={"page-item"}
                       pageLinkClassName={"page-link"}
                       pageCount={this.state.totalPages}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
                  </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
          <ModalHeader>User</ModalHeader>
          <ModalBody>
            Are you sure to delete?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.approveDeleteHandler}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.info} toggle={this.toggleInfo} className={'modal-info ' + this.props.className}>
		  <ModalHeader toggle={this.toggleInfo}>User Flagged</ModalHeader>
		  <ModalBody>
			No Flag User Available!!!
		  </ModalBody>
		  <ModalFooter>
			<Button color="secondary" onClick={this.toggleInfo}>Cancel</Button>
		  </ModalFooter>
		</Modal>
      </div>
    );
  }
}

export default Users;

import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
// import PropTypes from 'prop-types';
class TradesView extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewTrade: [],
     
      tradeId: this.props.match.params.id
    };
  }
  cancelHandler(){
    this.props.history.push("/trades");
  }
  componentDidMount() {
    //if(localStorage.getItem('jwtToken') != null)
      //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.all([
		axios.get('/trade/viewTrade/' + this.state.tradeId),
		axios.get('/trade/tradeStatus'),
		axios.get('/donation/getdonationshippingStatus')
      ])
      .then(
        axios.spread((tradeResult,rtradestatus, rshipingstatus) => {
			if(tradeResult.data.code === 200){
			  //localStorage.setItem('jwtToken', result.data.result.accessToken);
			  this.setState({ viewTrade: tradeResult.data.result,tradeStatus: rtradestatus.data.result,conditionshippingStatus:rshipingstatus.data.result});
			  this.sellerId.value = tradeResult.data.result.sellerId.firstName;
			  this.receiverId.value = tradeResult.data.result.receiverId.firstName;
			  this.sellerProductId.value = tradeResult.data.result.sellerProductId.productName;
			  this.receiverProductId.value = tradeResult.data.result.receiverProductId.productName;			 
			}	
			  
      }))
      .catch((error) => {
        if(error.status === 401) {
           this.props.history.push("/login");
        }
      });
  }
  
  render() {
	   let tradeStatusOption;
	    if(this.state.tradeStatus){
			console.log("this.state.tradeStatus",this.state.tradeStatus)
			let statusOption = this.state.tradeStatus;
		    tradeStatusOption = statusOption.map(v => (<option value={v.id}>{v.name}</option>));
        }
      
	  let optionShippings;
	      if(this.state.conditionshippingStatus){
			let conditionsShippings = this.state.conditionshippingStatus;
		    optionShippings = conditionsShippings.map(v => (<option value={v.id}>{v.name}</option>));

        }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Trade</strong>
                <small> View</small>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="id">ID</Label>
                  <Input type="text" value={this.state.viewTrade._id} />
                </FormGroup>
                <Row>
                  <Col xs="4" sm="12">
                    <FormGroup>
                      <Label htmlFor="company">Pitch User name</Label>
                      <Input type="text" value={(this.state.viewTrade && this.state.viewTrade.tradePitchProductId && this.state.viewTrade.tradePitchProductId.userId)?this.state.viewTrade.tradePitchProductId.userId.userName:''} />
                    </FormGroup>
                    </Col>
                    
                </Row>
                <FormGroup>
                  <Label htmlFor="username">Switch User Name</Label>
                  <Input type="text" value={(this.state.viewTrade && this.state.viewTrade.tradeSwitchProductId && this.state.viewTrade.tradeSwitchProductId.userId)?this.state.viewTrade.tradeSwitchProductId.userId.userName:''} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Pitch Product</Label>
                  <Input type="text"  value={(this.state.viewTrade && this.state.viewTrade.tradePitchProductId)?this.state.viewTrade.tradePitchProductId.productName:''} required/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Switch Product</Label>
                  <Input type="text" value={(this.state.viewTrade && this.state.viewTrade.tradeSwitchProductId)?this.state.viewTrade.tradeSwitchProductId.productName:''} />
                </FormGroup>
                 <FormGroup>
                  <Label htmlFor="status">Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
				   <select id="select"
						innerRef={input => (this.tradeStatus = input)}
						className="dropdown-toggle btn" >             
						{tradeStatusOption}
					</select>      
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="status">Shipping Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
				   <select id="select"
						innerRef={input => (this.shippingStatus = input)}
						className="dropdown-toggle btn" >             
						{optionShippings}
				</select>      
                </FormGroup>
               
                <Row>
                  <Col xs="6" className="text-right">
                    <Button onClick={()=>this.cancelHandler()} color="primary" className="px-4">Cancel</Button>
                  </Col>
                  <Col xs="6">

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
    );
  }
}
// ProjectItem.propTypes = {
//   project: PropTypes.object
// };
export default TradesView;
